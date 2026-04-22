import React, { useState } from 'react';
import { showSuccess, showError } from '../utils/toast';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

const categories = ['Electronics', 'Furniture', 'Clothing', 'Food', 'Books'];

function AddProduct() {
  const navigate = useNavigate();
  const { canAccess, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
  });

  const [_openSnackbar, setOpenSnackbar] = useState(false);
  const [_snackbarMessage, setSnackbarMessage] = useState('');
  const [_snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.quantity || !formData.price) {
      setSnackbarMessage('Please fill all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      setLoading(true);
      await productAPI.create({
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
      });

      showSuccess('Product added successfully!');
      setTimeout(() => navigate('/products'), 800);
    } catch (error) {
      console.error(error); 
      showError('Failed to add product.'); 

    } finally {
      setLoading(false);
    }
  };
  if (authLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (!canAccess(['admin', 'manager'])) {
    return <Navigate to="/unauthorized" replace/>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add New Product
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>

              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/products')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: '#4A6B7C' }}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddProduct;
