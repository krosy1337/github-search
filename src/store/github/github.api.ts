import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {IRepo, IUser, IUsersResponse} from "../../models/github"

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
        }),
        fetchUserRepos: build.query<IRepo[], string>({
            query: (user: string) => ({
                url: `users/${user}/repos`,
            }),
        }),
    }),
})

export const {useSearchUsersQuery, useLazyFetchUserReposQuery} = githubApi