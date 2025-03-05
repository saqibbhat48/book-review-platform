import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooks, fetchBookById, fetchReviews } from '../services/api';
import toast from 'react-hot-toast';

export const getBooks = createAsyncThunk('books/getBooks', async (page) => {
  try {
    const response = await fetchBooks(page);
  return response.data;
  } catch (error) {
    toast.error(error.message)
  }
});

export const getBook = createAsyncThunk('books/getBook', async (id) => {
  try {
    const response = await fetchBookById(id);
  return response.data;
  } catch (error) {
    toast.error(error.message)
  }
});

export const getReviews = createAsyncThunk('books/getReviews', async (bookId) => {
  try {
    const response = await fetchReviews(bookId);
  return response.data;
  } catch (error) {
    toast.error(error.message)
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    currentBook: null,
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.currentBook = action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

export default booksSlice.reducer;