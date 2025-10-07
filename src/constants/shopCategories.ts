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

export const AVAILABLE_TAGS = [
  { id: "fast_moving", name: "Fast Moving" },
  { id: "sale", name: "Sale" },
  { id: "new_arrivals", name: "New Arrivals" },
];











export const SHOP_CATEGORIES = [
  { slug: "new-arrivals", name: "New Arrivals", special: false },
  { slug: "best-sellers", name: "Best Sellers", special: false },
  { slug: "fabrics-a-d", name: "Fabrics A–D", special: false },
  { slug: "fabrics-e-o", name: "Fabrics E–O", special: false },
  { slug: "fabrics-p-z", name: "Fabrics P–Z", special: false },
  { slug: "wish-list", name: "Wish List", special: false },
  { slug: "sale", name: "Sale", special: true },
];

export const SHOP_NAV_CATEGORIES = [
  { slug: "new-arrivals", name: "New Arrivals", special: false },
  { slug: "best-sellers", name: "Best Sellers", special: false },
  { slug: "fabrics-a-d", name: "Fabrics A–D", special: false },
  { slug: "fabrics-e-o", name: "Fabrics E–O", special: false },
  { slug: "fabrics-p-z", name: "Fabrics P–Z", special: false },
  { slug: "sale", name: "Sale", special: true },
];

import item_1 from "../../public/assets/item_1.png";
import item_2 from "../../public/assets/item_2.png";
import item_3 from "../../public/assets/item_3.png";
import item_4 from "../../public/assets/item_4.png";

export const SAMPLE_ITEMS = [
  { image: item_1, name: "Cotton Fabric", price: "$12.99", id: "item1" },
  { image: item_2, name: "Polyester Fabric", price: "$9.99", id: "item2" },
  { image: item_3, name: "Linen Fabric", price: "$15.99", id: "item3" },
  { image: item_4, name: "Silk Fabric", price: "$22.99", id: "item4" },
  { image: item_1, name: "Wool Fabric", price: "$18.99", id: "item5" },
  { image: item_2, name: "Velvet Fabric", price: "$25.99", id: "item6" },
  { image: item_3, name: "Denim Fabric", price: "$19.99", id: "item7" },
  { image: item_4, name: "Chiffon Fabric", price: "$14.99", id: "item8" },

  // { image: item_1, name: "Cotton Fabric", price: "$12.99",  },
  // { image: item_2, name: "Polyester Fabric", price: "$9.99" },
  // { image: item_3, name: "Linen Fabric", price: "$15.99" },
  // { image: item_4, name: "Silk Fabric", price: "$22.99" },
  // { image: item_1, name: "Wool Fabric", price: "$18.99" },
  // { image: item_2, name: "Velvet Fabric", price: "$25.99" },
  // { image: item_3, name: "Denim Fabric", price: "$19.99" },
  // { image: item_4, name: "Chiffon Fabric", price: "$14.99" },
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

export const INITIAL_CART_ITEMS = [
  {
    id: "item1",
    image: item_1,
    name: "Cotton Blend Marrakech Bloom",
    price: 180.0,
    details: "Color: Blue, Size: L",
    quantity: 1,
  },
  {
    id: "item2",
    image: item_2,
    name: "Slim Fit Jeans",
    price: 75.5,
    details: "Color: Black, Size: 32",
    quantity: 2,
  },
  {
    id: "item3",
    image: item_3,
    name: "Chiffon Fabric",
    price: 14.99,
    details: "Color: Red, Code: 75X",
    quantity: 1,
  },
];

import { FaDollarSign, FaBoxOpen, FaShoppingCart, FaClock } from 'react-icons/fa';
export const STATS_DATA = [
  { name: "Total Revenue", value: "$125,450", icon: FaDollarSign, color: "text-green-600" },
  { name: "Inventory Value", value: "$45,900", icon: FaBoxOpen, color: "text-blue-600" },
  { name: "Total Orders", value: "3,120", icon: FaShoppingCart, color: "text-purple-600" },
  { name: "Pending Orders", value: "45", icon: FaClock, color: "text-red-600" },
];