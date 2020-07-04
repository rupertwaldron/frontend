import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import {Home, LockOpen, Person} from '@material-ui/icons'
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import navStyles from "./navStyles";


const NavBar = () => {
    const classes = navStyles();
    //console.log("Username = " + sessionStorage.getItem('userName'));
    return (
        <div>

                    <Link to="/view">

                        <Tooltip title="View Credentials">
                            <Home/>
                        </Tooltip>

                    </Link>




                    <Link  to="/add">
                        <Tooltip title="New Credential">

                            <LockOpen/>
                        </Tooltip>

                    </Link>



                    <Link to="/">
                        <Tooltip title="Logout">

                            <Person/>
                        </Tooltip>

                    </Link>

        </div>

    )
}


export default NavBar;