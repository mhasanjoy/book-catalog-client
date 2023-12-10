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
    getWishlist: builder.query({
      query: (email) => `/users/${email}/wishlist`,
      providesTags: ["wishlist"],
    }),
    removeBookFromWishlist: builder.mutation({
      query: ({ email, bookId }) => ({
        url: `/users/${email}/wishlist/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddWishlistMutation,
  useGetBookStatusQuery,
  useGetWishlistQuery,
  useRemoveBookFromWishlistMutation,
} = userApi;
