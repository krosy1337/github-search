import {configureStore} from "@reduxjs/toolkit"
import {githubApi} from "./github/github.api"
import {setupListeners} from "@reduxjs/toolkit/query"
import appReducer from "./app/appSlice"

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)