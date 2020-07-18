import React, {useState} from "react";
import {Redirect} from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import loginStyles from "./loginStyles";
import NavBar from "./NavBar";

const Login = () => {
    const classes = loginStyles();
    const initialState = {username: "", password: "", isAuthenticated: false, open: false};
    const [userInfo, setUserInfo] = useState(initialState);
    const [message, setMessage] = useState("");

    const handleUserName = event => setUserInfo({...userInfo, username: event.target.value});

    const handlePassword = event => setUserInfo({...userInfo, password: event.target.value});

    const login = async () => {
        console.log("User = " + userInfo.username + " : " + userInfo.password);
        const user = {username: userInfo.username, password: userInfo.password};
        const response = await fetch("/authenticate", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: JSON.stringify(user)
        });
        let returnedStatus = response.status;
        const {token} = await response.json();
        if (returnedStatus === 200 && token !== null) {
            sessionStorage.setItem("jwt", token);
            sessionStorage.setItem("activeUser", userInfo.username);
            setUserInfo({...userInfo, isAuthenticated: true});
        }
        setMessage(token ? "Login Successful" : "Login failed");
        console.log("Username stored as = " + sessionStorage.getItem("activeUser"));
    };

    if (userInfo.isAuthenticated) {
        return (<Redirect to="/view"/>);
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOpenIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <NavBar activeUser = {sessionStorage.getItem("activeUser")}/>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    value={userInfo.username}
                                    label="User Name"
                                    name="userName"
                                    autoComplete="userName"
                                    onChange={handleUserName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    value={userInfo.password}
                                    label="password"
                                    name="password"
                                    autoComplete="password"
                                    onChange={handlePassword}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={login}
                        >
                            Login
                        </Button>

                        <Grid container justify="center">
                            <Grid item>
                                <Link to="/register">Register</Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography style={{margin: 7}} variant="body1">{message}</Typography>
                </div>
            </Container>
        );
    }

}


export default Login;