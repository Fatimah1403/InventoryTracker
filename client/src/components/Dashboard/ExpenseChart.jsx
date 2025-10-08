import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
function ExpenseChart() {
    
    const data = [
      { month: 'Dec', expense: 30, profit: 40 },
      { month: 'Jan', expense: 25, profit: 35 },
      { month: 'Feb', expense: 35, profit: 30 },
      { month: 'Mar', expense: 40, profit: 45 },
      { month: 'April', expense: 28, profit: 48 },
      { month: 'May', expense: 32, profit: 52 },
      { month: 'Jun', expense: 30, profit: 55 },
    ];
  
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Expense vs Profit
        </Typography>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#FF6B6B"
              strokeWidth={2}
              dot={{ fill: '#FF6B6B' }}
              name="Expense"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#4ECDC4"
              strokeWidth={2}
              dot={{ fill: '#4ECDC4' }}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  }
  
  export default ExpenseChart;