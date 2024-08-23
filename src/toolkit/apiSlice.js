import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// git push -u origin main   


export const apiSlice = createApi({
    reducerPath: "api", //from state
    baseQuery: fetchBaseQuery({
        baseUrl:"https://edu-server-two.vercel.app"  + '/api',
    }),


    endpoints: builder => ({ // client fcs #########
        makeReq: builder.query({
            query: (params) => {
                console.log('working api ...')
                return {
                    url: `/data`,
                    params
                }
            }
        }),
        sendData: builder.mutation({
            // note: an optional `queryFn` may be used in place of `query`
            query: (body) => ({
                url: `/data`,
                method: 'post',
                body: body,
            }),
        })
    })
})

export const {
    useLazyMakeReqQuery, useSendDataMutation
} = apiSlice
