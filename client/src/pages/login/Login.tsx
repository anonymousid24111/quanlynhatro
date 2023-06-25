import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RRLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fetchHandler from "../../config/axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { setUserInfo } from "../auth/authSlice";
import { UserRole } from "../auth/models";

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await fetchHandler.post("/user/login", {
            phone: formData.get("phone"),
            password: formData.get("password"),
        });
        const { data, error } = res?.data || {};
        const { token, id, username, role, phone } = data || {};
        if (error) {
            toast.error(error);
        }
        if (token) {
            localStorage.setItem("token", token);
            dispatch(
                setUserInfo({
                    id,
                    username,
                    role,
                    phone,
                })
            );
            if (role === UserRole.Tenant) {
                navigate("/tenant");
            }
            if (role === UserRole.Lessor) {
                navigate("/lessor");
            }
            if (role === UserRole.Admin) {
                navigate("/admin");
            }
            if (role === UserRole.Guest) {
                navigate("/");
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Số điện thoại"
                            name="phone"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Ghi nhớ"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Quên mật khẩu?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <RRLink to={"/signup"}>
                                    <Link variant="body2">
                                        {"Bạn chưa có tài khoản? Đăng ký"}
                                    </Link>
                                </RRLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
