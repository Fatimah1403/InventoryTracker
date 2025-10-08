import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function StatCard({ title, value, icon, color, bgColor, alert = false }) {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {alert && (
        <Box
          sx={{
            position: 'absolute',
            top: -5,
            right: 10,
            backgroundColor: 'error.main',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          !
        </Box>
      )}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              backgroundColor: bgColor,
              color: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography color="text.secondary" variant="body2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;

