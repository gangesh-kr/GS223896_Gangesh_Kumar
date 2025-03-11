import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { importStores } from '../../store/storeSlice';
import { importSKUs } from '../../store/skuSlice';
import { importPlanningData } from '../../store/planningSlice';
import { sampleStores, sampleSKUs, generateSamplePlanningData } from '../../utils/sampleData';

const DataImporter: React.FC = () => {
  const dispatch = useDispatch();
  
  const handleImportSampleData = () => {
    dispatch(importStores(sampleStores));
    dispatch(importSKUs(sampleSKUs));
    dispatch(importPlanningData(generateSamplePlanningData()));
    
    alert('Sample data has been imported successfully!');
  };
  
  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<CloudUploadIcon />}
      onClick={handleImportSampleData}
      sx={{ ml: 2 }}
    >
      Import Sample Data
    </Button>
  );
};

export default DataImporter;