import { apiSlice } from './apiSlice';


export const viewApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getviews: builder.query({
        query: (view) => `/view/?query=${view}`,
      }),

    postviews: builder.mutation({
        query: (query) => ({
          url: `api/view/?query=${query}`,
          method: 'POST',
        }),
      
      }),
  }),
});

export const { useGetviewsQuery , usePostviewsMutation} = viewApiSlice;