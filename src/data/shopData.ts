// FILE PATH: src/data/shopData.ts
// Place this file at: src/data/shopData.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'NGN' | 'CAD';
  country: 'nigeria' | 'canada';
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  country: 'nigeria' | 'canada';
  items: Array<Product & { quantity: number }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// ─── NIGERIA PRODUCTS ─────────────────────────────────────────────────────────
export const nigeriaProducts: Product[] = [
  {
    id: 'ng-001',
    name: 'Industrial Safety Helmet',
    description: 'ANSI-certified hard hat suitable for oil field and construction site use. UV-resistant shell with comfortable inner suspension.',
    price: 18500,
    currency: 'NGN',
    country: 'nigeria',
    category: 'Oil & Gas Supplies',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 128,
    createdAt: '2024-11-01',
  },
  {
    id: 'ng-002',
    name: 'Steel-Toed Safety Boots',
    description: 'Heavy-duty protective footwear with puncture-resistant midsole and oil-resistant outsole. Meets ISO 20345 S3 standard.',
    price: 42000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'Oil & Gas Supplies',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 84,
    createdAt: '2024-11-10',
  },
  {
    id: 'ng-003',
    name: 'Portland Cement (50kg Bag)',
    description: 'Premium grade Portland cement suitable for all construction applications. Consistent quality and superior strength.',
    price: 9800,
    currency: 'NGN',
    country: 'nigeria',
    category: 'Construction Materials',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 210,
    createdAt: '2024-10-15',
  },
  {
    id: 'ng-004',
    name: 'Reinforced Steel Rods (12mm × 6m)',
    description: 'High-tensile deformed steel bars for reinforced concrete structures. Sold per bundle of 10 rods.',
    price: 87000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'Construction Materials',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 62,
    createdAt: '2024-10-20',
  },
  {
    id: 'ng-005',
    name: 'Solar Power Inverter (2.5KVA)',
    description: 'Pure sine wave inverter with built-in MPPT solar charge controller. Ideal for homes and small businesses.',
    price: 185000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'General Commerce',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.4,
    reviews: 97,
    createdAt: '2024-11-05',
  },
  {
    id: 'ng-006',
    name: 'Industrial Generator (10KVA)',
    description: 'Three-phase diesel generator with automatic voltage regulation. Low fuel consumption, suitable for SMEs.',
    price: 1250000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'General Commerce',
    image: 'https://images.unsplash.com/photo-1558618047-f4e7b5e88b3e?w=400&q=80',
    inStock: false,
    featured: false,
    rating: 4.9,
    reviews: 45,
    createdAt: '2024-09-30',
  },
  {
    id: 'ng-007',
    name: 'Wireless Barcode Scanner',
    description: 'Bluetooth 2D barcode reader compatible with Android, iOS, and Windows POS systems. 30-hour battery life.',
    price: 32000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'E-Commerce Goods',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 38,
    createdAt: '2024-11-12',
  },
  {
    id: 'ng-008',
    name: 'Thermal Receipt Printer',
    description: '80mm direct thermal printer with USB & Bluetooth connectivity. Fast 250mm/s print speed, auto-cutter included.',
    price: 58000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'E-Commerce Goods',
    image: 'https://images.unsplash.com/photo-1612540131591-84b3e79d89ad?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 71,
    createdAt: '2024-11-08',
  },
  {
    id: 'ng-009',
    name: 'PPE Kit – Full Set',
    description: 'Complete personal protective equipment kit: helmet, gloves, goggles, coverall, and steel-toed boots. Oil-field ready.',
    price: 95000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'Oil & Gas Supplies',
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 53,
    createdAt: '2024-10-25',
  },
  {
    id: 'ng-010',
    name: 'Interlocking Floor Tiles (Box)',
    description: 'Heavy-duty rubber interlocking tiles, 30-pack. Ideal for warehouses, garages, and commercial floors.',
    price: 25000,
    currency: 'NGN',
    country: 'nigeria',
    category: 'Construction Materials',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.2,
    reviews: 29,
    createdAt: '2024-10-18',
  },
];

