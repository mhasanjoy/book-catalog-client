import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ search }) => {
        return { url: "/books", params: { search } };
      },
    }),
    getTenRecentlyAddedBooks: builder.query({
      query: () => "/recently-added-books",
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addNewBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
    updateBookInformation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
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
} = bookApi;
