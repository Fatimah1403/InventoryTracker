// frontend/src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import RoleBasedComponent from '../components/Auth/RoleBasedComponent';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
    TablePagination,
    Tooltip
} from '@mui/material';
import {
    Edit,
    Delete,
    Add,
    Search,
    Warning,
    Remove as RemoveIcon,
    Add as AddIcon,
    Print as PrintIcon,
    Download as DownloadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { productAPI, notificationAPI } from '../services/api';
import { showSuccess, showError } from '../utils/toast';
import { useNotification } from '../context/useNotification';
import { motion } from "framer-motion";

// Add print styles
const printStyles = `
@media print {
    .no-print {
        display: none !important;
    }
    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    table {
        width: 100% !important;
    }
}
`;

function Products() {
    const navigate = useNavigate();
    const { hasRole, user } = useAuth();
    const { addNotification } = useNotification();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = printStyles;
        document.head.appendChild(styleSheet);
        return () => document.head.removeChild(styleSheet);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productAPI.getAll();
            const productData = response.data?.data || response.data || [];
            setProducts(productData);
            setFilteredProducts(productData);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.message || 'Failed to fetch products');
            showError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, productName) => {
        if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            return;
        }

        try {
            await productAPI.delete(id);
            showSuccess('Product deleted successfully');
            addNotification(`Deleted: ${productName}`, 'info');
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
            showError(err.response?.data?.message || 'Failed to delete product');
            addNotification('Failed to delete product', 'error');
        }
    };

    const handleQuantityUpdate = async (id, newQuantity, product) => {
        try {
            const oldQuantity = product.quantity;
            await productAPI.updateQuantity(id, newQuantity);
            
            if (oldQuantity > 0 && newQuantity === 0) {
                // Send out-of-stock notification
                try {
                    await notificationAPI.sendOutOfStockAlert({
                        name: product.name,
                        category: product.category,
                        previousQuantity: oldQuantity
                    });
                    showError(`⚠️ ${product.name} is now out of stock! Email sent.`);
                    addNotification(`${product.name} is out of stock! Email sent.`, 'error');
                } catch (notifError) {
                    console.error('Failed to send notification:', notifError);
                    showError(`⚠️ ${product.name} is out of stock, but email failed`);
                    addNotification(`Out-of-stock email failed for ${product.name}`, 'error');
                }
            } else if (newQuantity > 0 && newQuantity <= 5) {
                // Low stock warning
                showSuccess(`Quantity updated: ${newQuantity}`);
                addNotification(`Low stock warning: ${product.name} (${newQuantity} left)`, 'warning');
            } else {
                // Normal update
                showSuccess(`Quantity updated to ${newQuantity} for ${product.name}`);
            }
            
            fetchProducts();
        } catch (err) {
            console.error('Error updating quantity:', err);
            showError('Failed to update quantity');
            addNotification('Failed to update quantity', 'error');
        }
    };

    const getStockStatus = (quantity) => {
        if (quantity === 0) {
            return <Chip label="Out of Stock" color="error" size="small" icon={<Warning />} />;
        } else if (quantity < 10) {
            return <Chip label="Low Stock" color="warning" size="small" />;
        }
        return <Chip label="In Stock" color="success" size="small" />;
    };

    // Export to CSV function
    const exportToCSV = () => {
        const csvContent = [
            ['Product Name', 'Category', 'Quantity', 'Price', 'Status', 'Total Value'],
            ...filteredProducts.map(p => [
                p.name,
                p.category,
                p.quantity,
                p.price,
                p.quantity > 0 ? (p.quantity <= 5 ? 'Low Stock' : 'In Stock') : 'Out of Stock',
                (p.quantity * p.price).toFixed(2)
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        showSuccess('CSV exported successfully');
        addNotification('Inventory exported to CSV', 'success');
    };

    // Print function
    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = `Product Inventory Report - ${new Date().toLocaleDateString()}`;
        window.print();
        document.title = originalTitle;
    };

    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button variant="contained" onClick={fetchProducts}>
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header with title and actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4">
                    Inventory Management
                    {user && (
                        <Typography variant="caption" display="block" color="text.secondary">
                            Logged in as: {user.name} ({user.role})
                        </Typography>
                    )}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }} className="no-print">
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={exportToCSV}
                    >
                        Export CSV
                    </Button>
                    
                    <Button
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                    
                    
                    <RoleBasedComponent
                        allowedRoles={['admin', 'manager']}
                        fallback={
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                disabled
                                sx={{ backgroundColor: '#4A6B7C' }}
                            >
                                Add Product (Manager/Admin only)
                            </Button>
                        }
                    >
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => navigate('/dashboard/products/add')}
                            sx={{ backgroundColor: '#4A6B7C' }}
                        >
                            Add Product
                        </Button>
                    </RoleBasedComponent>
                </Box>
            </Box>

            {/* Search Bar */}
            <Paper sx={{ p: 2, mb: 3 }} className="no-print">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            {/* Print Header - Only visible when printing */}
            <Box sx={{ display: 'none' }} className="print-only">
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Inventory Report - {new Date().toLocaleDateString()}
                </Typography>
            </Box>

            {/* Products Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Product Name</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell align="center"><strong>Quantity</strong></TableCell>
                            <TableCell align="right"><strong>Price</strong></TableCell>
                            <TableCell align="center"><strong>Status</strong></TableCell>
                            <TableCell align="center"><strong>Total Value</strong></TableCell>
                            
                            <TableCell align="center" className="no-print">
                                <strong>Quick Stock</strong>
                            </TableCell>
                            <TableCell align="center" className="no-print">
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                            <TableRow key={product._id} hover>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell align="center">
                                    {hasRole(['admin', 'manager']) ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <IconButton
                                                type='button'
                                                size="small"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleQuantityUpdate(
                                                        product._id, 
                                                        Math.max(0, product.quantity - 1),
                                                        product
                                                    );
                                                }}
                                                disabled={product.quantity === 0}
                                                className="no-print"
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography>{product.quantity}</Typography>
                                            <IconButton
                                                type='button'
                                                size="small"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleQuantityUpdate(
                                                        product._id, 
                                                        product.quantity + 1,
                                                        product
                                                    );
                                                }}
                                                className="no-print"
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Typography>{product.quantity}</Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    ${product.price?.toFixed(2) || '0.00'}
                                </TableCell>
                                <TableCell align="center">
                                    {getStockStatus(product.quantity)}
                                </TableCell>
                                <TableCell align="center">
                                    ${((product.quantity || 0) * (product.price || 0)).toFixed(2)}
                                </TableCell>
                                
                                <TableCell align="center" className="no-print">
                                    <RoleBasedComponent
                                        allowedRoles={['admin', 'manager']}
                                        fallback={
                                            <Tooltip title="Manager/Admin only">
                                                <span>
                                                    <Button
                                                        type="button"
                                                        size="small"
                                                        variant="outlined"
                                                        disabled
                                                    >
                                                        +10
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        }
                                    >
                                        <Tooltip title="Quick restock">
                                            <Button
                                                type='button'
                                                size="small"
                                                variant="outlined"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleQuantityUpdate(
                                                        product._id,
                                                        product.quantity + 10,
                                                        product
                                                    );
                                                }}
                                            >
                                                +10
                                            </Button>
                                        </Tooltip>
                                    </RoleBasedComponent>
                                </TableCell>
                                
                                <TableCell align="center" className="no-print">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <RoleBasedComponent
                                            allowedRoles={['admin', 'manager']}
                                            fallback={
                                                <Tooltip title="Manager/Admin only">
                                                    <span>
                                                        <IconButton color="primary" size="small" disabled>
                                                            <Edit />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            }
                                        >
                                            <IconButton
                                                color="primary"
                                                onClick={() => navigate(`/dashboard/products/edit/${product._id}`)}
                                                size="small"
                                            >
                                                <Edit />
                                            </IconButton>
                                        </RoleBasedComponent>

                                        <RoleBasedComponent
                                            allowedRoles={['admin']}
                                            fallback={
                                                <Tooltip title="Admin only">
                                                    <span>
                                                        <IconButton color="error" size="small" disabled>
                                                            <Delete />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            }
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(product._id, product.name)}
                                                size="small"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </RoleBasedComponent>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                        {filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={hasRole(['admin', 'manager']) ? 8 : 6} align="center">
                                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                                        {searchTerm ? 'No products found matching your search' : 'No products available'}
                                    </Typography>
                                    {hasRole(['admin', 'manager']) && !searchTerm && (
                                        <Button
                                            variant="contained"
                                            startIcon={<Add />}
                                            onClick={() => navigate('/dashboard/products/add')}
                                            sx={{ mt: 2, backgroundColor: '#4A6B7C' }}
                                        >
                                            Add Your First Product
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                
                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="no-print"
                />
            </TableContainer>

            {/* Summary Stats */}
            <Paper sx={{ p: 2, mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">{filteredProducts.length}</Typography>
                        <Typography variant="body2" color="text.secondary">Total Products</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">
                            {filteredProducts.reduce((sum, p) => sum + (p.quantity || 0), 0)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Total Items</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="error">
                            {filteredProducts.filter(p => p.quantity === 0).length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Out of Stock</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="warning.main">
                            {filteredProducts.filter(p => p.quantity > 0 && p.quantity <= 5).length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Low Stock</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">
                            ${filteredProducts.reduce((sum, p) => sum + ((p.quantity || 0) * (p.price || 0)), 0).toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Total Value</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default Products;