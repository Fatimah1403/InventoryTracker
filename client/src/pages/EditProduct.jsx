import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../utils/toast';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Alert,
} from '@mui/material';
import { productAPI } from '../services/api';

const categories = ['Electronics', 'Furniture', 'Clothing', 'Food', 'Books'];

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getOne(id);
      const product = response.data.data;
      setFormData({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
      });
      setLoading(false);
    } catch (error) {
      setError('Failed to load product');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.update(id, {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
      });
      showSuccess('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      setError('Failed to update product');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Product
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
                <Button variant="outlined" onClick={() => navigate('/products')}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#4A6B7C' }}>
                  Update Product
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EditProduct;