// redux/services/adminAuthApi.ts

import { apiSlice } from "../apiSlice";

interface AdminLoginRequest {
  email: string;
  password: string;
}

interface AdminLoginResponse {
  access: string;
  refresh: string;
}

interface AdminUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
}

export const adminAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // adminLogin: builder.mutation<
    //   AdminLoginResponse,
    //   AdminLoginRequest
    // >({
    //   query: (body) => ({
    //     url: "/jwt/create/",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    adminLogin: builder.mutation<
  AdminLoginResponse,
  AdminLoginRequest
>({
  query: (body) => ({
    url: "/permissions/admin/login/",
    method: "POST",
    body,
  }),
}),

    getAdminMe: builder.query<AdminUser, void>({
      query: () => ({
        url: "/users/me/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetAdminMeQuery,
} = adminAuthApi;