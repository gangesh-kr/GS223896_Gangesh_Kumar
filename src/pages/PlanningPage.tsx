import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlanningGrid from '../components/Planning/PlanningGrid';
import { generateSamplePlanningData } from '../utils/sampleData';
import { importPlanningData } from '../store/planningSlice';

const PlanningPage: React.FC = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const sampleData = generateSamplePlanningData();
    dispatch(importPlanningData(sampleData));
  }, [dispatch]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Planning
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <PlanningGrid />
      </Box>
    </Box>
  );
};

export default PlanningPage;