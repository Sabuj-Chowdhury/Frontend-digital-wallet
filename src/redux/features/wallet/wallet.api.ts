import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (userInfo) => ({
    //     url: "/user/register",
    //     method: "POST",
    //     data: userInfo,
    //   }),
    // }),

    walletInfo: builder.query({
      query: (slug) => ({
        url: `/wallet/${slug}`,
        method: "GET",
      }),
      //   providesTags: ["USER"],
    }),
  }),
});

export const { useWalletInfoQuery } = walletApi;
