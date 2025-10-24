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
    //   query: () => `/transactions?page=${page}&limit=${limit}`,

    allTransactions: builder.query({
      query: () => ({
        url: `/transaction/all-transactions`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    // /agent/status
    blockOrActive: builder.mutation({
      query: (payload) => ({
        url: `/agent/status`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    userBlockOrActive: builder.mutation({
      query: (payload) => ({
        url: `/user/status`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllTransactionsQuery,
  useAllWalletsQuery,
  useBlockOrActiveMutation,
  useUserBlockOrActiveMutation,
} = adminApi;
