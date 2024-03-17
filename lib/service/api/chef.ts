import { Chef, ProfilePicture } from "@/lib/types/store_types";
import axios from "axios";

export const fetchChef = async (): Promise<
  Chef & { profilePictures: ProfilePicture[] }
> => {
  const { data } = await axios.get<
    Chef & { profilePictures: ProfilePicture[] }
  >("/api/admin/chef");

  return data;
};

export const createNewChef = async ({
  newChef,
}: {
  newChef: Chef & { profilePictures: ProfilePicture[] };
}): Promise<Chef & { profilePictures: ProfilePicture[] }> => {
  return newChef;
};
