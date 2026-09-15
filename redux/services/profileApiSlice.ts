import { apiSlice } from "./apiSlice";

import type { UserProfile } from "./types";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<
  { message: string },
  {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }
>({
  query: (body) => ({
    url: "/permissions/change-password/",
    method: "POST",
    body,
  }),
}),

    // =========================
    // GET PROFILE
    // =========================

    getMyProfile: builder.query<UserProfile, void>({
      query: () => "/permissions/profile/",
      providesTags: ["UserProfile"],
    }),

    // =========================
    // UPDATE PROFILE
    // =========================

    updateMyProfile: builder.mutation<
      UserProfile,
      {
        username?: string;
        first_name?: string;
        last_name?: string;
        profile_pic?: File | null;
        favorite_genres?: number[];
        favorite_artists?: string[];
      }
    >({
      query: ({
        username,
        first_name,
        last_name,
        profile_pic,
        favorite_genres,
        favorite_artists,
      }) => {

        const formData = new FormData();

        if (username !== undefined) {
          formData.append(
            "username",
            username
          );
        }

        if (first_name !== undefined) {
          formData.append(
            "first_name",
            first_name
          );
        }

        if (last_name !== undefined) {
          formData.append(
            "last_name",
            last_name
          );
        }

        if (profile_pic) {
          formData.append(
            "profile_pic",
            profile_pic
          );
        }

        if (favorite_genres !== undefined) {
          favorite_genres.forEach((id) => {
            formData.append(
              "favorite_genres",
              String(id)
            );
          });
        }

        if (favorite_artists !== undefined) {
          favorite_artists.forEach((id) => {
            formData.append(
              "favorite_artists",
              String(id)
            );
          });
        }

        return {
          url: "/permissions/profile/",
          method: "PATCH",
          body: formData,
        };
      },

      invalidatesTags: [
        "UserProfile",
      ],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useLazyGetMyProfileQuery,
  useUpdateMyProfileMutation,
    useChangePasswordMutation,

} = profileApiSlice;
