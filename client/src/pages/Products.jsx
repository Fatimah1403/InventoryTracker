import React, { useState, useEffect } from 'react';
import { showSuccess, showError } from '../utils/toast';
import { sendOutOfStockEmail } from '../services/emailService';
import { useNotifications } from '../context/NotificationContext';

import { motion } from "framer-motion";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';


function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const { addNotification } = useNotifications();


    useEffect(() => {
        fetchProducts();
      }, []);
    
      useEffect(() => {
        // Filter products based on search
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      }, [searchTerm, products]);

      const fetchProducts = async () => {
        try {
            const response = await productAPI.getAll(); 
            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
          try {
            const product = products.find(p => p._id === id);
            await productAPI.delete(id);
            showSuccess('Product deleted successfully!');
            // Notification for history
            addNotification(`Deleted: ${product.name}`, 'info');
        
            fetchProducts();
          } catch (error) {
            showError('Failed to delete product');
            addNotification('Failed to delete product', 'error');
          }
        }
    };
    const handleQuantityChange = async (id, currentQuantity, change) => {
        const newQuantity = Math.max(0, currentQuantity + change);
        
        if (newQuantity === currentQuantity) return;
        
        try {
          const product = products.find(p => p._id === id);
          await productAPI.updateQuantity(id, newQuantity);
          
          if (newQuantity === 0 && currentQuantity > 0) {
            // Out of stock
            await sendOutOfStockEmail(product.name);
            showError(`⚠️ ${product.name} is now out of stock!`);
            addNotification(`${product.name} is out of stock! Email sent.`, 'error');
            
          } else if (newQuantity > 0 && newQuantity <= 5) {
            // Low stock warning
            showSuccess(`Quantity updated: ${newQuantity}`);
            addNotification(`Low stock warning: ${product.name} (${newQuantity} left)`, 'warning');
            
          } else {
            // Normal update
            showSuccess(`Quantity updated to ${newQuantity} for ${product.name}`);
          }
          
          await fetchProducts();  // Always fetch after any update
          
        } catch (error) {  // This closing bracket was missing
          showError("Failed to update quantity");
          addNotification('Failed to update quantity', 'error');
        }
    }; 
      
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Products Inventory</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/add-product')}
                    sx={{ backgroundColor: '#4A6B7C' }}
                    >
                    Add Product
                </Button>
            </Box>
            {/* Search Bar */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                />
            </Paper>
            {/* Products Table */}
            <TableContainer component={Paper}>
                <Table>
                     <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Quick Actions</TableCell>
                    <TableCell align="center">Actions</TableCell>
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
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleQuantityChange(product._id, product.quantity, -1)}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ mx: 2, minWidth: '40px', textAlign: 'center' }}>
                                            {product.quantity}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleQuantityChange(product._id, product.quantity, 1)}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${product.price}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={
                                        product.quantity === 0 
                                            ? 'Out of Stock' 
                                            : product.quantity <= 5 
                                            ? `Low Stock (${product.quantity})` 
                                            : 'In Stock'
                                        }
                                        color={
                                        product.quantity === 0 
                                            ? 'error'       
                                            : product.quantity <= 5 
                                            ? 'warning'    
                                            : 'success'   
                                        }
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Quick restock">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleQuantityChange(product._id, product.quantity, 10)}
                                        >
                                            +10
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => navigate(`/edit-product/${product._id}`)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                          </TableRow>
              ))}

                    </TableBody>
                    {filteredProducts.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                No products found
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/add-product')}
                                sx={{ mt: 2, backgroundColor: '#4A6B7C' }}
                            >
                                Add Your First Product
                            </Button>
                            </TableCell>
                        </TableRow>
                    )}

                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>

        </Box>

    )
    


}
export default Products;