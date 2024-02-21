import prismaAuthenticate from "@/lib/service/authenticate_db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken =
      await prismaAuthenticate.verificationToken.findFirst({
        where: { email: email },
      });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken =
      await prismaAuthenticate.verificationToken.findUnique({
        where: { token: token },
      });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
