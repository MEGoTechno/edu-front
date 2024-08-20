import { apiSlice } from "../apiSlice";

const usersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: (queries) => {
                const params = queries
                // const { page, limit, grade, group, userName, name, email, phone, familyPhone, isActive, role } = queries
                // let params = {}

                // if (filter) params = { ...filter }
                // if (sort) params = { ...sort }

                // page ? params.page = page : params.page = 1
                // limit ? params.limit = limit : params.limit = 5
                return {
                    url: "/users",
                    params
                }
            },
        }),
        getOneUser: builder.query({
            query: (userName) => `/users/${userName}`
        }),
        createUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: 'PATCH',
                body: data
            })
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: 'PUT',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: 'DELETE',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
        }),
        signup: builder.mutation({
            query: data => ({
                url: '/auth/signup',
                method: 'POST',
                body: data
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useLazyGetUsersQuery,
    useLazyGetOneUserQuery,

    useCreateUserMutation,
    useUpdateUserMutation,
    useUpdateUserProfileMutation,

    useDeleteUserMutation,

    // for auth
    useLoginMutation,
    useSignupMutation
} = usersApi