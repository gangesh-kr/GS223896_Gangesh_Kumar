import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CellValueChangedEvent, ColDef, ColGroupDef } from 'ag-grid-community';
import { RootState } from '../../store';
import { updateSalesUnit } from '../../store/planningSlice';
import { Box, Paper } from '@mui/material';
import { SKU, Store, CalendarWeek, PlanningData } from '../../types';

import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const PlanningGrid: React.FC = () => {
  const dispatch = useDispatch();
  
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const weeks = useSelector((state: RootState) => state.calendar.weeks);
  const planningData = useSelector((state: RootState) => state.planning.planningData);
  
  const sortedStores = [...stores].sort((a, b) => a.order - b.order);
  
  const getSalesUnits = useCallback((storeId: string, skuId: string, weekId: string): number => {
    const data = planningData.find(
      item => item.storeId === storeId && item.skuId === skuId && item.weekId === weekId
    );
    return data ? data.salesUnits : 0;
  }, [planningData]);
  
  const calculateSalesDollars = useCallback((salesUnits: number, skuId: string): number => {
    const sku = skus.find(s => s.id === skuId);
    return sku ? salesUnits * sku.price : 0;
  }, [skus]);
  
  const calculateGMDollars = useCallback((salesUnits: number, skuId: string): number => {
    const sku = skus.find(s => s.id === skuId);
    if (!sku) return 0;
    
    const salesDollars = salesUnits * sku.price;
    const costDollars = salesUnits * sku.cost;
    return salesDollars - costDollars;
  }, [skus]);
  
  const calculateGMPercentage = useCallback((salesDollars: number, gmDollars: number): number => {
    return salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
  }, []);
  
  const rowData = useMemo(() => {
    if (!weeks.length || !stores.length || !skus.length || !planningData.length) {
      console.log('Missing data for rows');
      return [];
    }
    
    const rows: any[] = [];
    
    sortedStores.forEach(store => {
      skus.forEach(sku => {
        const row: any = {
          id: `${store.id}-${sku.id}`,
          store: store.name,
          storeId: store.id,
          sku: sku.name,
          skuId: sku.id,
          price: sku.price,
          cost: sku.cost,
        };
        
        weeks.forEach(week => {
          const salesUnits = getSalesUnits(store.id, sku.id, week.id);
          const salesDollars = calculateSalesDollars(salesUnits, sku.id);
          const gmDollars = calculateGMDollars(salesUnits, sku.id);
          const gmPercentage = calculateGMPercentage(salesDollars, gmDollars);
          
          row[`${week.id}_salesUnits`] = salesUnits;
          row[`${week.id}_salesDollars`] = salesDollars;
          row[`${week.id}_gmDollars`] = gmDollars;
          row[`${week.id}_gmPercentage`] = gmPercentage;
        });
        
        rows.push(row);
      });
    });
    
    return rows;
  }, [sortedStores, skus, weeks, planningData, getSalesUnits, calculateSalesDollars, calculateGMDollars, calculateGMPercentage]);
  
  const columnDefs = useMemo(() => {
    const cols: (ColDef | ColGroupDef)[] = [
      {
        headerName: 'Store',
        field: 'store',
        pinned: 'left',
        filter: true,
        width: 150,
      },
      {
        headerName: 'SKU',
        field: 'sku',
        pinned: 'left',
        filter: true,
        width: 150,
      },
    ];
  
    weeks.forEach(week => {
      const weekColGroup: ColGroupDef = {
        headerName: `Week ${week.weekNumber}`,
        children: [
          {
            headerName: 'Sales Units',
            field: `${week.id}_salesUnits`,
            editable: true,
            type: 'numericColumn',
            width: 120,
            valueParser: (params) => {
              const value = Number(params.newValue);
              return isNaN(value) ? 0 : Math.max(0, Math.round(value));
            },
            cellStyle: { backgroundColor: '#f2f2f2' },
          },
          {
            headerName: 'Sales $',
            field: `${week.id}_salesDollars`,
            editable: false,
            valueFormatter: (params) => {
              return params.value != null
                ? `$${params.value.toFixed(2)}`
                : '';
            },
            type: 'numericColumn',
            width: 120,
          },
          {
            headerName: 'GM $',
            field: `${week.id}_gmDollars`,
            editable: false,
            valueFormatter: (params) => {
              return params.value != null
                ? `$${params.value.toFixed(2)}`
                : '';
            },
            type: 'numericColumn',
            width: 120,
          },
          {
            headerName: 'GM %',
            field: `${week.id}_gmPercentage`,
            editable: false,
            valueFormatter: (params) => {
              return params.value != null
                ? `${params.value.toFixed(1)}%`
                : '';
            },
            type: 'numericColumn',
            width: 120,
            cellStyle: (params) => {
              const value = params.value as number;
              if (value >= 40) return { backgroundColor: '#a5d6a7', color: 'black' };
              if (value >= 30) return { backgroundColor: '#fff59d', color: 'black' };
              if (value >= 10) return { backgroundColor: '#ffcc80', color: 'black' };
              return { backgroundColor: '#ef9a9a', color: 'black' };
            },
          },
        ],
      };
      
      cols.push(weekColGroup);
    });
    
    return cols;
  }, [weeks]);
  
  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const { data, colDef } = event;
    const field = colDef.field as string;

    if (field && field.endsWith('_salesUnits')) {
      const weekId = field.split('_')[0];
      
      dispatch(updateSalesUnit({
        storeId: data.storeId,
        skuId: data.skuId,
        weekId,
        salesUnits: event.newValue
      }));
    }
  }, [dispatch]);
  
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
    };
  }, []);
  
  return (
    <Paper sx={{ height: '100vh', width: '100%', p: 0, m: 0 }}>
      <Box className="ag-theme-alpine" sx={{ height: '100vh', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          rowHeight={40}
          headerHeight={48}
          suppressMovableColumns={true}
        />
      </Box>
    </Paper>
  );
};

export default PlanningGrid;