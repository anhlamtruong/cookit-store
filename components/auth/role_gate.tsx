"use client";

import { useCurrentRole } from "@/hooks/authenticate/use_current_role";
import { FormError } from "@/components/form_error";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
}

export const RoleGate = ({
  children,
  allowedRole = [UserRole.USER],
}: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  if (!allowedRole.includes(role)) {
    return (
      <>
        <FormError message="You do not have permission to view this content!" />
        <Button onClick={() => router.back()}>GO BACK</Button>
      </>
    );
  }

  return <>{children}</>;
};
