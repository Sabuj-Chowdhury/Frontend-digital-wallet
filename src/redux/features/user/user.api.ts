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
    sendMoney: builder.mutation({
      query: (payload) => ({
        url: "/user/send-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    withdrawMoney: builder.mutation({
      query: (payload) => ({
        url: "/user/withdraw-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    agentSendMoney: builder.mutation({
      query: (payload) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    agentCashOut: builder.mutation({
      query: (payload) => ({
        url: "/agent/cash-out",
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
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
  useAgentSendMoneyMutation,
  useAgentCashOutMutation,
} = userApi;
