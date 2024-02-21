import { PrismaClient as PrismaClientAuthenticate } from "@/generated/authenticate/@prisma-client-authenticate";

declare global {
  var prismaAuthenticate: PrismaClientAuthenticate | undefined;
}

const prismaAuthenticate =
  global.prismaAuthenticate ||
  new PrismaClientAuthenticate({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production")
  global.prismaAuthenticate = prismaAuthenticate;

export default prismaAuthenticate;
