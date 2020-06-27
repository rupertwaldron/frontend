import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Redirect} from "react-router";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 600
    },
    avatar: {
        margin: theme.spacing(1),
        //backgroundColor: theme.palette.secondary.main
        backgroundColor: theme.palette.secondary.main
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: `10px`,
        height: "100%",
        width: "99%",
        marginTop: theme.spacing(7)
    },
    link: {
        color: "rgba(0,0,0,0.65)",
        textDecoration: "none",
        marginLeft: "10%",
        alignSelf: "flex-start",
        "&:hover": {
            color: "rgba(0,0,0,1)"
        }
    },
    button: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "yellow"
        }
    }
}));

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
        sampleFunc();
        setLoad(false);
    }

    // if (data.length > 0) isLoading = false;

    useEffect(() => {
        console.log('Table Rendering Credentials: ');
        setIsLoading(false);
    }, [data])

    const view = <TableContainer
        style={{width: "80%", margin: "0 10px"}}
        component={Paper}
    >
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">CredentialName</TableCell>
                    <TableCell align="center">Url</TableCell>
                    <TableCell align="center">Login</TableCell>
                    <TableCell align="center">Password</TableCell>
                    <TableCell align="center">        </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell align="center">{row.guid}</TableCell>
                        <TableCell align="center">{row.credentialName}</TableCell>
                        <TableCell align="center">{row.url}</TableCell>
                        <TableCell align="center">{row.login}</TableCell>
                        <TableCell align="center">{row.password}</TableCell>
                        <TableCell align="center"><Button className={classes.button} onClick={() => {}}>Edit</Button></TableCell>
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
                case 200: return view
                case 401: return (<Redirect to="/login"/>);
                //case 401: return <h3>UnAuthorized</h3>
                default: return <h3>Server Error</h3>
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

            {/*{(isLoading && statusCode === 200) ? <CircularProgress/> : view}*/}

            {getDisplay()}

            <Link className={classes.link} to="/">
                {" "}
                <Typography align="left">
                    &#x2190; Head back to save data
                </Typography>{" "}
            </Link>
        </div>
    );
}