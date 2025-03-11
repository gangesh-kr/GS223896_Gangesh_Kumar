import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from '../types';

interface SKUState {
  skus: SKU[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SKUState = {
  skus: [],
  isLoading: false,
  error: null,
};

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<Omit<SKU, 'id'>>) => {
      state.skus.push({
        id: Date.now().toString(),
        name: action.payload.name,
        price: action.payload.price,
        cost: action.payload.cost,
      });
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex(sku => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter(sku => sku.id !== action.payload);
    },

    importSKUs: (state, action: PayloadAction<SKU[]>) => {
      state.skus = action.payload;
    }
  },
});

export const { addSKU, updateSKU, removeSKU, importSKUs } = skuSlice.actions;
export default skuSlice.reducer;