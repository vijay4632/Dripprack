import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface WishlistStore {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (product) => {
        set((state) => {
          if (!state.items.find(item => item.id === product.id)) {
            return { items: [...state.items, product] };
          }
          return state;
        });
        toast.success(`${product.name} added to wishlist`);
      },
      removeFromWishlist: (productId) => {
        set((state) => {
          const item = state.items.find(item => item.id === productId);
          if (item) {
            toast.success(`${item.name} removed from wishlist`);
          }
          return {
            items: state.items.filter(item => item.id !== productId)
          };
        });
      },
      toggleWishlist: (product) => {
        const state = get();
        if (state.isInWishlist(product.id)) {
          state.removeFromWishlist(product.id);
          toast.success(`${product.name} removed from wishlist`);
        } else {
          state.addToWishlist(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      getWishlistCount: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
