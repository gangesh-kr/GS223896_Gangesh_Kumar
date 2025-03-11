import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StoreChart from '../components/Chart/StoreChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ChartPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [selectedStore, setSelectedStore] = useState<string>(stores.length > 0 ? stores[0].id : '');
  
  return (
    <Container maxWidth={false} sx={{ mt: 10, mb: 4, px: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Performance Charts
      </Typography>
      <StoreChart selectedStore={selectedStore} onStoreChange={setSelectedStore} />
    </Container>
  );
};

export default ChartPage;