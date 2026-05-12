export const STORE = {
  name: "Himalaya Supermart",
  address: "Thamel, Kathmandu, Nepal",
  phone: "01-4234567",
  pan: "123456789",
  vatNo: "VAT-123456789",
};

export const VAT_RATE = 0.13;

export const CATEGORIES = [
  "All",
  "Beverages",
  "Instant Food",
  "Grains",
  "Cooking",
  "Dairy",
  "Essentials",
  "Snacks",
  "Personal Care",
  "Bakery",
];

export const CATEGORY_EMOJI = {
  Beverages: "🥤",
  "Instant Food": "🍜",
  Grains: "🌾",
  Cooking: "🫙",
  Dairy: "🥛",
  Essentials: "🧂",
  Snacks: "🍪",
  "Personal Care": "🧴",
  Bakery: "🍞",
  default: "📦",
};

export const INITIAL_PRODUCTS = [
  { id: "p1",  name: "Mineral Water 1L",  price: 25,  cat: "Beverages",     barcode: "8901300000001", stock: 120, minStock: 20, unit: "bottle", vatExempt: false, buyPrice: 18  },
  { id: "p2",  name: "Wai Wai Noodles",   price: 30,  cat: "Instant Food",  barcode: "8901300000002", stock: 85,  minStock: 15, unit: "pkt",    vatExempt: false, buyPrice: 22  },
  { id: "p3",  name: "Basmati Rice 1kg",  price: 180, cat: "Grains",        barcode: "8901300000003", stock: 45,  minStock: 10, unit: "kg",     vatExempt: true,  buyPrice: 140 },
  { id: "p4",  name: "Sunflower Oil 1L",  price: 320, cat: "Cooking",       barcode: "8901300000004", stock: 30,  minStock: 8,  unit: "bottle", vatExempt: false, buyPrice: 260 },
  { id: "p5",  name: "Milk 500ml",        price: 55,  cat: "Dairy",         barcode: "8901300000005", stock: 40,  minStock: 10, unit: "pkt",    vatExempt: true,  buyPrice: 44  },
  { id: "p6",  name: "Sugar 1kg",         price: 85,  cat: "Essentials",    barcode: "8901300000006", stock: 60,  minStock: 15, unit: "kg",     vatExempt: true,  buyPrice: 68  },
  { id: "p7",  name: "Glucose Biscuits",  price: 20,  cat: "Snacks",        barcode: "8901300000007", stock: 150, minStock: 30, unit: "pkt",    vatExempt: false, buyPrice: 15  },
  { id: "p8",  name: "Ilam Tea 250g",     price: 195, cat: "Beverages",     barcode: "8901300000008", stock: 25,  minStock: 8,  unit: "box",    vatExempt: false, buyPrice: 155 },
  { id: "p9",  name: "Salt 1kg",          price: 35,  cat: "Essentials",    barcode: "8901300000009", stock: 8,   minStock: 10, unit: "pkt",    vatExempt: true,  buyPrice: 28  },
  { id: "p10", name: "Bathing Soap",      price: 45,  cat: "Personal Care", barcode: "8901300000010", stock: 0,   minStock: 15, unit: "pc",     vatExempt: false, buyPrice: 35  },
  { id: "p11", name: "Bread Loaf",        price: 65,  cat: "Bakery",        barcode: "8901300000011", stock: 20,  minStock: 5,  unit: "pc",     vatExempt: false, buyPrice: 50  },
  { id: "p12", name: "Eggs (10pcs)",      price: 220, cat: "Dairy",         barcode: "8901300000012", stock: 35,  minStock: 8,  unit: "tray",   vatExempt: true,  buyPrice: 190 },
  { id: "p13", name: "Mustard Oil 1L",    price: 285, cat: "Cooking",       barcode: "8901300000013", stock: 18,  minStock: 8,  unit: "bottle", vatExempt: false, buyPrice: 230 },
  { id: "p14", name: "Dal Lentils 1kg",   price: 140, cat: "Grains",        barcode: "8901300000014", stock: 55,  minStock: 12, unit: "kg",     vatExempt: true,  buyPrice: 110 },
  { id: "p15", name: "Shampoo 200ml",     price: 185, cat: "Personal Care", barcode: "8901300000015", stock: 22,  minStock: 8,  unit: "bottle", vatExempt: false, buyPrice: 145 },
  { id: "p16", name: "Cold Drink 500ml",  price: 65,  cat: "Beverages",     barcode: "8901300000016", stock: 75,  minStock: 20, unit: "bottle", vatExempt: false, buyPrice: 48  },
];

export const USERS = [
  { id: "u1", name: "Owner",       role: "owner",   pin: "1234", initial: "O" },
  { id: "u2", name: "Ram Cashier", role: "cashier", pin: "5678", initial: "R" },
];