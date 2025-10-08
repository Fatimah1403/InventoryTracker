import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Inventory2Outlined,
  ShoppingCartOutlined,
  TrendingUpOutlined,
  WarningAmberOutlined,
  Add as AddIcon,
  Edit as EditIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { productAPI } from '../services/api';
import StatCard from '../components/Dashboard/StatCard';
import InventoryChart from '../components/Dashboard/InventoryChart';
import TopProducts from '../components/Dashboard/TopProducts';
import ExpenseChart from '../components/Dashboard/ExpenseChart';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalStock: 0,
    outOfStock: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // useEffect for the external API exchange rates
  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        const currencies = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'INR'];
        const rates = currencies.map(currency => ({
          currency: currency,
          rate: data.rates[currency],
          date: data.date
        }));
        setExchangeRates(rates);
      })
      .catch(error => console.error('Error fetching exchange rates:', error));
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await productAPI.getAll();
      const productData = response.data.data;

      const statistics = {
        totalProducts: productData.length,
        totalOrders: 2859,
        totalStock: productData.reduce((sum, product) => sum + product.quantity, 0),
        outOfStock: productData.filter(product => product.quantity === 0).length
      };
      
      setStats(statistics);
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Inventory2Outlined />,
      color: '#4CAF50',
      bgColor: '#E8F5E9',
    },
    {
      title: 'Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: <ShoppingCartOutlined />,
      color: '#2196F3',
      bgColor: '#E3F2FD',
    },
    {
      title: 'Total Stock',
      value: stats.totalStock.toLocaleString(),
      icon: <TrendingUpOutlined />,
      color: '#00BCD4',
      bgColor: '#E0F7FA',
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: <WarningAmberOutlined />,
      color: '#FF9800',
      bgColor: '#FFF3E0',
      alert: true,
    },
  ];

  return (
    <Box
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
    
    >
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 4, color: 'text.primary' }}>
        Dashboard Overview
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Charts and Tables */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* User Stats & Inventory Values Row */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, height: '200px' }}>
                <Typography variant="h6" gutterBottom>
                  No of Users
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px' }}>
                  <Typography variant="h2" color="primary">
                    583K
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center">
                  Total Customers
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, height: '200px' }}>
                <InventoryChart products={products} />
              </Paper>
            </Grid>
          </Grid>

          {/* Expense vs Profit Chart */}
          <Paper sx={{ p: 3 }}>
            <ExpenseChart />
          </Paper>
        </Grid>

        {/* Right Column - Top Products */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <TopProducts products={products} />
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Dashboard Widgets Row */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Currency Exchange Rates */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Currency Exchange Rates
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              Base: USD (For International Pricing)
            </Typography>
            {exchangeRates ? (
              <Box>
                {exchangeRates.map((rate) => (
                  <Box
                    key={rate.currency}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 1,
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <Typography variant="body2">{rate.currency}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {rate.rate.toFixed(3)}
                    </Typography>
                  </Box>
                ))}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 2, display: 'block', textAlign: 'center' }}
                >
                  Updated: {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Typography variant="body2" color="text.secondary">
                  Loading rates...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '300px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AddIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="New product added: Laptop"
                  secondary="2 minutes ago"
                  slotProps={{
                    primary: { style: { fontSize: '0.9rem' } },
                    secondary: { style: { fontSize: '0.75rem' } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <EditIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Quantity updated for: Mouse"
                  secondary="1 hour ago"
                  slotProps={{
                    primary: { style: { fontSize: '0.9rem' } },
                    secondary: { style: { fontSize: '0.75rem' } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <WarningIcon color="warning" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Low stock alert: Keyboard (5 items left)"
                  secondary="3 hours ago"
                  slotProps={{
                    primary: { style: { fontSize: '0.9rem' } },
                    secondary: { style: { fontSize: '0.75rem' } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AddIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="New category created: Office Supplies"
                  secondary="5 hours ago"
                  slotProps={{
                    primary: { style: { fontSize: '0.9rem' } },
                    secondary: { style: { fontSize: '0.75rem' } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <EditIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Price updated for: Wireless Mouse"
                  secondary="Yesterday"
                  slotProps={{
                    primary: { style: { fontSize: '0.9rem' } },
                    secondary: { style: { fontSize: '0.75rem' } }
                  }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;