import prismaAuthenticate from "@/lib/service/authenticate_db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken =
      await prismaAuthenticate.passwordResetToken.findFirst({
        where: { email: email },
      });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken =
      await prismaAuthenticate.passwordResetToken.findUnique({
        where: { token: token },
      });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
