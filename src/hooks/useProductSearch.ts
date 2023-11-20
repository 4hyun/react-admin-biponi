import { useState } from "react";
import { debounce } from "@mui/material";
import axios from "axios";
import { Product } from "__types__/common";

const useProductSearch = () => {
  const [resultList, setResultList] = useState<Product[]>([]);
  const [notFoundResult, setNotFoundResult] = useState(false);

  const search = debounce(async (e) => {
    const value = e?.target?.value || null;

    if (value) {
      const { data } = await axios.post("/api/products", { search: value });

      if (data?.length > 0) {
        setResultList(data);
        setNotFoundResult(false);
      } else {
        setResultList([]);
        setNotFoundResult(true);
      }
    } else {
      setResultList([]);
      setNotFoundResult(false);
    }
  }, 200);

  return { resultList, notFoundResult, search };
};

export default useProductSearch;
