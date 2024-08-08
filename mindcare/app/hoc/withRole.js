"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withRole = (WrappedComponent, requiredRole) => {
  return (props) => {
    // const { user, logout } = useAuth();
    // const router = useRouter();

    // useEffect(() => {
    //   const token = Cookies.get("token");
    //   console.log(token)
    //   if (!token) {
    //     router.replace("/login");
    //   } else if (user?.role !== requiredRole) {
    //     router.replace("/unauthorized");
    //   }
    // }, [user, requiredRole, router]);

    // if (!user || user.role !== requiredRole) {
    //   return null;
    // }

    return <WrappedComponent   />;
  };
};

export default withRole;
