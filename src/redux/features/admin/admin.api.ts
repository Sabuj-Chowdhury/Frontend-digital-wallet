import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: `/user/users`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    allWallets: builder.query({
      query: () => ({
        url: `/wallet`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    allTransactions: builder.query({
      query: () => ({
        url: `/transaction/all-transactions`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useAllUsersQuery, useAllTransactionsQuery, useAllWalletsQuery } =
  adminApi;
