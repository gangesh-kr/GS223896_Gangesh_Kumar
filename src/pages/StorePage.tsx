import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StoreList from '../components/Store/StoreList';

const StorePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Store Management
      </Typography>
      <StoreList />
    </Container>
  );
};

export default StorePage;