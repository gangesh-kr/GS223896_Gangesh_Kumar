export interface Store {
    id: string;
    name: string;
    order: number;
  }
  
  export interface SKU {
    id: string;
    name: string;
    price: number;
    cost: number;
  }
  
  export interface CalendarWeek {
    id: string;
    weekNumber: number;
    month: string;
    startDate: string;
    endDate: string;
  }
  
  export interface PlanningData {
    storeId: string;
    skuId: string;
    weekId: string;
    salesUnits: number;
  }
  
  export interface PlanningCellData {
    salesUnits: number;
    salesDollars: number;
    gmDollars: number;
    gmPercentage: number;
  }
  
  export interface ChartData {
    weekId: string;
    weekLabel: string;
    gmDollars: number;
    gmPercentage: number;
  }