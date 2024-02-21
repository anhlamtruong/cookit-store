import { create } from "zustand";
import { Store } from "@/lib/types/store_types";
import { User } from "@/generated/authenticate/@prisma-client-authenticate";
interface useStoreModalUser {
  userData: null | User;
  setStoreData: (data: User) => void;
}

const useUser = create<useStoreModalUser>((set) => ({
  userData: null,
  setStoreData: (data) => set({ userData: data }),
}));

export default useUser;

export const useUserData = () => {
  const userData = useUser((state) => state.userData);
  const setUserData = useUser((state) => state.setStoreData);

  // Any additional logic or effects

  return { userData, setUserData };
};
