import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../consts";

const clientsQuery = createApi({
    reducerPath: "clients",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
    }),
    endpoints: (builder) => ({
        getClients: builder.query({
            query: (page) => ({
                url: "users?role=client",
                params: {
                    page,
                },
                method: "GET",
            }),
        }),
    }),
})


export const {
    useGetClientsQuery
} = clientsQuery

export default clientsQuery