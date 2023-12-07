import { api } from "@/redux/api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishlist: builder.mutation({
      query: ({ email, data }) => ({
        url: `/users/${email}/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getBookStatus: builder.query({
      query: ({ email, bookId }) => `/users/${email}/status/${bookId}`,
      providesTags: ["wishlist"],
    }),
  }),
});

export const { useAddWishlistMutation, useGetBookStatusQuery } = userApi;
