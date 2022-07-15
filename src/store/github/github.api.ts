import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {IUser, IUsersResponse} from "../../models/github"

export const githubApi = createApi({
    reducerPath: "github/api",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.github.com/"}),
    endpoints: (build) => ({
        searchUsers: build.query<IUser[], string>({
            query: (username: string) => ({
                url: `search/users`,
                params: {
                    q: username,
                },
            }),
            transformResponse: (responseData: IUsersResponse) => {
                return responseData.items
            },
        })
    }),
})

export const {useSearchUsersQuery} = githubApi