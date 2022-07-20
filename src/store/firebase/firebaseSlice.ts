import {FirebaseState} from "../../models/firebase"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {fetchFav} from "../firebase/firebaseActionCreators"
import {IRepo} from "../../models/github"

const initialState: FirebaseState = {
    favourites: [],
    error: null,
    isLoading: false,
}

export const firebaseSlice = createSlice({
    name: "firebase",
    initialState,
    reducers: {
        addRepoToFav: (state, action: PayloadAction<IRepo>) => {
            state.favourites.push(action.payload)
        },
        removeRepoFromFav: (state, action: PayloadAction<number>) => {
            state.favourites = state.favourites.filter((f) => f.id !== action.payload)
        },
    },
    extraReducers: {
        [fetchFav.pending.type]: (state) => {
            state.isLoading = true
            state.error = null
        },
        [fetchFav.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchFav.fulfilled.type]: (state, action: PayloadAction<IRepo[]>) => {
            state.isLoading = false
            state.error = null
            state.favourites = action.payload
        },
    },
})

export default firebaseSlice.reducer