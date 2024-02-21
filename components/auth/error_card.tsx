import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back_button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className=" w-full flex justify-center items-center">
        <ExclamationTriangleIcon className=" text-destructive w-20" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
