import productJacket from "@/assets/product-jacket.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productTee from "@/assets/product-tee.jpg";
import productLeather from "@/assets/product-leather.jpg";
import productCargo from "@/assets/product-cargo.jpg";
import productWindbreaker from "@/assets/product-windbreaker.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  size: string;
  condition: "Excellent" | "Good" | "Fair";
  limited: boolean;
  description: string;
  fit: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Distressed Denim Jacket",
    brand: "Vintage Levi's",
    price: 8500,
    originalPrice: 15000,
    images: [productJacket],
    category: "Jackets",
    size: "L",
    condition: "Excellent",
    limited: true,
    description: "Rare vintage Levi's denim jacket with authentic distressing. Oversized fit with a worn-in patina that can't be replicated. A true collector's piece.",
    fit: "Oversized",
  },
  {
    id: "2",
    name: "Classic Trefoil Hoodie",
    brand: "Adidas Originals",
    price: 4500,
    originalPrice: 9000,
    images: [productHoodie],
    category: "Hoodies",
    size: "XL",
    condition: "Good",
    limited: false,
    description: "Iconic Adidas Originals hoodie with the classic trefoil logo. Heavyweight cotton fleece, perfect for layering.",
    fit: "Oversized",
  },
  {
    id: "3",
    name: "Graphic Print Tee",
    brand: "Vintage",
    price: 3200,
    images: [productTee],
    category: "Vintage Streetwear",
    size: "M",
    condition: "Good",
    limited: true,
    description: "Vintage graphic tee with unique sunset mountain print. Single-stitch construction dates this to the late 90s.",
    fit: "Regular",
  },
  {
    id: "4",
    name: "Leather Bomber Jacket",
    brand: "Unknown Designer",
    price: 12000,
    originalPrice: 25000,
    images: [productLeather],
    category: "Jackets",
    size: "M",
    condition: "Excellent",
    limited: true,
    description: "Premium leather bomber with beautiful aged patina. Buttery soft leather with ribbed collar and cuffs. One-of-a-kind piece.",
    fit: "Regular",
  },
  {
    id: "5",
    name: "Military Cargo Pants",
    brand: "Vintage Military",
    price: 5500,
    originalPrice: 8000,
    images: [productCargo],
    category: "Oversized Fits",
    size: "32",
    condition: "Good",
    limited: false,
    description: "Authentic military cargo pants in olive green. Multiple utility pockets with heavy-duty construction. Relaxed tapered fit.",
    fit: "Relaxed Taper",
  },
  {
    id: "6",
    name: "Colorblock Windbreaker",
    brand: "Nike Vintage",
    price: 7000,
    originalPrice: 12000,
    images: [productWindbreaker],
    category: "Jackets",
    size: "L",
    condition: "Excellent",
    limited: true,
    description: "90s Nike colorblock windbreaker in purple, navy, and gold. Full zip with packable hood. Deadstock condition.",
    fit: "Regular",
  },
];

export const categories = [
  "All",
  "Jackets",
  "Hoodies",
  "Vintage Streetwear",
  "Oversized Fits",
  "Caps",
  "Pants",
  "Shirts",
  "Shorts",
  "Belts",
  "Jerseys",
  "Polo T-Shirts",
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

export const conditions = ["Excellent", "Good", "Fair"];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString()}`;
}
