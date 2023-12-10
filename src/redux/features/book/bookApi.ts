import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (arg) => {
        return { url: "/books", params: { ...arg } };
      },
      providesTags: ["books"],
    }),
    getTenRecentlyAddedBooks: builder.query({
      query: () => "/recently-added-books",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),
    addNewBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    updateBookInformation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReview: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useLazyGetBooksQuery,
  useGetTenRecentlyAddedBooksQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  useUpdateBookInformationMutation,
  useDeleteBookMutation,
  useAddReviewMutation,
  useGetReviewQuery,
} = bookApi;
