import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { SKU } from '../../types';
import Grid from '@mui/material/Grid';

interface SKUItemProps {
  sku: SKU;
  onUpdate: (updatedSKU: SKU) => void;
  onRemove: (id: string) => void;
}

const SKUItem: React.FC<SKUItemProps> = ({
  sku,
  onUpdate,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(sku.name);
  const [price, setPrice] = useState(sku.price.toString());
  const [cost, setCost] = useState(sku.cost.toString());

  const handleSave = () => {
    const priceValue = parseFloat(price);
    const costValue = parseFloat(cost);
    
    if (isNaN(priceValue) || isNaN(costValue)) {
      alert('Price and Cost must be valid numbers');
      return;
    }
    
    onUpdate({ 
      ...sku, 
      name, 
      price: priceValue, 
      cost: costValue 
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(sku.name);
    setPrice(sku.price.toString());
    setCost(sku.cost.toString());
    setIsEditing(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SKU Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  type="number"
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button 
                    startIcon={<SaveIcon />} 
                    variant="contained" 
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button 
                    startIcon={<CancelIcon />} 
                    variant="outlined" 
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">{sku.name}</Typography>
              <Box>
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onRemove(sku.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body1">
                Price: {formatCurrency(sku.price)}
              </Typography>
              <Typography variant="body1">
                Cost: {formatCurrency(sku.cost)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Margin: {formatCurrency(sku.price - sku.cost)} ({((sku.price - sku.cost) / sku.price * 100).toFixed(1)}%)
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SKUItem;