import { Store, SKU, PlanningData } from '../types';

export const sampleStores: Store[] = [
  { id: 'ST035', name: 'San Francisco Bay Trends', order: 1 },
  { id: 'ST046', name: 'Phoenix Sunwear', order: 2 },
  { id: 'ST064', name: 'Dallas Ranch Supply', order: 3 },
  { id: 'ST066', name: 'Atlanta Outfitters', order: 4 },
  { id: 'ST073', name: 'Nashville Melody Music Store', order: 5 },
  { id: 'ST074', name: 'New York Empire Eats', order: 6 },
  { id: 'ST091', name: 'Denver Peaks Outdoor', order: 7 },
  { id: 'ST094', name: 'Philadelphia Liberty Market', order: 8 },
  { id: 'ST097', name: 'Boston Harbor Books', order: 9 },
  { id: 'ST101', name: 'Austin Vibe Co.', order: 10 },
  { id: 'ST131', name: 'Los Angeles Luxe', order: 11 },
  { id: 'ST150', name: 'Houston Harvest Market', order: 12 },
  { id: 'ST151', name: 'Portland Evergreen Goods', order: 13 },
  { id: 'ST156', name: 'Chicago Charm Boutique', order: 14 },
  { id: 'ST163', name: 'Las Vegas Neon Treasures', order: 15 },
  { id: 'ST175', name: 'Seattle Skyline Goods', order: 16 },
  { id: 'ST176', name: 'Miami Breeze Apparel', order: 17 },
  { id: 'ST177', name: 'San Diego Wave Surf Shop', order: 18 },
  { id: 'ST193', name: 'Charlotte Queen Closet', order: 19 },
  { id: 'ST208', name: 'Detroit Motor Gear', order: 20 },
];


export const sampleSKUs: SKU[] = [
  { id: "SK00158", name: "Crew Neck Merino Wool Sweater", class: "Tops", department: "Men's Apparel", price: 114.99, cost: 18.28 },
  { id: "SK00269", name: "Faux Leather Leggings", class: "Jewelry", department: "Footwear", price: 9.99, cost: 8.45 },
  { id: "SK00300", name: "Fleece-Lined Parka", class: "Jewelry", department: "Unisex Accessories", price: 199.99, cost: 17.80 },
  { id: "SK00304", name: "Cotton Polo Shirt", class: "Tops", department: "Women's Apparel", price: 139.99, cost: 10.78 },
  { id: "SK00766", name: "Foldable Travel Hat", class: "Tops", department: "Footwear", price: 44.99, cost: 27.08 },
  { id: "SK00786", name: "Chic Quilted Wallet", class: "Bottoms", department: "Footwear", price: 14.99, cost: 4.02 },
  { id: "SK00960", name: "High-Slit Maxi Dress", class: "Outerwear", department: "Sportswear", price: 74.99, cost: 47.47 },
  { id: "SK01183", name: "Turtleneck Cable Knit Sweater", class: "Footwear", department: "Footwear", price: 49.99, cost: 22.60 },
  { id: "SK01189", name: "Retro-Inspired Sunglasses", class: "Bottoms", department: "Women's Apparel", price: 194.99, cost: 115.63 },
  { id: "SK01193", name: "Stretch Denim Overalls", class: "Bottoms", department: "Unisex Accessories", price: 129.99, cost: 47.06 },
  { id: "SK01249", name: "Adjustable Elastic Headband", class: "Footwear", department: "Women's Apparel", price: 19.99, cost: 1.34 },
  { id: "SK01319", name: "Adjustable Baseball Cap", class: "Jewelry", department: "Men's Apparel", price: 4.99, cost: 2.29 },
  { id: "SK01349", name: "Cotton Polo Shirt", class: "Bottoms", department: "Unisex Accessories", price: 114.99, cost: 60.94 },
  { id: "SK01549", name: "Faux Suede Ankle Boots", class: "Tops", department: "Sportswear", price: 94.99, cost: 71.53 },
  { id: "SK01566", name: "Striped Cotton Socks", class: "Accessories", department: "Sportswear", price: 9.99, cost: 6.91 },
  { id: "SK01642", name: "Performance Compression Tights", class: "Outerwear", department: "Sportswear", price: 54.99, cost: 59.61 },
  { id: "SK01733", name: "Vintage Logo Hoodie", class: "Accessories", department: "Men's Apparel", price: 94.99, cost: 84.45 },
  { id: "SK01896", name: "Floral Chiffon Wrap Dress", class: "Accessories", department: "Unisex Accessories", price: 149.99, cost: 68.55 },
  { id: "SK01927", name: "Asymmetrical Hem Skirt", class: "Jewelry", department: "Sportswear", price: 99.99, cost: 66.89 },
  { id: "SK01950", name: "Slim Fit Pinstripe Suit", class: "Bottoms", department: "Women's Apparel", price: 99.99, cost: 13.30 }
];

export const generateSamplePlanningData = (): PlanningData[] => {
  const planningData: PlanningData[] = [];
  
  const generateWeeks = () => {
    const weeks = [];
    // let weekCounter = 1;
    
    for (let i = 1; i <= 12; i++) {
      const formattedWeekNumber = i.toString().padStart(2, '0');
      weeks.push(`week-${formattedWeekNumber}`);
    }
    
    return weeks;
  };
  
  const weeks = generateWeeks();
  
  weeks.forEach(weekId => {
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
  });
  
  return planningData;
};