import React, {FC, useEffect} from "react"
import {auth} from "../firebaseConfig"
import {Box, Container, Divider, List, ListItem, Typography} from "@mui/material"
import {useActions, useAppSelector} from "../hooks/redux"
import CircularProgress from "@mui/material/CircularProgress"
import {IRepo} from "../models/github"
import RepoCardItem from "../components/RepoCardItem"

const FavouritesPage: FC = () => {
    const {isAuth} = useAppSelector(state => state.app)
    const {fetchFav} = useActions()
    const {favourites, isLoading, error} = useAppSelector(state => state.firebase)

    useEffect(() => {
        if (auth.currentUser && isAuth) {
            fetchFav(auth.currentUser?.uid)
        }
    }, [])

    return (
        <Container maxWidth="md">
            {(isAuth && auth.currentUser) && <Typography variant="h6">{auth.currentUser.email}</Typography>}
            <Divider />
            {isLoading && <Box
                sx={{display: "flex", justifyContent: "center", marginTop: 2,}}><CircularProgress/></Box>}
            {favourites.length > 0 &&
                <List sx={{p: 0, m: 0,
                    display: "flex", flexWrap: "wrap", flexDirection: {xs: "column", md: "row"}, alignItems: "stretch", columnGap: 1, }}>
                {favourites.map((repo: IRepo) =>
                    <ListItem key={repo.id} sx={{
                        paddingX: 0, display: "flex", width: {xs: "100%", md: "auto"},
                        alignItems: "stretch", flexDirection: "column",
                    }}>
                        <RepoCardItem name={repo.name} description={repo.description}
                                      forks_count={repo.forks_count} watchers_count={repo.watchers_count}
                                      url={repo.html_url} repo={repo}
                                      isFavourite />
                    </ListItem>
                )}
            </List>}
            {(favourites.length === 0 && !isLoading) &&
                <Typography variant="h3" align="center">List of favourite repositories is empty</Typography>}
            {error && <Typography variant="h3" align="center">Something were wrong...</Typography>}
        </Container>
    )
}

export default FavouritesPage