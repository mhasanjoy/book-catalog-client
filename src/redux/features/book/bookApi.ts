import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
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
  useGetBooksQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  useUpdateBookInformationMutation,
  useDeleteBookMutation,
} = bookApi;
