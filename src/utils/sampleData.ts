import { Store, SKU, PlanningData } from '../types';

export const sampleStores: Store[] = [
  { id: 'store-1', name: 'Downtown Store', order: 0 },
  { id: 'store-2', name: 'Mall Location', order: 1 },
  { id: 'store-3', name: 'Suburban Store', order: 2 },
  { id: 'store-4', name: 'Airport Kiosk', order: 3 },
];


export const sampleSKUs: SKU[] = [
  { id: 'sku-1', name: 'Premium T-Shirt', price: 24.99, cost: 10.50 },
  { id: 'sku-2', name: 'Basic Jeans', price: 39.99, cost: 18.25 },
  { id: 'sku-3', name: 'Leather Jacket', price: 89.99, cost: 45.00 },
  { id: 'sku-4', name: 'Running Shoes', price: 64.99, cost: 28.75 },
  { id: 'sku-5', name: 'Casual Socks', price: 9.99, cost: 2.50 },
];


export const generateSamplePlanningData = (): PlanningData[] => {
  const planningData: PlanningData[] = [];
  

  for (let weekNum = 1; weekNum <= 12; weekNum++) {
    const weekId = `week-${weekNum}`;

    sampleStores.forEach(store => {

      sampleSKUs.forEach(sku => {
        
        const salesUnits = Math.floor(Math.random() * 95) + 5;
        
        planningData.push({
          storeId: store.id,
          skuId: sku.id,
          weekId,
          salesUnits,
        });
      });
    });
  }
  
  return planningData;
};