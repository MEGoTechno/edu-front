import { apiSlice } from "../apiSlice";

const tokensApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTokens: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/tokens",
                    params
                }
            }
        }),
        getOneCode: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/codes" + params.id,
                    params
                }
            }
        }),
        createCode: builder.mutation({
            query: data => ({
                url: '/codes',
                method: 'POST',
                body: data
            })
        }),
        updateCode: builder.mutation({
            query: (data) => {

                return {
                    url: '/codes/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteCode: builder.mutation({
            query: (data) => {
                return {
                    url: '/codes/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const { useLazyGetTokensQuery, useLazyGetOneCodeQuery,
    useCreateCodeMutation, useUpdateCodeMutation, useDeleteCodeMutation
} = tokensApi