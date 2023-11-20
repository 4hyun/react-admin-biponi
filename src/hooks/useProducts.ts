import useSWR from "swr";
import { Product } from "__types__/common";

const useProducts = () => {
  const { data: products = [], isLoading, mutate } = useSWR<Product[]>("/api/products");
  return { products, isLoading, mutate };
};

export default useProducts;
