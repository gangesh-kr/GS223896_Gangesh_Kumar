import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningData } from '../types';

interface PlanningState {
  planningData: PlanningData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PlanningState = {
  planningData: [],
  isLoading: false,
  error: null,
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    updateSalesUnit: (state, action: PayloadAction<PlanningData>) => {
      const { storeId, skuId, weekId, salesUnits } = action.payload;
      
      const existingIndex = state.planningData.findIndex(
        data => data.storeId === storeId && data.skuId === skuId && data.weekId === weekId
      );
      
      if (existingIndex !== -1) {
        
        state.planningData[existingIndex].salesUnits = salesUnits;
      } else {
        
        state.planningData.push(action.payload);
      }
    },
    
    importPlanningData: (state, action: PayloadAction<PlanningData[]>) => {
      state.planningData = action.payload;
    }
  },
});

export const { updateSalesUnit, importPlanningData } = planningSlice.actions;
export default planningSlice.reducer;