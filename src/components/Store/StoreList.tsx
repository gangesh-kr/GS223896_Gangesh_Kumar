import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { RootState } from '../../store';
import { addStore, updateStore, removeStore, reorderStore } from '../../store/storeSlice';
import StoreItem from './StoreItem';
import { Store } from '../../types';
import AddIcon from '@mui/icons-material/Add';

const StoreList: React.FC = () => {
  const [newStoreName, setNewStoreName] = useState('');
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  const sortedStores = [...stores].sort((a, b) => a.order - b.order);

  const handleAddStore = () => {
    if (newStoreName.trim()) {
      dispatch(addStore({ name: newStoreName.trim() }));
      setNewStoreName('');
    }
  };

  const handleUpdateStore = (updatedStore: Store) => {
    dispatch(updateStore(updatedStore));
  };

  const handleRemoveStore = (id: string) => {
    dispatch(removeStore(id));
  };

  const handleMoveUp = (id: string) => {
    const currentStore = sortedStores.find(store => store.id === id);
    const currentIndex = sortedStores.findIndex(store => store.id === id);
    
    if (currentStore && currentIndex > 0) {
      const newOrder = sortedStores[currentIndex - 1].order;
      dispatch(reorderStore({ id, newOrder }));
    }
  };

  const handleMoveDown = (id: string) => {
    const currentStore = sortedStores.find(store => store.id === id);
    const currentIndex = sortedStores.findIndex(store => store.id === id);
    
    if (currentStore && currentIndex < sortedStores.length - 1) {
      const newOrder = sortedStores[currentIndex + 1].order;
      dispatch(reorderStore({ id, newOrder }));
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Stores
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="New Store Name"
          variant="outlined"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddStore}
          disabled={!newStoreName.trim()}
        >
          Add Store
        </Button>
      </Box>

      {sortedStores.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          No stores added yet. Add your first store above.
        </Typography>
      ) : (
        sortedStores.map((store, index) => (
          <StoreItem
            key={store.id}
            store={store}
            isFirst={index === 0}
            isLast={index === sortedStores.length - 1}
            onUpdate={handleUpdateStore}
            onRemove={handleRemoveStore}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        ))
      )}
    </Paper>
  );
};

export default StoreList;