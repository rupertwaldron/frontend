import React, {useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "./NavBar";
import addStyles from "./addStyles";


export default function UpdateCredential(props) {
    const classes = addStyles();
    const [firstLoad, setLoad] = React.useState(true);

    const [credentialName, setCredentialName] = React.useState(props.location.state.name);
    const [url, setUrl] = React.useState(props.location.state.url);
    const [login, setLogin] = React.useState(props.location.state.login);
    const [password, setPassword] = React.useState(props.location.state.password);
    const [uuid, setUuid] = React.useState(props.location.state.uuid);

    const handlePasswordChange = event => setPassword(event.target.value);
    const handleCredentialNameChange = event => setCredentialName(event.target.value);
    const handleUrlChange = event => setUrl(event.target.value);
    const handleLoginChange = event => setLogin(event.target.value);

    const [message, setMessage] = React.useState("Nothing saved in the session");

    async function sampleFunc(toInput) {
        const response = await fetch(`/credentials/` + uuid, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + sessionStorage.getItem('jwt')
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: JSON.stringify(toInput) // body data type must match "Content-Type" header
        });
        let body = await response.json();
        console.log(body.id);
        setMessage(body.id ? "Data sucessfully updated" : "Data update failed");
    }

    async function handleDelete() {
        const response = await fetch(`/credentials/` + uuid, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + sessionStorage.getItem('jwt')
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            //body: JSON.stringify(toInput) // body data type must match "Content-Type" header
        });
        let body = await response.json();
        console.log(body.id);
        setMessage(body.id ? "Data sucessfully deleted" : "Data deletion failed");
    }

    const handleSubmit = variables => {
        const toInput = { credentialName, url, login, password };
        sampleFunc(toInput);
        setCredentialName("");
        setUrl("");
        setLogin("");
        setPassword("");
        setUuid("");
    };

    if (firstLoad) {
        // sampleFunc();
        setLoad(false);
    }

    useEffect(() => {
        const {name, url, login, password, uuid} = props.location.state;
        console.log("My props: "+  name + ", " + url + ", " + login + ", " + password + ", " + uuid);
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Update Credentials
                </Typography>
                <NavBar activeUser = {sessionStorage.getItem("activeUser")}/>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="credentialName"
                                value={credentialName}
                                label="Credential Name"
                                name="credentialName"
                                autoComplete="credentialName"
                                onChange={handleCredentialNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="url"
                                name="url"
                                variant="outlined"
                                required
                                fullWidth
                                value={url}
                                id="url"
                                label="Url"
                                onChange={handleUrlChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="login"
                                value={login}
                                label="Login"
                                name="login"
                                autoComplete="login"
                                onChange={handleLoginChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                value={password}
                                label="password"
                                name="password"
                                autoComplete="password"
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>

                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/view">View Credentials</Link>
                        </Grid>
                    </Grid>
                </form>
                <Typography style={{ margin: 7 }} variant="body1">
                    Status: {message}
                </Typography>
            </div>
        </Container>
    );
}