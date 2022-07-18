import React, {FC, useState} from "react"
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material"
import {SubmitHandler, useForm} from "react-hook-form"
import {IAuthFormFields} from "../models/form"
import {Link} from "react-router-dom"
import GitHubIcon from "@mui/icons-material/GitHub"
import { auth } from "../firebaseConfig"
import {Auth, UserCredential} from "firebase/auth"

interface AuthFormProps {
    title: string
    subtitle: string
    link: string
    authFunc: (auth: Auth, email: string, password: string) => Promise<UserCredential>
}

const AuthForm: FC<AuthFormProps> = ({title, subtitle, link, authFunc}) => {
    const [authError, setAuthError] = useState<string>("")
    const {register, reset, handleSubmit, formState: {errors}} = useForm<IAuthFormFields>({
        mode: "onSubmit"
    })

    const authWithEmailAndPassword = async (email: string, password: string) => {
        const user = await authFunc(auth, email, password)
        console.log(user)
    }

    const onSubmit: SubmitHandler<IAuthFormFields> = (data) => {
        try {
            authWithEmailAndPassword(data.email, data.password)
            setAuthError("")
            reset()
        } catch (e: any) {
            setAuthError(e.message)
        }
    }

    return (
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Avatar sx={{m: 1, bgcolor: "primary.main"}}>
                    <GitHubIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoFocus
                    {...register("email", {
                        required: "Email is required field",
                        pattern: {
                            message: "Please enter a correct email",
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        },
                    })}
                    error={!!errors.email || !!authError}
                    helperText={errors.email?.message || authError}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "Password is required field",
                        minLength: {
                            message: "Password must be longer than 7 characters",
                            value: 8,
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {title}
                </Button>
                <Grid container>
                    <Grid item>
                        <Link to={link}>
                            {subtitle}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default AuthForm
