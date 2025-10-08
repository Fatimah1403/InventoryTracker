import { Box, Typography, Paper } from '@mui/material';

function ComingSoon({ title }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This feature is coming soon!
        </Typography>
      </Paper>
    </Box>
  );
}

export default ComingSoon;