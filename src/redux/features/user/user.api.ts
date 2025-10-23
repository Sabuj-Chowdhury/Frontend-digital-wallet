import { baseApi } from "@/redux/baseApi";
import type { DepositResponse } from "@/types";

export interface AddMoneyPayload {
  amount: number;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation<DepositResponse, AddMoneyPayload>({
      query: (payload) => ({
        url: "/user/add-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    userTransectionInfo: builder.query({
      query: (slug) => ({
        url: `/transaction/${slug}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    walletInfo: builder.query({
      query: (slug) => ({
        url: `/wallet/${slug}`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useUserTransectionInfoQuery,
  useWalletInfoQuery,
} = userApi;
