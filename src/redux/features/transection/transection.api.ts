import { baseApi } from "@/redux/baseApi";

export const transectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (userInfo) => ({
    //     url: "/user/register",
    //     method: "POST",
    //     data: userInfo,
    //   }),
    // }),

    userTransectionInfo: builder.query({
      query: (slug) => ({
        url: `/transaction/${slug}`,
        method: "GET",
      }),
      //   providesTags: ["USER"],
    }),
  }),
});

export const { useUserTransectionInfoQuery } = transectionApi;
