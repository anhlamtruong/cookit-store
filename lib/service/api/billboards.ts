import { Billboard } from "@/lib/types/store_types";
import axios from "axios";

export const fetchBillboards = async (url: string): Promise<Billboard[]> => {
  const { data } = await axios.get<Billboard[]>(url);
  return data;
};

export const createBillboard = async ({
  newBillboard,
}: {
  newBillboard: Billboard;
}): Promise<Billboard> => {
  return newBillboard;
};
