import {createAsyncThunk} from "@reduxjs/toolkit"
import {IRepo} from "../../models/github"
import {child, get, ref} from "firebase/database"
import {database} from "../../firebaseConfig"

export const fetchFav = createAsyncThunk<IRepo[], string>(
    "firebase/fetchFav",
    async (userId, thunkAPI) => {
        try {
            const favArr: IRepo[] = []
            const refDb = ref(database)
            const snapshot = await get(child(refDb, `${userId}`))
            for (const snapshotKey in snapshot.val()) {
                favArr.push(snapshot.val()[snapshotKey])
            }

            return favArr
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    },
)