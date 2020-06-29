import React, {useState} from "react";
import {Redirect} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(7),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    }
}));

const Login = () => {
    const classes = useStyles();
    const initialState = {username: "", password: "", isAuthenticated: false, open: false};
    const [userInfo, setUserInfo] = useState(initialState);
    const [message, setMessage] = React.useState("Login failed");

    const handleUserName = event => setUserInfo({...userInfo, username: event.target.value});

    // const handleUserName = (event) => {
    //     setUserInfo({...userInfo, username: event.target.value})
    //     console.log("Event value = " + userInfo.username + " password: " + userInfo.password);
    // }

    const handlePassword = (event) => {
        setUserInfo({...userInfo, password: event.target.value})
        console.log("Event value = " + userInfo.username + " password: " + userInfo.password);
    }

    const login = () => {
        console.log("User = " + userInfo.username + " : " + userInfo.password);
        const user = {username: userInfo.username, password: userInfo.password};
        fetch("http://localhost:8080/authenticate", {
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
            .then(response => response.json())
            .then(responseData => {
                const {token} = responseData;
                console.log("jwt token: " + token);
                if (token !== null) {
                    sessionStorage.setItem("jwt", token);
                    setUserInfo({...userInfo, isAuthenticated: true});
                } else {
                    setUserInfo({...userInfo, open: true});
                }
            })
            .catch(err => console.error(err));
    };

    const view =  <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <div className="form-group">
                            <input type="text" name="username" onChange={handleUserName}
                                   className="form-control" placeholder="username"/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" onChange={handlePassword}
                                   className="form-control" placeholder="password"/>
                        </div>
                        <input type="submit" name="submit" onClick={login} className="btn btn-info btn-md"
                               value="Login"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    const loginDisplay = <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <GroupIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
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
                        <Link to="/view">View Employee Records</Link>
                    </Grid>
                </Grid>
            </form>
            <Typography style={{ margin: 7 }} variant="body1">
                Status: {message}
            </Typography>
        </div>
    </Container>

    if (userInfo.isAuthenticated) {
        return (<Redirect to="/view"/>);
    } else {
        return (loginDisplay


        );
    }

}


export default Login;