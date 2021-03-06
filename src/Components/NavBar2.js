import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import {Home, LockOpen, Person} from '@material-ui/icons'
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import navStyles from "./navStyles";


const NavBar2 = () => {
    const classes = navStyles();
    //console.log("Username = " + sessionStorage.getItem('userName'));
    return (
        <List component="nav">
            <ListItem component="div">
                <ListItemText inset>
                    <Link className={classes.link} to="/view">
                        <Typography color="inherit" variant="title">
                            <Tooltip title="View Credentials">
                            <Home/>
                            </Tooltip>
                        </Typography>{" "}
                    </Link>
                </ListItemText>


                <ListItemText inset>

                    <Link className={classes.link} to="/add">
                        <Typography color="inherit" variant="title">
                            <Tooltip title="Add Credential">
                            <LockOpen/>
                            </Tooltip>
                        </Typography>{" "}
                    </Link>

                </ListItemText>

                <ListItemText inset>

                    <Link className={classes.link} to="/">
                        <Typography color="inherit" variant="title">
                            <Tooltip title="Logout">
                            <Person/>
                            </Tooltip>
                        </Typography>{" "}
                    </Link>

                </ListItemText>
            </ListItem>

        </List>
    )
}


export default NavBar2;