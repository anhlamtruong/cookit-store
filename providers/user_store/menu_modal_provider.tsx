"use client";

import PreviewModal from "@/app/(protected)/(store_user)/_components/preview_modal";
import { useEffect, useState } from "react";

const MenuModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
    </>
  );
};

export default MenuModalProvider;
