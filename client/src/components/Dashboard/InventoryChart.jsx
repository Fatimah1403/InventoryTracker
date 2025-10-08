import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function InventoryChart({ products }) {
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const inStockCount = products.filter(p => p.quantity > 0).length;
  const outOfStockCount = products.filter(p => p.quantity === 0).length;
  
  const data = [
    { name: 'In Stock', value: inStockCount || 1, fill: '#4CAF50' },
    { name: 'Out of Stock', value: outOfStockCount || 0, fill: '#FF5252' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontSize: '0.9rem' }}>
        Inventory Values
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left side - Value */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ fontSize: '1.2rem' }}>
            ${totalValue.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            Total Value
          </Typography>
        </Box>
        
        {/* Right side - Chart */}
        <Box sx={{ width: 80, height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={18}
                outerRadius={30}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      
      {/* Simple Legend */}
      <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'center' }}>
        <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
          <span style={{ color: '#4CAF50' }}>●</span> In Stock ({inStockCount})
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
          <span style={{ color: '#FF5252' }}>●</span> Out ({outOfStockCount})
        </Typography>
      </Box>
    </Box>
  );
}

export default InventoryChart;