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
  image: string;
  category: string;
  size: string;
  condition: "Excellent" | "Good" | "Fair";
  limited: boolean;
  description: string;
  fabric: string;
  fit: string;
  modelInfo: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Distressed Denim Jacket",
    brand: "Vintage Levi's",
    price: 8500,
    originalPrice: 15000,
    image: productJacket,
    category: "Jackets",
    size: "L",
    condition: "Excellent",
    limited: true,
    description: "Rare vintage Levi's denim jacket with authentic distressing. Oversized fit with a worn-in patina that can't be replicated. A true collector's piece.",
    fabric: "100% Cotton Denim",
    fit: "Oversized",
    modelInfo: "Model is 6'1\" wearing size L",
  },
  {
    id: "2",
    name: "Classic Trefoil Hoodie",
    brand: "Adidas Originals",
    price: 4500,
    originalPrice: 9000,
    image: productHoodie,
    category: "Hoodies",
    size: "XL",
    condition: "Good",
    limited: false,
    description: "Iconic Adidas Originals hoodie with the classic trefoil logo. Heavyweight cotton fleece, perfect for layering.",
    fabric: "80% Cotton, 20% Polyester",
    fit: "Oversized",
    modelInfo: "Model is 5'11\" wearing size XL",
  },
  {
    id: "3",
    name: "Graphic Print Tee",
    brand: "Vintage",
    price: 3200,
    image: productTee,
    category: "Vintage Streetwear",
    size: "M",
    condition: "Good",
    limited: true,
    description: "Vintage graphic tee with unique sunset mountain print. Single-stitch construction dates this to the late 90s.",
    fabric: "100% Cotton",
    fit: "Regular",
    modelInfo: "Model is 5'10\" wearing size M",
  },
  {
    id: "4",
    name: "Leather Bomber Jacket",
    brand: "Unknown Designer",
    price: 12000,
    originalPrice: 25000,
    image: productLeather,
    category: "Jackets",
    size: "M",
    condition: "Excellent",
    limited: true,
    description: "Premium leather bomber with beautiful aged patina. Buttery soft leather with ribbed collar and cuffs. One-of-a-kind piece.",
    fabric: "Genuine Leather",
    fit: "Regular",
    modelInfo: "Model is 6'0\" wearing size M",
  },
  {
    id: "5",
    name: "Military Cargo Pants",
    brand: "Vintage Military",
    price: 5500,
    originalPrice: 8000,
    image: productCargo,
    category: "Oversized Fits",
    size: "32",
    condition: "Good",
    limited: false,
    description: "Authentic military cargo pants in olive green. Multiple utility pockets with heavy-duty construction. Relaxed tapered fit.",
    fabric: "Cotton Ripstop",
    fit: "Relaxed Taper",
    modelInfo: "Model is 6'1\" wearing size 32",
  },
  {
    id: "6",
    name: "Colorblock Windbreaker",
    brand: "Nike Vintage",
    price: 7000,
    originalPrice: 12000,
    image: productWindbreaker,
    category: "Jackets",
    size: "L",
    condition: "Excellent",
    limited: true,
    description: "90s Nike colorblock windbreaker in purple, navy, and gold. Full zip with packable hood. Deadstock condition.",
    fabric: "100% Nylon",
    fit: "Regular",
    modelInfo: "Model is 5'11\" wearing size L",
  },
];

export const categories = [
  "All",
  "Jackets",
  "Hoodies",
  "Vintage Streetwear",
  "Oversized Fits",
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

export const conditions = ["Excellent", "Good", "Fair"];

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}