// ─── CANADA PRODUCTS ───────────────────────────────────────────────────────────
export const canadaProducts: Product[] = [
  {
    id: 'ca-001',
    name: 'Diamond Core Drill Bit (150mm)',
    description: 'Professional-grade diamond core bit for concrete, granite, and masonry. Laser-welded segments for long life.',
    price: 189,
    currency: 'CAD',
    country: 'canada',
    category: 'Mining Equipment',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 92,
    createdAt: '2024-11-01',
  },
  {
    id: 'ca-002',
    name: 'Hydraulic Rock Splitter',
    description: 'Portable hydraulic rock and concrete splitter. 500-ton splitting force. No dust, no vibration.',
    price: 3499,
    currency: 'CAD',
    country: 'canada',
    category: 'Mining Equipment',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 34,
    createdAt: '2024-10-22',
  },
  {
    id: 'ca-003',
    name: 'Structural Steel I-Beam (W8×31)',
    description: 'ASTM A992 wide flange I-beam, 20ft length. Certified for structural applications. Mill test reports available.',
    price: 765,
    currency: 'CAD',
    country: 'canada',
    category: 'Construction Materials',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 57,
    createdAt: '2024-10-15',
  },
  {
    id: 'ca-004',
    name: 'Insulated Concrete Forms (ICF) Pack',
    description: 'EPS foam forms for energy-efficient concrete walls. R-22 insulation value. Covers 75 sq ft per pack.',
    price: 245,
    currency: 'CAD',
    country: 'canada',
    category: 'Construction Materials',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
    inStock: false,
    featured: false,
    rating: 4.5,
    reviews: 41,
    createdAt: '2024-11-03',
  },
  {
    id: 'ca-005',
    name: 'Industrial Air Compressor (60-Gal)',
    description: 'Two-stage cast iron pump, 175 PSI max pressure, 60-gallon tank. Ideal for commercial workshops.',
    price: 1299,
    currency: 'CAD',
    country: 'canada',
    category: 'Industrial Supplies',
    image: 'https://images.unsplash.com/photo-1558618047-f4e7b5e88b3e?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 88,
    createdAt: '2024-11-07',
  },
  {
    id: 'ca-006',
    name: 'Arc Welding Machine (250A)',
    description: 'Professional MIG/MMA welder with digital display. Dual voltage 110V/220V. Includes ground clamp and electrode holder.',
    price: 589,
    currency: 'CAD',
    country: 'canada',
    category: 'Industrial Supplies',
    image: 'https://images.unsplash.com/photo-1504222490345-c075b626a261?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 116,
    createdAt: '2024-10-30',
  },
  {
    id: 'ca-007',
    name: 'Industrial Shelving Unit (5-Tier)',
    description: 'Heavy-duty boltless steel shelving, 2000 lb capacity per shelf. Adjustable heights. Easy assembly.',
    price: 319,
    currency: 'CAD',
    country: 'canada',
    category: 'General Commerce',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 63,
    createdAt: '2024-11-09',
  },
  {
    id: 'ca-008',
    name: 'Commercial Pallet Jack (2.5T)',
    description: 'Manual hydraulic pallet truck with 2500kg load capacity. Ergonomic handle, 1220×685mm fork size.',
    price: 429,
    currency: 'CAD',
    country: 'canada',
    category: 'General Commerce',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 77,
    createdAt: '2024-10-12',
  },
  {
    id: 'ca-009',
    name: 'Ground Penetrating Radar Unit',
    description: 'Portable GPR system for underground utility detection and geological surveys. 400MHz antenna included.',
    price: 8950,
    currency: 'CAD',
    country: 'canada',
    category: 'Mining Equipment',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    inStock: false,
    featured: false,
    rating: 4.9,
    reviews: 21,
    createdAt: '2024-09-28',
  },
  {
    id: 'ca-010',
    name: 'Heavy-Duty Work Gloves (12-Pack)',
    description: 'Cut-resistant Level A4 gloves with latex foam grip. Ideal for construction, mining, and material handling.',
    price: 89,
    currency: 'CAD',
    country: 'canada',
    category: 'Industrial Supplies',
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&q=80',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 142,
    createdAt: '2024-11-11',
  },
];

// ─── DUMMY ORDERS ──────────────────────────────────────────────────────────────
export const dummyOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerName: 'Emeka Okafor',
    customerEmail: 'emeka.okafor@email.com',
    country: 'nigeria',
    items: [{ ...nigeriaProducts[0], quantity: 2 }, { ...nigeriaProducts[2], quantity: 5 }],
    total: 86000,
    status: 'delivered',
    date: '2024-11-14',
  },
  {
    id: 'ORD-2024-002',
    customerName: 'Fatima Bello',
    customerEmail: 'fatima.bello@email.com',
    country: 'nigeria',
    items: [{ ...nigeriaProducts[4], quantity: 1 }],
    total: 185000,
    status: 'shipped',
    date: '2024-11-16',
  },
  {
    id: 'ORD-2024-003',
    customerName: 'James Adeyemi',
    customerEmail: 'james.a@email.com',
    country: 'nigeria',
    items: [{ ...nigeriaProducts[7], quantity: 1 }, { ...nigeriaProducts[6], quantity: 1 }],
    total: 90000,
    status: 'processing',
    date: '2024-11-17',
  },
  {
    id: 'ORD-2024-004',
    customerName: 'Michael Tremblay',
    customerEmail: 'm.tremblay@email.ca',
    country: 'canada',
    items: [{ ...canadaProducts[2], quantity: 3 }],
    total: 2295,
    status: 'delivered',
    date: '2024-11-13',
  },
  {
    id: 'ORD-2024-005',
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.chen@email.ca',
    country: 'canada',
    items: [{ ...canadaProducts[4], quantity: 1 }, { ...canadaProducts[9], quantity: 2 }],
    total: 1477,
    status: 'shipped',
    date: '2024-11-15',
  },
  {
    id: 'ORD-2024-006',
    customerName: 'David Osei',
    customerEmail: 'd.osei@email.ca',
    country: 'canada',
    items: [{ ...canadaProducts[0], quantity: 4 }],
    total: 756,
    status: 'pending',
    date: '2024-11-18',
  },
];

export const allProducts = [...nigeriaProducts, ...canadaProducts];

export const nigeriaCategories = ['All', 'Oil & Gas Supplies', 'Construction Materials', 'General Commerce', 'E-Commerce Goods'];
export const canadaCategories = ['All', 'Mining Equipment', 'Construction Materials', 'Industrial Supplies', 'General Commerce'];

export const formatPrice = (price: number, currency: 'NGN' | 'CAD') => {
  if (currency === 'NGN') {
    return `₦${price.toLocaleString()}`;
  }
  return `CA$${price.toLocaleString()}`;
};
