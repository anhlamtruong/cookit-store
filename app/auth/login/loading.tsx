import { CardWrapper } from "@/components/auth/card-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <CardWrapper
      headerLabel="Loading..."
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </CardWrapper>
  );
};

export default LoadingPage;
