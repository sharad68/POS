// ── Format number as NPR currency ──
export const fmt = (n) => `NPR ${Number(n).toFixed(2)}`;

// ── Get today's date as YYYY-MM-DD ──
export const todayISO = () => new Date().toISOString().split("T")[0];

// ── Get current time as HH:MM AM/PM ──
export const timeNow = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

// ── Get formatted date like "May 3, 2026" ──
export const dateFmt = () =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// ── Format bill number like INV-00001 ──
export const billNumber = (n) => `INV-${String(n).padStart(5, "0")}`;

// ── Get stock status label + color for a product ──
export const stockStatus = (product) => {
  if (product.stock === 0) {
    return {
      label: "Out of Stock",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.12)",
      border: "rgba(239,68,68,0.25)",
    };
  }
  if (product.stock <= product.minStock) {
    return {
      label: "Low Stock",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.25)",
    };
  }
  return {
    label: "In Stock",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
  };
};

// ── Save data to localStorage ──
export const saveLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Save failed:", e);
  }
};

// ── Load data from localStorage ──
export const loadLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};