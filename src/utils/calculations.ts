import { SKU } from '../types';

/**
 * Calculate sales dollars based on sales units and SKU price
 * @param salesUnits Number of units sold
 * @param sku SKU object or price
 * @returns Sales dollars
 */
export const calculateSalesDollars = (salesUnits: number, sku: SKU | number): number => {
  const price = typeof sku === 'number' ? sku : sku.price;
  return salesUnits * price;
};

/**
 * Calculate GM (Gross Margin) dollars
 * @param salesUnits Number of units sold
 * @param sku SKU object
 * @returns GM dollars
 */
export const calculateGMDollars = (salesUnits: number, sku: SKU): number => {
  const salesDollars = calculateSalesDollars(salesUnits, sku);
  const costDollars = salesUnits * sku.cost;
  return salesDollars - costDollars;
};

/**
 * Calculate GM percentage
 * @param salesDollars Total sales dollars
 * @param gmDollars Gross margin dollars
 * @returns GM percentage (0-100)
 */
export const calculateGMPercentage = (salesDollars: number, gmDollars: number): number => {
  return salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
};

/**
 * Get color for GM percentage based on value
 * @param gmPercentage The GM percentage value
 * @returns CSS color code
 */
export const getGmPercentageColor = (gmPercentage: number): string => {
  if (gmPercentage >= 40) return '#a5d6a7'; // Green
  if (gmPercentage >= 10) return '#fff59d'; // Yellow
  if (gmPercentage > 5) return '#ffcc80';  // Orange
  return '#ef9a9a';  // Red
};