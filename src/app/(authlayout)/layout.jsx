"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useAuthStore } from "../../store/store";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  // console.log(user)

  if (user) {
    router.push("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
