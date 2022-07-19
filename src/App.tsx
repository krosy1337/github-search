import React, {FC, useEffect, useMemo} from "react"
import {useRoutes} from "react-router-dom"
import Header from "./components/Header"
import {CssBaseline} from "@mui/material"
import {authRoutes, guestRoutes, rootRoutes} from "./routes"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "./firebaseConfig"
import {useActions, useAppSelector} from "./hooks/redux"

const App: FC = () => {
    const {isAuth} = useAppSelector(state => state.app)
    const {setAuth} = useActions()
    const appRoutes = useMemo(() => {
        return isAuth ? rootRoutes.concat(authRoutes) : rootRoutes.concat(guestRoutes)
    }, [isAuth])

    const routes = useRoutes(appRoutes)

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setAuth(!!auth.currentUser)
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