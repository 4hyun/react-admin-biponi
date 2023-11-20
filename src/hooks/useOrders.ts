import useSWR from "swr";
import { Order } from "__types__/common";

const useOrders = () => {
  const { data: orders = [], isLoading, mutate } = useSWR<Order[]>("/api/orders");
  return { orders, isLoading, refetch: mutate };
};

export default useOrders;
