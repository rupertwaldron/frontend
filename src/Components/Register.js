import React, {useState} from "react";
import {Redirect} from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import loginStyles from "./loginStyles";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const Register = () => {
    const classes = loginStyles();
    const initialState = {username: "", password: ""};
    const [userInfo, setUserInfo] = useState(initialState);
    const [message, setMessage] = React.useState("");
    const [status, setStatus] = React.useState(0);
    const [hasLoaded, setHasLoaded] = React.useState(false);

    const handleUserName = event => setUserInfo({...userInfo, username: event.target.value});

    const handlePassword = event => setUserInfo({...userInfo, password: event.target.value});

    const login = () => {
        console.log("User = " + userInfo.username + " : " + userInfo.password);
        const user = {username: userInfo.username, password: userInfo.password};
        fetch("http://localhost:8080/register", {
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
        })
            .then(response => {
                setHasLoaded(true);
                console.log(response.status);
                setStatus(response.status);
                setMessage(status === 201 ? "Registration Successful" : "Registration failed try a different username");
            })
            .catch(err => console.error(err));
    };


    if (status === 201) {
        return (<Redirect to="/"/>);
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOpenIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
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
                                    type="password"
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
                            Register
                        </Button>

                        <Grid container justify="center">
                            <Grid item>
                                <Link to="/">Login</Link>
                            </Grid>
                        </Grid>
                    </form>
                    {hasLoaded && <Typography style={{margin: 7}} variant="body1">Status: {message}</Typography>}
                </div>
            </Container>
        );
    }

}


export default Register;