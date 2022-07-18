import React from "react"
import {signInWithEmailAndPassword} from "firebase/auth"
import AuthForm from "../components/AuthForm"
import {RoutesNames} from "../routes"

const LoginPage = () => {
    return (
        <AuthForm title="Sign In"
                  subtitle="Don't have an account? Sign Up" link={RoutesNames.REGISTER} authFunc={signInWithEmailAndPassword} />
    )
}

export default LoginPage