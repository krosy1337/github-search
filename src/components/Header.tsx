import {AppBar, Box, Container, Toolbar} from "@mui/material"
import React, {FC} from "react"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import GitHubIcon from "@mui/icons-material/GitHub"
import {Link} from "react-router-dom"
import {RoutesNames} from "../routes"
import {auth} from "../firebaseConfig"
import {signOut} from "firebase/auth"
import {useAppSelector} from "../hooks/redux"

const Header: FC = () => {
    const {isAuth} = useAppSelector(state => state.app)

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const logout = async () => {
        signOut(auth)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <GitHubIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: {xs: "none", md: "flex"},
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Github Search
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: "block", md: "none"},
                            }}
                        >
                            <Link to={RoutesNames.FAVOURITES} style={{color: "inherit", textDecoration: "none"}}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    Favourites
                                </MenuItem>
                            </Link>
                            {
                                isAuth
                                    ?
                                    <MenuItem onClick={logout}>
                                        Logout
                                    </MenuItem>
                                    :
                                    <Link to={RoutesNames.LOGIN} style={{color: "inherit", textDecoration: "none"}}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            Login
                                        </MenuItem>
                                    </Link>
                            }
                        </Menu>
                    </Box>
                    <GitHubIcon sx={{display: {xs: "flex", md: "none"}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            marginLeft: "auto",
                            display: {xs: "flex", md: "none"},
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Github Search
                    </Typography>
                    <Box sx={{flexGrow: 0, marginLeft: "auto", display: {xs: "none", md: "flex"}}}>
                        <Link to={RoutesNames.FAVOURITES} style={{color: "inherit", textDecoration: "none"}}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: "white", display: "block"}}
                            >
                                Favourites
                            </Button>
                        </Link>

                        {
                            isAuth
                                ?
                                <Button
                                    onClick={logout}
                                    sx={{my: 2, color: "white", display: "block"}}
                                >
                                    Logout
                                </Button>
                                :
                                <Link to={RoutesNames.LOGIN} style={{color: "inherit", textDecoration: "none"}}>
                                    <Button
                                        sx={{my: 2, color: "white", display: "block"}}
                                    >
                                        Login
                                    </Button>
                                </Link>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header

