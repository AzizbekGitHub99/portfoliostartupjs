import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../consts";
import Cookies from "js-cookie";

const educationQuery = createApi({
  reducerPath: "education",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer " + Cookies.get(TOKEN));
      return headers;
    },
  }),
  tagTypes: ["educations"],
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: (params) => ({
        url: "education",
        params,
        method: "GET",
      }),
      transformResponse: (data) => data,
      providesTags: ["educations"],
    }),
    getEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "GET",
      }),
    }),
    createEducation: builder.mutation({
      query: (data) => ({
        url: "education",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["educations"]
    }),
    updateEducation: builder.mutation({
      query: ({ id, data }) => ({
        url: `education/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["educations"]
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["educations"]
    }),
  }),
});

export const {
    useGetEducationsQuery,
    useGetEducationMutation,
    useCreateEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
} = educationQuery;

export default educationQuery;
