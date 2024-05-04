"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/store";
import Loader from "../../components/common/Loader";
import { getFromLocalStorage } from "../../utils/local-storage";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const userLoggedIn = useAuthStore((state) => state.userLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localAuth = getFromLocalStorage("auth");
    // console.log(localAuth);

    if (!user) {
      if (localAuth != null) {
        userLoggedIn(localAuth);
        setLoading(false);
      } else {
        router.replace("/login");
        setLoading(false);
      }
    }
    setLoading(false);
  }, [user, router, userLoggedIn]);

  if (loading)
    return <Loader className="h-[50vh] flex items-end justify-center" size="large" />;

  return <>{children}</>;
};

export default MainLayout;
