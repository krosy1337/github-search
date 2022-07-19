import React, {FC, useEffect, useState} from "react"
import {RouteObject, useRoutes} from "react-router-dom"
import Header from "./components/Header"
import {CssBaseline} from "@mui/material"
import {guestRoutes, rootRoutes} from "./routes"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "./firebaseConfig"

const App: FC = () => {
    const [appRoutes, setAppRoutes] = useState<RouteObject[]>(rootRoutes.concat(guestRoutes))

    const routes = useRoutes(appRoutes)

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            if (auth.currentUser) {
                setAppRoutes(rootRoutes)
            }
        })
    }, [])
    return (
        <>
            <CssBaseline/>
            <Header/>
            {routes}
        </>
    )
}

export default App