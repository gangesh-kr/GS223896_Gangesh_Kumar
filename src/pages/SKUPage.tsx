import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SKUList from '../components/SKU/SKUList';

const SKUPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        SKU Management
      </Typography>
      <SKUList />
    </Container>
  );
};

export default SKUPage;