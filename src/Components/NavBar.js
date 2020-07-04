import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import {Home, LockOpen, Person} from '@material-ui/icons'
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import navStyles from "./navStyles";


const NavBar = (props) => {
    const classes = navStyles();
    console.log("Username in navbar = " + sessionStorage.getItem('activeUser'));

    if (props.activeUser !== null) {
        return  (<div>

            <Link to="/view">

                <Tooltip title="View Credentials">
                    <Home/>
                </Tooltip>

            </Link>

            <Link to="/add">
                <Tooltip title="New Credential">

                    <LockOpen/>
                </Tooltip>

            </Link>


            <Link to="/logout">
                {/*<Tooltip title={`Logout ${props.activeUser}`}>*/}
                <Tooltip title={`Logout ${props.activeUser}`}>
                    <Person/>
                </Tooltip>

            </Link>

        </div>);
    } else {
        return (
            <Link to="/logout">
                {/*<Tooltip title={`Logout ${props.activeUser}`}>*/}
                <Tooltip title={"Login"}>
                    <Person/>
                </Tooltip>

            </Link>
        )
    }
    //
    // return (
    //     <div>
    //
    //         <Link to="/view">
    //
    //             <Tooltip title="View Credentials">
    //                 <Home/>
    //             </Tooltip>
    //
    //         </Link>
    //
    //         <Link to="/add">
    //             <Tooltip title="New Credential">
    //
    //                 <LockOpen/>
    //             </Tooltip>
    //
    //         </Link>
    //
    //
    //         <Link to="/logout">
    //             {/*<Tooltip title={`Logout ${props.activeUser}`}>*/}
    //             <Tooltip title={props.activeUser != null ? `Logout ${props.activeUser}` : "Login"}>
    //                 <Person/>
    //             </Tooltip>
    //
    //         </Link>
    //
    //     </div>

}


export default NavBar;