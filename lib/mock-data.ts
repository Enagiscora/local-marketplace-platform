// Session mock marketplace data for the dashboards.
// Deterministic sample data used to populate Suggestions, Search, History,
// and Wallet. Replace with real queries (Neon) once the backend is connected.

export type Product = {
  id: string
  name: string
  category: string
  price: number
  seller: string
  sellerUsername: string
  rating: number
  locality: string
  lga: string
  state: string
  demandScore: number // 0-100, used for "trending in your area"
  // Relative coordinates (0-1) for the placeholder map overlay.
  mapX: number
  mapY: number
}

export type Transaction = {
  id: string
  date: string
  counterparty: string
  item: string
  amount: number
  type: 'sale' | 'purchase' | 'deposit' | 'withdrawal' | 'escrow'
  status: 'completed' | 'pending' | 'in-escrow' | 'refunded'
}

export type Review = {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Ankara Fabric (6 yards)', category: 'Fashion & Clothing', price: 8500, seller: "Ada's Fabrics", sellerUsername: 'adasfabrics', rating: 4.8, locality: 'Yaba', lga: 'Lagos Mainland', state: 'Lagos', demandScore: 92, mapX: 0.32, mapY: 0.4 },
  { id: 'p2', name: 'iPhone 13 (UK Used)', category: 'Phones & Accessories', price: 285000, seller: 'TechHub NG', sellerUsername: 'techhubng', rating: 4.6, locality: 'Computer Village', lga: 'Ikeja', state: 'Lagos', demandScore: 98, mapX: 0.6, mapY: 0.25 },
  { id: 'p3', name: 'Fresh Farm Eggs (Crate)', category: 'Food & Groceries', price: 3200, seller: 'GreenGrocer', sellerUsername: 'greengrocer', rating: 4.9, locality: 'Ketu', lga: 'Kosofe', state: 'Lagos', demandScore: 76, mapX: 0.72, mapY: 0.55 },
  { id: 'p4', name: 'Leather Sandals (Handmade)', category: 'Shoes & Bags', price: 12000, seller: 'Kano Leatherworks', sellerUsername: 'kanoleather', rating: 4.7, locality: 'Surulere', lga: 'Surulere', state: 'Lagos', demandScore: 64, mapX: 0.45, mapY: 0.62 },
  { id: 'p5', name: 'Solar Inverter 1.5kVA', category: 'Electronics & Gadgets', price: 145000, seller: 'PowerUp Energy', sellerUsername: 'powerup', rating: 4.5, locality: 'Ikeja GRA', lga: 'Ikeja', state: 'Lagos', demandScore: 88, mapX: 0.55, mapY: 0.35 },
  { id: 'p6', name: 'Shea Butter (1kg)', category: 'Health & Beauty', price: 4500, seller: 'Naturals by Zainab', sellerUsername: 'naturalsz', rating: 5.0, locality: 'Yaba', lga: 'Lagos Mainland', state: 'Lagos', demandScore: 71, mapX: 0.3, mapY: 0.48 },
  { id: 'p7', name: 'Office Desk (Mahogany)', category: 'Home & Furniture', price: 62000, seller: 'WoodCraft', sellerUsername: 'woodcraft', rating: 4.4, locality: 'Mushin', lga: 'Mushin', state: 'Lagos', demandScore: 52, mapX: 0.4, mapY: 0.72 },
  { id: 'p8', name: 'Gas Cooker (4 burner)', category: 'Kitchen & Appliances', price: 78000, seller: 'HomeEssentials', sellerUsername: 'homeess', rating: 4.6, locality: 'Ikorodu', lga: 'Ikorodu', state: 'Lagos', demandScore: 69, mapX: 0.82, mapY: 0.7 },
]

export const SELLER_SALES: Transaction[] = [
  { id: 't1', date: '2026-08-14', counterparty: 'chinedu_a', item: 'Ankara Fabric (6 yards)', amount: 17000, type: 'sale', status: 'completed' },
  { id: 't2', date: '2026-08-13', counterparty: 'bola_shopper', item: 'Lace Material (5 yards)', amount: 22500, type: 'sale', status: 'in-escrow' },
  { id: 't3', date: '2026-08-11', counterparty: 'tunde99', item: 'Ankara Fabric (6 yards)', amount: 8500, type: 'sale', status: 'completed' },
  { id: 't4', date: '2026-08-10', counterparty: 'Wallet', item: 'Withdrawal to bank', amount: 40000, type: 'withdrawal', status: 'completed' },
  { id: 't5', date: '2026-08-08', counterparty: 'amaka_k', item: 'Adire Set', amount: 15000, type: 'sale', status: 'refunded' },
]

export const BUYER_PURCHASES: Transaction[] = [
  { id: 'b1', date: '2026-08-15', counterparty: 'techhubng', item: 'iPhone 13 (UK Used)', amount: 285000, type: 'purchase', status: 'in-escrow' },
  { id: 'b2', date: '2026-08-12', counterparty: 'greengrocer', item: 'Fresh Farm Eggs (Crate)', amount: 3200, type: 'purchase', status: 'completed' },
  { id: 'b3', date: '2026-08-09', counterparty: 'Wallet', item: 'Wallet top-up (card)', amount: 300000, type: 'deposit', status: 'completed' },
  { id: 'b4', date: '2026-08-05', counterparty: 'naturalsz', item: 'Shea Butter (1kg)', amount: 4500, type: 'purchase', status: 'completed' },
]

export const SELLER_REVIEWS: Review[] = [
  { id: 'r1', author: 'chinedu_a', rating: 5, comment: 'Fast delivery and the fabric quality is top notch. Will buy again!', date: '2026-08-14' },
  { id: 'r2', author: 'tunde99', rating: 5, comment: 'Very responsive seller, escrow made me feel safe.', date: '2026-08-11' },
  { id: 'r3', author: 'amaka_k', rating: 4, comment: 'Good product but delivery took a day longer than expected.', date: '2026-08-08' },
]

export const TRENDING_IN_AREA = [
  { name: 'Solar Inverters', change: '+34%', note: 'High demand this week' },
  { name: 'Ankara & Lace', change: '+21%', note: 'Wedding season' },
  { name: 'UK Used Phones', change: '+18%', note: 'Trending in Ikeja' },
  { name: 'Foodstuff Bundles', change: '+12%', note: 'Steady demand' },
]

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

// Placeholder wallet balances (kobo-free, whole naira).
export const SELLER_WALLET = { available: 128500, inEscrow: 22500, pendingPayout: 0 }
export const BUYER_WALLET = { available: 11800, inEscrow: 285000, pendingPayout: 0 }
