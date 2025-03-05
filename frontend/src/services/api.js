import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchBooks = (page = 1, limit = 10) => {
  try {
    return api.get(`/books?page=${page}&limit=${limit}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookById = (id) => {
  try {
    return api.get(`/books/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const submitReview = (data) => {
  try {
    return api.post('/reviews', data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviews = (bookId) => {
  try {
    return api.get(`/reviews?bookId=${bookId}`);
  } catch (error) {
    console.log(error);
  }
};

export const signup = (data) => {
  try {
    return api.post('/auth/signup', data);
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => {
  try {
    return api.post('/auth/login', data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = (id) => {
  try {
    return api.get(`/users/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, data) => {
  try {
    return api.put(`/users/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const addBook = (data) => {
  try {
    return api.post('/books', data);
  } catch (error) {
    console.log(error);
  }
};