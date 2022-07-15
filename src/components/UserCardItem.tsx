import React, {FC} from "react"
import {Avatar, ListItem, ListItemButton} from "@mui/material"
import Typography from "@mui/material/Typography"

interface UserCardItemProps {
    login: string
    avatar_url: string
    onClick: (login: string) => void
}

const UserCardItem: FC<UserCardItemProps> = ({avatar_url, login, onClick}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{display: "flex", columnGap: 1, padding: 1.1, borderRadius: 0}}
                            onClick={() => onClick(login)}>
                <Avatar alt={login} sx={{width: 30, height: 30}}>
                    <img src={avatar_url} alt={login}/>
                </Avatar>
                <Typography variant="h6" textOverflow="ellipsis" whiteSpace="nowrap"
                            overflow="hidden">{login}</Typography>
            </ListItemButton>
        </ListItem>
    )
}

export default UserCardItem