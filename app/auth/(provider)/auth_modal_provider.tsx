"use client";

import { useEffect, useState } from "react";
import AuthModal from "../_component/preview_modal";

const AuthModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal></AuthModal>
    </>
  );
};

export default AuthModalProvider;
