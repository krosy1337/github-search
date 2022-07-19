import {Navigate, RouteObject} from "react-router-dom"
import HomePage from "./pages/HomePage"
import FavouritesPage from "./pages/FavouritesPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import React from "react"

export enum RoutesNames {
    ROOT = "/",
    FAVOURITES = "/FAVOURITES",
    LOGIN = "/LOGIN",
    REGISTER = "/REGISTER",
}

export const rootRoutes: RouteObject[] = [
    {
        path: RoutesNames.ROOT,
        element: <HomePage/>,
    },
    {
        path: "*",
        element: <Navigate to={RoutesNames.ROOT}/>,
    }
]

export const authRoutes: RouteObject[] = [
    {
        path: RoutesNames.FAVOURITES,
        element: <FavouritesPage/>,
    },
]

export const guestRoutes: RouteObject[] = [
    {
        path: RoutesNames.REGISTER,
        element: <RegisterPage/>,
    },
    {
        path: RoutesNames.LOGIN,
        element: <LoginPage/>,
    },
]