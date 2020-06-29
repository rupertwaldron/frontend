import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 600,
        ariaLabel: "simple table"
    },
    avatar: {
        margin: theme.spacing(1),
        //backgroundColor: theme.palette.secondary.main
        backgroundColor: theme.palette.secondary.main
    },
    tableContainer: {
        width: "80%",
        margin: "0 10px"
    },
    tableTitle: {
        textAlign: "center",
        fontWeight: "bold",
        color: theme.palette.secondary.dark
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
    },
    redirection: {
        "&:hover": {
            color: theme.palette.secondary.light
        }
    }
}));

export default useStyles;