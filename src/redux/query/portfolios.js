import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../consts";
import Cookies from "js-cookie";

const portfolioQuery = createApi({
  reducerPath: "portfolio",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    prepareHeaders: (headers) => {
      headers.set("Authorization" ,"Bearer " + Cookies.get(TOKEN));
      return headers
    },
  }),
  tagTypes: ["portfolios"],
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (params) => ({
        url: "portfolios",
        params: params,
        method: "GET",
      }),
      transformResponse: (res) => res,
      providesTags: ["portfolios"],
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: "GET",
      }),
    }),
    createPortfolio: builder.mutation({
      query: (data) => ({
        url: "portfolios",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["portfolios"],
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, data }) => ({
        url: `portfolios/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["portfolios"],
    }),
    deletePortfolio: builder.mutation({
        query: (id) =>({
            url: `portfolios/${id}`,
            method: "DELETE"
        }),
        invalidatesTags: ["portfolios"],
    })
  }),
});

export const {
    useGetPortfoliosQuery,
    useGetPortfolioMutation,
    useCreatePortfolioMutation,
    useUpdatePortfolioMutation,
    useDeletePortfolioMutation,
  } = portfolioQuery; 

export default portfolioQuery;
