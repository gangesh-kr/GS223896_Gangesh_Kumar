import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../types';

interface StoreState {
  stores: Store[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  stores: [],
  isLoading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Omit<Store, 'id' | 'order'>>) => {
      const newOrder = state.stores.length > 0 
        ? Math.max(...state.stores.map(store => store.order)) + 1 
        : 0;
      
      state.stores.push({
        id: Date.now().toString(),
        name: action.payload.name,
        order: newOrder,
      });
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex(store => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(store => store.id !== action.payload);
    },
    reorderStore: (state, action: PayloadAction<{ id: string; newOrder: number }>) => {
      const { id, newOrder } = action.payload;
      const store = state.stores.find(s => s.id === id);
      
      if (store) {
        const oldOrder = store.order;
        
        state.stores.forEach(s => {
          if (s.id === id) {
            s.order = newOrder;
          } else if (oldOrder < newOrder && s.order > oldOrder && s.order <= newOrder) {
            s.order--;
          } else if (oldOrder > newOrder && s.order < oldOrder && s.order >= newOrder) {
            s.order++;
          }
        });
      }
    },

    importStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    }
  },
});

export const { addStore, updateStore, removeStore, reorderStore, importStores } = storeSlice.actions;
export default storeSlice.reducer;