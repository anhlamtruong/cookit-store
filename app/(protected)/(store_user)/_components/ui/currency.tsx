"use client";

import { Decimal } from "@/generated/authenticate/@prisma-client-authenticate/runtime/library";
import { formatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number | Decimal;
  unit?: string | number | Decimal;
}

const Currency: React.FC<CurrencyProps> = ({ value = 0, unit = 1 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <p className="font-semibold">
      {formatter.format(Number(value) * Number(unit))}
    </p>
  );
};

export default Currency;
