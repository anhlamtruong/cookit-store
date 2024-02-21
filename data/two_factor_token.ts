import prismaAuthenticate from "@/lib/service/authenticate_db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prismaAuthenticate.twoFactorToken.findFirst({
      where: { email: email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prismaAuthenticate.twoFactorToken.findUnique({
      where: { token: token },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
