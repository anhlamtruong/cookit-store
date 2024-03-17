"use client";

import { LoginForm } from "@/components/auth/login_form";
import { useAuthModal } from "../(hooks)/useAuthModal";

import { Modal } from "./modal";
import { RegisterForm } from "@/components/auth/register_form";

const AuthModal = () => {
  const authModal = useAuthModal();

  return (
    <Modal open={authModal.isOpen} onClose={authModal.onClose}>
      <LoginForm></LoginForm>
    </Modal>
  );
};

export default AuthModal;
