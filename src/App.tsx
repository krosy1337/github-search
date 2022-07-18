import React from "react"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import FavouritesPage from "./pages/FavouritesPage"
import Header from "./components/Header"
import {CssBaseline} from "@mui/material"
import { RoutesNames } from "./routes"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={RoutesNames.ROOT} element={<HomePage />} />
                    <Route path={RoutesNames.FAVOURITES} element={<FavouritesPage />} />
                    <Route path={RoutesNames.REGISTER} element={<RegisterPage />} />
                    <Route path={RoutesNames.LOGIN} element={<LoginPage />} />
                    <Route path="*" element={<Navigate to={RoutesNames.ROOT} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App