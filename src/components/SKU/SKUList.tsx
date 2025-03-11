import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { RootState } from '../../store';
import { addSKU, updateSKU, removeSKU, importSKUs  } from '../../store/skuSlice';
import SKUItem from './SKUItem';
import { SKU } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import { sampleSKUs } from '../../utils/sampleData';

const SKUList: React.FC = () => {
  const [newSkuName, setNewSkuName] = useState('');
  const [newSkuPrice, setNewSkuPrice] = useState('');
  const [newSkuCost, setNewSkuCost] = useState('');
  
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);

  const handleAddSKU = () => {
    if (newSkuName.trim() && newSkuPrice && newSkuCost) {
      const price = parseFloat(newSkuPrice);
      const cost = parseFloat(newSkuCost);
      
      if (isNaN(price) || isNaN(cost)) {
        alert('Price and Cost must be valid numbers');
        return;
      }
      
      dispatch(addSKU({
        name: newSkuName.trim(),
        price,
        cost,
        class: 'default-class', // Provide a valid class value
        department: 'default-dept' // Provide a valid department value
      }));
      
      
      setNewSkuName('');
      setNewSkuPrice('');
      setNewSkuCost('');
    }
  };

  const handleUpdateSKU = (updatedSKU: SKU) => {
    dispatch(updateSKU(updatedSKU));
  };

  const handleRemoveSKU = (id: string) => {
    dispatch(removeSKU(id));
};

useEffect(() => {
  if (skus.length === 0) {
    dispatch(importSKUs(sampleSKUs));
  }
}, [dispatch]);

return (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ mb: 3 }}>
      SKUs
    </Typography>
    
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="SKU Name"
          variant="outlined"
          value={newSkuName}
          onChange={(e) => setNewSkuName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Price"
          variant="outlined"
          value={newSkuPrice}
          onChange={(e) => setNewSkuPrice(e.target.value)}
          type="number"
          fullWidth
          InputProps={{
            startAdornment: '$',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Cost"
          variant="outlined"
          value={newSkuCost}
          onChange={(e) => setNewSkuCost(e.target.value)}
          type="number"
          fullWidth
          InputProps={{
            startAdornment: '$',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddSKU}
          disabled={!newSkuName.trim() || !newSkuPrice || !newSkuCost}
          fullWidth
        >
          Add SKU
        </Button>
      </Grid>
    </Grid>

    {skus.length === 0 ? (
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
        No SKUs added yet. Add your first SKU above.
      </Typography>
    ) : (
      skus.map((sku) => (
        <SKUItem
          key={sku.id}
          sku={sku}
          onUpdate={handleUpdateSKU}
          onRemove={handleRemoveSKU}
        />
      ))
    )}
  </Paper>
);
};

export default SKUList;