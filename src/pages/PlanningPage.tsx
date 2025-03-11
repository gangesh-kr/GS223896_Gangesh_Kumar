import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlanningGrid from '../components/Planning/PlanningGrid';

const PlanningPage: React.FC = () => {
  return (
    <Container maxWidth={false} sx={{ mt: 10, mb: 4, px: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Planning
      </Typography>
      <PlanningGrid />
    </Container>
  );
};

export default PlanningPage;