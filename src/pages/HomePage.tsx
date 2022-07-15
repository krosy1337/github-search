import React, {FC, useEffect, useState} from "react"
import {useSearchUsersQuery} from "../store/github/github.api"
import {Box, Container, List, Paper, TextField} from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import {useDebounce} from "../hooks/useDebounce"
import UserCardItem from "../components/UserCardItem"
import {IUser} from "../models/github"

const HomePage: FC = () => {
    const [username, setUsername] = useState<string>("")
    const debouncedUsername = useDebounce(username)
    const {isLoading, isError, data} = useSearchUsersQuery(debouncedUsername, {
        skip: !debouncedUsername
    })

    const onClick = (login: string) => {

    }

    return (
        <Container maxWidth="lg" sx={{
            paddingY: 5,
            display: "flex", flexDirection: "column", alignItems: "center",
        }}>
            <Box sx={{position: "relative"}}>
                <TextField variant="standard" placeholder="Search users on Github"
                           value={username} onChange={(e) => setUsername(e.currentTarget.value)}
                           sx={{height: 32, width: 300}}/>
                <Paper component={List} elevation={10}
                       sx={{
                           position: "absolute", top: 32,
                           height: 300, width: "100%",
                           m: 0, p: 0,
                           overflowY: "scroll"
                       }}>
                    {isLoading && <Box
                        sx={{display: "flex", justifyContent: "center", marginTop: 2,}}><CircularProgress/></Box>}
                    {data?.map((user: IUser) =>
                        <UserCardItem key={user.id} login={user.login} avatar_url={user.avatar_url} onClick={onClick}/>
                    )}
                </Paper>
            </Box>
        </Container>
    )
}

export default HomePage