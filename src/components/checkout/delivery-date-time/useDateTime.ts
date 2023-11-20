import { useEffect, useState } from "react";
import format from "date-fns/format";
import useSWR from "swr";

// ==============================================================
type Time = { time: string; _id: string };
type DateProps = { label: string; value: string };
// ==============================================================

const useDateTime = () => {
  const [dateList, setDateList] = useState<DateProps[]>([
    { label: format(new Date(), "dd MMMM"), value: new Date().toISOString() },
  ]);

  const { data = [], mutate } = useSWR<Time[]>("/api/delivery-time");

  useEffect(() => {
    let today = new Date();
    let list: DateProps[] = [];
    let dateCount = today.getDate();

    for (let i = 1; i < 10; i++) {
      today.setDate(dateCount + i);
      list.push({ label: format(today, "dd MMMM"), value: today.toISOString() });
    }

    setDateList((state) => [...state, ...list]);
  }, []);

  return {
    dateList,
    timeList: data,
    fetchDeliverTime: mutate,
  };
};

export default useDateTime;
