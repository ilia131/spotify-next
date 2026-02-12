import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';
import { logout, setAuth } from '@/redux/features/authSlice';
import { Mutex } from 'async-mutex';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface RefreshResponse {
  access: string;
  refresh?: string;   
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://spotify-django-1.onrender.com/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;

        if (!refreshToken) {
          api.dispatch(logout());
          return result;
        }

        const refreshResult = await baseQuery(
          {
            url: '/jwt/refresh/',
            method: 'POST',
            body: { refresh: refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { access, refresh } = refreshResult.data as RefreshResponse;

          const newRefresh = refresh ?? refreshToken;

          localStorage.setItem('access', access);          
          api.dispatch(setAuth({ access, refresh: newRefresh }));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});