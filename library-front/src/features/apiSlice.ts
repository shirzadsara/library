import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Book {
  id?: number;
  title: string;
  author: string;
  photo: string;
  year: number;
  price: number;
  stock: number;
}
interface UserBook {
  id?: number | undefined;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}
interface loginUser {
  email: string;
  password: string;
}

interface Order {
  id: number;
  book?: {
    id: number;
    title: string;
    price: number;
  };
  quantity: number;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: string;
  updatedAt: string;
}


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
  }),
  tagTypes: ['Book', 'User', 'Admin','Orders'],
  endpoints: (builder) => ({

   testToken: builder.query<any, void>({
      query: () => ({
        url: '/auth/test-token',
      }),
}),


    // ثبت‌نام کاربر عادی
    registerUser: builder.mutation<UserBook, Partial<UserBook>>({
      query: (userData) => ({
        url: 'register/user',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // ایجاد ادمین (فقط ادمین‌ها)
    registerAdmin: builder.mutation({
      query: ({ token, adminData }) => ({
        url: 'register/admin',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: adminData,
      }),
      invalidatesTags: ['Admin'],
    }),

    loginUser: builder.mutation<{ message: string, role: string }, Partial<loginUser>>({
      query: (loginData) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginData,
      }),
      //invalidatesTags: ['User'],
    }),

    getBooks: builder.query<Book[], void>({
      query: () => 'books',
      providesTags: ['Book'],
    }),

   getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['Book'],
    }),

  getBookById2: builder.query({
      query: (id) => `/books/admin/${id}`,
      providesTags: ['Book'],
    }),

   updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),

        deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),

    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),

    getUsers: builder.query<UserBook[], void>({
      query: () => '/register',
      providesTags: ['User'],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getProfile: builder.query<UserBook, void>({
  query: () => '/register/me',
  providesTags: ['User'],
}),

//سبد خرید
getUserOrders: builder.query<Order[], void>({
  query: () => '/orders/user',
  providesTags: ['Orders'],
}),

addOrder: builder.mutation({
  query: ({ bookId, quantity, userId }) => ({
    url: '/orders',
    method: 'POST',
    body:{ bookId, quantity, userId },
  }),
  invalidatesTags: ['Orders'],
}),

updateOrder: builder.mutation({
  query: ({ id, ...data }) => ({
    url: `/orders/${id}`,
    method: 'PATCH',
    body: data, // مثلاً { quantity: 2 }
  }),
  invalidatesTags: ['Orders'],
}),

deleteOrder: builder.mutation({
  query: (id) => ({
    url: `/orders/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Orders'],
}),


  }),
});


export const { useRegisterUserMutation,useLoginUserMutation,useUpdateBookMutation,useGetBookById2Query,
  useDeleteBookMutation,useGetBookByIdQuery,useRegisterAdminMutation,useGetBooksQuery,useGetUsersQuery,useAddBookMutation,useLogoutMutation,useGetProfileQuery,useGetUserOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation, useTestTokenQuery } = apiSlice;
