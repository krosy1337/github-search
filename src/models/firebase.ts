import { IRepo } from "./github";

export interface FirebaseState {
    favourites: IRepo[]
    error: string | null
    isLoading: boolean
}