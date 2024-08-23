import { apiSlice } from "../apiSlice";

const userCoursesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getUserCourses: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/user_courses/",
                    params
                }
            }
        }),
        getAllUsersCourses: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/user_courses/users",
                    params
                }
            }
        }),
        subscribe: builder.mutation({
            query: data => ({
                url: '/user_courses/subscribe',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useGetUserCoursesQuery, useGetAllUsersCoursesQuery, useSubscribeMutation
} = userCoursesApi