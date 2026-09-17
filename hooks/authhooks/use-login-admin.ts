"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  useAdminLoginMutation,
} from "@/redux/services/admin/adminAuthApi";

interface AdminLoginFormData {
  email: string;
  password: string;
}

const setCookie = (
  name: string,
  value: string,
  days = 1
) => {
  const date = new Date();

  date.setTime(
    date.getTime() + days * 24 * 60 * 60 * 1000
  );

  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export default function useAdminLogin() {
  const router = useRouter();

  const [adminLogin, { isLoading }] =
    useAdminLoginMutation();

  const onSubmit = async ({
    email,
    password,
  }: AdminLoginFormData) => {
    try {
      const result = await adminLogin({
        email,
        password,
      }).unwrap();

      const { access, refresh } = result;

      if (!access || !refresh) {
        throw new Error("توکن دریافت نشد");
      }

      // Admin storage
      localStorage.setItem(
        "admin_access",
        access
      );

      localStorage.setItem(
        "admin_refresh",
        refresh
      );

      // Admin cookies
      setCookie("admin_access", access);
      setCookie("admin_refresh", refresh);

      toast.success("Admin login successful", {
        progressClassName: "my-custom-progress-bar",
        style: {
          backgroundColor: "#121212",
          color: "white",
          direction: "ltr",
          fontFamily: "monospace",
        },
      });

      router.replace("/admin");
    } catch (err: unknown) {
      let errorMsg = "Login failed";

      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err
      ) {
        const error = err as {
          data?: {
            detail?: string;
            non_field_errors?: string[];
          };
        };

        errorMsg =
          error.data?.detail ??
          error.data?.non_field_errors?.[0] ??
          errorMsg;
      }

      toast.error(errorMsg);
    }
  };

  return {
    onSubmit,
    isLoading,
  };
}