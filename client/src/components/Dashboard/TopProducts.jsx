import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';

function TopProducts() {
  // For now, using dummy sales data
  const topProducts = [
    { name: 'California', sales: 87, percentage: 87 },
    { name: 'The Rustic Fox', sales: 71, percentage: 71 },
    { name: 'Velvet View', sales: 63, percentage: 63 },
    { name: 'Blue Horizon', sales: 58, percentage: 58 },
    { name: 'Delicia HeartBite', sales: 50, percentage: 50 },
    { name: 'Crimson Crafters', sales: 44, percentage: 44 },
    { name: 'Tulip Treasures', sales: 37, percentage: 37 },
    { name: 'Whimsy Well', sales: 31, percentage: 31 },
    { name: 'Mercantile', sales: 19, percentage: 19 },
    { name: 'Emporium', sales: 17, percentage: 17 },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Top 10 Stores by Sales
      </Typography>
      
      <List dense sx={{ mt: 2 }}>
        {topProducts.map((product, index) => (
          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {product.sales}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={product.percentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4A6B7C',
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Last 6 months
      </Typography>
    </Box>
  );
}

export default TopProducts;