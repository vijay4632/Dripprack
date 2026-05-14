import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/data/products";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api/products";

export function useProductStore() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });

  const generateIdMutation = useMutation({
    mutationFn: async (product: Omit<Product, "id">) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add product");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Product> }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const addProduct = (product: Omit<Product, "id">) => {
    generateIdMutation.mutate(product);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    updateProductMutation.mutate({ id, updates });
  };

  const deleteProduct = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  const getProduct = (id: string) => products.find((p) => p.id === id) || null;

  return {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };
}
