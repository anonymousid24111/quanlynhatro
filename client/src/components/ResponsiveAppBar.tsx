import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserInfo } from "../pages/auth/authSlice";
import { UserRole } from "../pages/auth/models";
import logo from "../assets/logo.png";

export interface INavItem {
    title: string;
    link: string;
}

export interface IResponsiveAppBarProps {
    pages: INavItem[];
    settings: INavItem[];
}

function ResponsiveAppBar(props: IResponsiveAppBarProps) {
    const { pages, settings } = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { username } = useAppSelector((state) => state.auth.userInfo);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img src={logo} alt="logo" width={40} height={40} />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
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
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page: INavItem) => (
                                <NavLink key={page.link} to={page.link}>
                                    <MenuItem
                                        key={page.link}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img src={logo} alt="logo" width={40} height={40} />
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page: INavItem) => (
                            <NavLink key={page.link} to={page.link}>
                                <Button
                                    key={page.link}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page.title}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={username}
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting: INavItem) => {
                                if (setting.link.includes("logout")) {
                                    return (
                                        <MenuItem
                                            key={setting.link}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                localStorage.removeItem(
                                                    "token"
                                                );
                                                dispatch(
                                                    setUserInfo({
                                                        id: -1,
                                                        phone: "",
                                                        role: UserRole.Guest,
                                                        username: "",
                                                    })
                                                );
                                                navigate("/login");
                                            }}
                                        >
                                            <Typography textAlign="center">
                                                {setting.title}
                                            </Typography>
                                        </MenuItem>
                                    );
                                }
                                return (
                                    <NavLink
                                        key={setting.link}
                                        to={setting.link}
                                    >
                                        <MenuItem
                                            key={setting.link}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">
                                                {setting.title}
                                            </Typography>
                                        </MenuItem>
                                    </NavLink>
                                );
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
