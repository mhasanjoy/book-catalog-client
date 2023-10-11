import { IBook } from "@/types/book";
import { createSlice } from "@reduxjs/toolkit";

interface BookState {
  books: IBook[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});

export default bookSlice.reducer;
