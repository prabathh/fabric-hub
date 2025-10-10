import { MdOutlineDashboard, MdOutlineInventory, MdOutlineAccountBalance } from "react-icons/md";
import { TbCalendarDollar } from "react-icons/tb";

export const DASH_NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    route: "/dashboard",
    icon: MdOutlineDashboard
  },
  {
    id: "inventory-management",
    label: "Inventory Management",
    route: "/dashboard/inventory",
    icon: MdOutlineInventory
  },
  {
    id: "sales-invoice",
    label: "Sales Invoice",
    route: "/dashboard/sales",
    icon: TbCalendarDollar
  },
  {
    id: "accounts",
    label: "Accounts",
    route: "/dashboard/accounts",
    icon: MdOutlineAccountBalance
  },
];

export const SHIPPING_OPTIONS = {
  colombo: {
    destination: "Colombo District (0–15)",
    arrival: "3–4 Working Day",
    cost: "Rs 1,000.00",
  },
  outside: {
    destination: "Outside Colombo District",
    arrival: "3–4 Working Day",
    cost: "Rs 1,500.00",
  },
  pickup: {
    destination: "Store Pickup",
    arrival: "-",
    cost: "Free",
  },
};


export const SHOP_NAV_CATEGORIES = [
  { slug: "new-arrivals", name: "New Arrivals", special: false },
  { slug: "best-sellers", name: "Best Sellers", special: false },
  { slug: "fast-moving", name: "Fast Moving", special: false },
  { slug: "sale", name: "Sale", special: true },
];

export const AVAILABLE_TAGS = [
  { id: "new-arrivals", name: "New Arrivals" },
  { id: "best-sellers", name: "Best Sellers" },
  { id: "fast-moving", name: "Fast Moving" },
  { id: "sale", name: "Sale" },
];

export const ITEM_COLORS = [
  { name: "Red", hex: "#ef4444" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#10b981" },
  { name: "Black", hex: "#000000" },
];

export const MOCK_FILTERS = {
  Color: ["Red", "Blue", "Black", "White"],
  Size: ["S", "M", "L", "XL"],
  Availability: ["In Stock", "Pre-Order"],
};





import { FaDollarSign, FaBoxOpen, FaShoppingCart, FaClock } from 'react-icons/fa';
export const STATS_DATA = [
  { name: "Total Revenue", value: "$125,450", icon: FaDollarSign, color: "text-green-600" },
  { name: "Inventory Value", value: "$45,900", icon: FaBoxOpen, color: "text-blue-600" },
  { name: "Total Orders", value: "3,120", icon: FaShoppingCart, color: "text-purple-600" },
  { name: "Pending Orders", value: "45", icon: FaClock, color: "text-red-600" },
];