import React, {FC} from "react"
import {Box, Card, Link, Rating} from "@mui/material"
import Typography from "@mui/material/Typography"
import ForkLeftRoundedIcon from "@mui/icons-material/ForkLeftRounded"
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded"
import {useActions, useAppSelector} from "../hooks/redux"
import {ref, remove, set} from "firebase/database"
import {auth, database} from "../firebaseConfig"
import {IRepo} from "../models/github"
import {useNavigate} from "react-router-dom"
import {RoutesNames} from "../routes"

interface RepoCardItemProps {
    name: string
    description: string
    url: string
    forks_count: number
    watchers_count: number
    repo: IRepo
    isFavourite: boolean
}

const RepoCardItem: FC<RepoCardItemProps> = ({watchers_count, forks_count,
                                                 url, name, description,
                                                 repo, isFavourite}) => {
    const {isAuth} = useAppSelector(state => state.app)
    const {addRepoToFav, removeRepoFromFav} = useActions()
    const navigator = useNavigate()

    const onClick = () => {
        if (isAuth) {
            if (isFavourite) {
                remove(ref(database, `${auth.currentUser?.uid}/${repo.id}`))
                removeRepoFromFav(repo.id)
                return
            }
            set(ref(database, `${auth.currentUser?.uid}/${repo.id}`), repo)
            addRepoToFav(repo)
            return
        }
        navigator(RoutesNames.LOGIN)
    }

    return (
        <Card variant="outlined" component={Link} href={url} target="_blank"
              sx={{textDecoration: "none", color: "inherit", padding: 1, height: "100%",
                  display: "flex", flexDirection: "column"}}>
            <Typography variant="h5" textOverflow="ellipsis" whiteSpace="nowrap"
                        overflow="hidden">{name}</Typography>
            <Typography variant="body2" textOverflow="ellipsis" whiteSpace="nowrap"
                        overflow="hidden">{description}</Typography>
            <Box sx={{display: "flex", alignItems: "center", columnGap: 2}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography>{forks_count}</Typography> <ForkLeftRoundedIcon />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", columnGap: 0.5}}>
                    <Typography>{watchers_count}</Typography><RemoveRedEyeRoundedIcon />
                </Box>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", columnGap: 0.5, mt: "auto"}}>
                <Rating value={Number(isFavourite)} max={1} onChange={onClick} />
            </Box>
        </Card>
    )
}

export default RepoCardItem