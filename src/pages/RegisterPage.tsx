import React, {FC} from "react"
import AuthForm from "../components/AuthForm"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {RoutesNames} from "../routes"

const RegisterPage: FC = () => {
    return (
        <AuthForm title="Sign Up" subtitle="Have an account? Sign In" link={RoutesNames.LOGIN}
                  authFunc={createUserWithEmailAndPassword} />
    )
}

export default RegisterPage