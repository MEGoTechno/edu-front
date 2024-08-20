import { apiSlice } from "../apiSlice";

const lecturesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({


        getLectures: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/content/lectures",
                    params
                }
            }
        }),
        createLecture: builder.mutation({
            query: data => ({
                url: '/content/lectures',
                method: 'POST',
                body: data
            })
        }),
        updateLecture: builder.mutation({
            query: data => {
                return ({
                    url: '/content/lectures/' + data.get("id"),
                    method: 'PUT',
                    body: data
                })
            }
        }),

    })
})
//السلام عليكم و رحمه الله وبركاته:
export const { useLazyGetLecturesQuery, useCreateLectureMutation, useUpdateLectureMutation } = lecturesApi