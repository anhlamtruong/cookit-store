import { useQuery } from "@tanstack/react-query";
import { fetchChef } from "@/lib/service/api/chef";
export const useChef = () => {
  return useQuery({
    queryKey: ["chef"],
    queryFn: () => fetchChef(),
  });
};
