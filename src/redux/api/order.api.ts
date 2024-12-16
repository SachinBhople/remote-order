import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IOrder } from "../../models/order.interface"

export const orderApi = createApi({
    reducerPath: "orderApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/admin/orders" }),
    baseQuery: fetchBaseQuery({ baseUrl: "https://combine-backend.vercel.app/api/admin/orders" }),
    tagTypes: ["order"],
    endpoints: (builder) => {
        return {
            getOrderByUserId: builder.query<{ message: string, result: IOrder[] }, void>({
                query: () => {
                    return {
                        url: "/getOrdersByUserId",
                        method: "GET"
                    }
                },
                providesTags: ["order"],
                transformResponse: (data: { message: string, result: IOrder[] }) => {
                    return data
                }
            }),
            cancelOrder: builder.mutation<void, string>({
                query: id => {
                    return {
                        url: `/cancel-order/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["order"]
            }),
            returnOrder: builder.mutation<void, string>({
                query: id => {
                    return {
                        url: `/return-order/${id}`,
                        method: "PUT",
                    }
                },
                invalidatesTags: ["order"]
            }),

        }
    }
})

export const {
    useGetOrderByUserIdQuery,
    useCancelOrderMutation,
    useReturnOrderMutation
} = orderApi
