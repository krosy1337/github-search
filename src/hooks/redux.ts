import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../store"
import {appSlice} from "../store/app/appSlice"
import {bindActionCreators} from "@reduxjs/toolkit"
import {fetchFav} from "../store/firebase/firebaseActionCreators"
import {firebaseSlice} from "../store/firebase/firebaseSlice"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const actionCreators = {
   ...appSlice.actions,
    fetchFav,
    ...firebaseSlice.actions,
}

export const useActions = () => {
    const dispatch: AppDispatch = useDispatch()

    return bindActionCreators(actionCreators, dispatch)
}