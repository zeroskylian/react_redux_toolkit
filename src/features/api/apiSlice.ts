import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({baseUrl:'/fakeApi'}),
    endpoints: (builder) => {
        return {
            getPosts: builder.query({
                query: () => {
                    return '/posts'
                }
            })
        }
    }
})