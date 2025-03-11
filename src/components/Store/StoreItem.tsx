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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Store } from '../../types';

interface StoreItemProps {
  store: Store;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (updatedStore: Store) => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

const StoreItem: React.FC<StoreItemProps> = ({
  store,
  isFirst,
  isLast,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(store.name);
console.log(store, "store")
  const handleSave = () => {
    onUpdate({ ...store, name });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(store.name);
    setIsEditing(false);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Store Name"
                variant="outlined"
                size="small"
                fullWidth
              />
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
          ) : (
            <>
              <Typography variant="h6">{store.name}</Typography>
              <Box>
                {!isFirst && (
                  <IconButton onClick={() => onMoveUp(store.id)}>
                    <ArrowUpwardIcon />
                  </IconButton>
                )}
                {!isLast && (
                  <IconButton onClick={() => onMoveDown(store.id)}>
                    <ArrowDownwardIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onRemove(store.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StoreItem;