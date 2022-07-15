import React, {FC} from "react"
import {Box, Card, Link} from "@mui/material"
import Typography from "@mui/material/Typography"
import ForkLeftRoundedIcon from "@mui/icons-material/ForkLeftRounded"
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded"

interface RepoCardItemProps {
    name: string
    description: string
    url: string
    forks_count: number
    watchers_count: number
}

const RepoCardItem: FC<RepoCardItemProps> = ({watchers_count, forks_count, url, name, description}) => {
    return (
        <Card variant="outlined" component={Link} href={url} target="_blank"
              sx={{textDecoration: "none", color: "inherit", padding: 1,}}>
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
        </Card>
    )
}

export default RepoCardItem