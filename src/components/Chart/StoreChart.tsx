import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { RootState } from '../../store';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper, 
  Typography, 
  Box,
  SelectChangeEvent
} from '@mui/material';
import { SKU, Store, CalendarWeek, PlanningData } from '../../types';

interface StoreChartProps {
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

const StoreChart: React.FC<StoreChartProps> = ({ selectedStore, onStoreChange }) => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const weeks = useSelector((state: RootState) => state.calendar.weeks);
  const planningData = useSelector((state: RootState) => state.planning.planningData);
  
  const sortedStores = [...stores].sort((a, b) => a.order - b.order);

  const chartData = useMemo(() => {
    if (!selectedStore) return [];
    
    return weeks.map(week => {
      let totalSalesDollars = 0;
      let totalGMDollars = 0;
      
      skus.forEach(sku => {
        const planData = planningData.find(
          data => data.storeId === selectedStore && data.skuId === sku.id && data.weekId === week.id
        );
        
        if (planData) {
          const salesUnits = planData.salesUnits;
          const salesDollars = salesUnits * sku.price;
          const gmDollars = salesDollars - (salesUnits * sku.cost);
          
          totalSalesDollars += salesDollars;
          totalGMDollars += gmDollars;
        }
      });
      
      const gmPercentage = totalSalesDollars > 0 
        ? (totalGMDollars / totalSalesDollars) * 100 
        : 0;
      
      return {
        week: `Week ${week.weekNumber}`,
        weekId: week.id,
        gmDollars: totalGMDollars,
        gmPercentage
      };
    });
  }, [selectedStore, skus, weeks, planningData]);
  
  const handleStoreChange = (event: SelectChangeEvent) => {
    onStoreChange(event.target.value);
  };
  
  const selectedStoreName = useMemo(() => {
    const store = stores.find(s => s.id === selectedStore);
    return store ? store.name : 'Select a store';
  }, [selectedStore, stores]);
  
  return (
    <Paper sx={{ p: 3, height: 'calc(100vh - 200px)' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Store Performance Chart
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="store-select-label">Store</InputLabel>
          <Select
            labelId="store-select-label"
            id="store-select"
            value={selectedStore}
            label="Store"
            onChange={handleStoreChange}
          >
            {sortedStores.map(store => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {selectedStore ? (
        <Box sx={{ height: 'calc(100% - 130px)' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Gross Margin for {selectedStoreName}
          </Typography>
          
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" orientation="left" label={{ value: 'GM $', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'GM %', angle: 90, position: 'insideRight' }} />
              <Tooltip formatter={(value, name) => {
                if (name === 'GM $') return [`$${Number(value).toFixed(2)}`, name];
                if (name === 'GM %') return [`${Number(value).toFixed(1)}%`, name];
                return [value, name];
              }} />
              <Legend />
              <Bar yAxisId="left" dataKey="gmDollars" name="GM $" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="gmPercentage" name="GM %" stroke="#ff7300" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 10 }}>
          Please select a store to view the chart
        </Typography>
      )}
    </Paper>
  );
};

export default StoreChart;