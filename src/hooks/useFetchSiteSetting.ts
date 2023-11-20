import useSWR from "swr";

const useFetchSiteSetting = (url: string) => {
  const { data, isLoading, mutate } = useSWR(url);

  return {
    refetch: mutate,
    data: data?.values,
    loading: isLoading,
  };
};

export default useFetchSiteSetting;
