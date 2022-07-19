import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AppState} from "../../models/app"

const initialState: AppState = {
    isAuth: false
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
})

export default appSlice.reducer