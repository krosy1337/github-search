import React, {FC, useEffect, useState} from "react"
import {useLazyFetchUserReposQuery, useSearchUsersQuery} from "../store/github/github.api"
import {Box, Container, List, ListItem, Paper, TextField} from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import {useDebounce} from "../hooks/useDebounce"
import UserCardItem from "../components/UserCardItem"
import {IRepo, IUser} from "../models/github"
import Typography from "@mui/material/Typography"

import RepoCardItem from "../components/RepoCardItem"

const HomePage: FC = () => {
    const [username, setUsername] = useState<string>("")
    const [isUsersVisible, setUsersVisible] = useState<boolean>(false)
    const debouncedUsername = useDebounce(username)

    const {isLoading: isUsersLoading, isError: isUsersError, data: usersData} = useSearchUsersQuery(debouncedUsername, {
        skip: !debouncedUsername,
        refetchOnFocus: true,
    })
    const [fetchRepos, {
        isLoading: isReposLoading,
        isError: isReposError,
        data: reposData
    }] = useLazyFetchUserReposQuery()

    useEffect(() => {
        setUsersVisible(!!debouncedUsername)
    }, [debouncedUsername])

    const onClick = (login: string) => {
        setUsersVisible(false)
        setUsername("")
        fetchRepos(login)
    }

    return (
        <Container maxWidth="lg" sx={{
            paddingY: 5,
            display: "flex", flexDirection: "column", alignItems: "center",
        }}>
            <Box sx={{position: "relative"}}>
                <TextField variant="standard" placeholder="Search users on Github"
                           value={username} onChange={(e) => setUsername(e.currentTarget.value)}
                           onFocus={() => {
                               if (username) {
                                   setUsersVisible(!isUsersError)
                               }
                           }}
                           sx={{height: 32, width: 300}}/>
                {
                    isUsersVisible &&
                    <Paper component={List} elevation={10}
                           sx={{
                               position: "absolute", top: 32,
                               height: 300, width: "100%",
                               m: 0, p: 0,
                               overflowY: "scroll",
                               zIndex: 1,
                           }}>
                        {isUsersLoading && <Box
                            sx={{display: "flex", justifyContent: "center", marginTop: 2,}}><CircularProgress/></Box>}
                        {(usersData && usersData.length > 0)
                            ?
                            usersData?.map((user: IUser) =>
                                <UserCardItem key={user.id} login={user.login} avatar_url={user.avatar_url}
                                              onClick={onClick}/>)
                            :
                            !isUsersLoading && <Typography variant="h5" align="center">No one user :(</Typography>
                        }
                    </Paper>
                }
            </Box>
            {isUsersError && <Typography variant="h3" align="center">Something were wrong...</Typography>}
            <Box>
                {isReposLoading &&
                    <Box sx={{display: "flex", justifyContent: "center", marginTop: 2,}}><CircularProgress/></Box>}
                {(reposData && reposData.length) &&
                    <List sx={{p: 0, m: 0,}}>
                        {reposData.map((repo: IRepo) =>
                            <ListItem key={repo.id} sx={{
                                display: "flex", flexDirection: "column", alignItems: "stretch", width: 300, paddingX: 0
                            }}>
                                <RepoCardItem name={repo.name} description={repo.description}
                                              forks_count={repo.forks_count} watchers_count={repo.watchers_count}
                                              url={repo.html_url}/>
                            </ListItem>
                        )}
                    </List>
                }
                {isReposError && <Typography variant="h3" align="center">Something were wrong...</Typography>}
            </Box>
        </Container>
    )
}

export default HomePage