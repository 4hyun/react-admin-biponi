import { useState } from "react";
import useSWR from "swr";
import { Product } from "__types__/common";

const useCategoryBasedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { isLoading, data = [] } = useSWR<Product[]>(
    selectedCategory ? `/api/products/categories/${selectedCategory}` : null
  );

  const handleChangeCategory = (category: string) => setSelectedCategory(category);

  return {
    selectedCategory,
    handleChangeCategory,
    loading: isLoading,
    categoryBasedProducts: data,
  };
};

export default useCategoryBasedProducts;
