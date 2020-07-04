import React, {useEffect} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Redirect} from "react-router";
import useStyles from "./styles";
import NavBar from "./NavBar";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import {LockOpen, Person} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";


export default function SimpleTable() {
    const classes = useStyles();

    const [data, upDateData] = React.useState([]);
    const [firstLoad, setLoad] = React.useState(true);
    const [statusCode, setStatusCode] = React.useState(200);
    const [isLoading, setIsLoading] = React.useState(true);

    async function sampleFunc() {
        let response = await fetch("/credentials", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + sessionStorage.getItem('jwt')
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
        });
        setStatusCode(response.status);
        try {
            let body = await response.json();
            upDateData(body);
        } catch (error) {
            console.error("My error = " + error);
        }

    }

    if (firstLoad) {
        console.log("sessionStorage = " + sessionStorage.getItem('jwt'));
        console.log("Username stored as = " + sessionStorage.getItem("activeUser"));
        sampleFunc();
        setLoad(false);
    }

    useEffect(() => {
        console.log('Table Rendering Credentials: ');
        setIsLoading(false);
    }, [data])

    const view = <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableTitle}>CredentialName</TableCell>
                    <TableCell className={classes.tableTitle}>Url</TableCell>
                    <TableCell className={classes.tableTitle}>Login</TableCell>
                    <TableCell className={classes.tableTitle}>Password</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell align="center">
                            <Link className={classes.redirection} to={{
                                pathname: '/update',
                                state: {
                                    name: row.credentialName,
                                    url: row.url,
                                    login: row.login,
                                    password: row.password,
                                    uuid: row.uuid
                                }
                            }}>
                                {row.credentialName}
                            </Link>
                        </TableCell>
                        <TableCell align="center"><a className={classes.redirection} href={`https://` + row.url}
                                                     target="_blank" rel="noopener noreferrer">{row.url}</a></TableCell>
                        <TableCell align="center">{row.login}</TableCell>
                        <TableCell align="center">{row.password}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

    const getDisplay = () => {
        let display;

        if (isLoading) {
            display = <CircularProgress/>
        } else {
            switch (statusCode) {
                case 200:
                    return view
                case 401:
                    return (<Redirect to="/"/>);
                //case 401: return <h3>UnAuthorized</h3>
                default:
                    return <h3>Server Error</h3>
            }
        }
        return display;
    }


    return (

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOpenIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Credentials
            </Typography>

            <NavBar activeUser = {sessionStorage.getItem("activeUser")}/>

            {/*{(isLoading && statusCode === 200) ? <CircularProgress/> : view}*/}

            {getDisplay()}

        </div>

    );
}