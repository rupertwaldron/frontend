import React from 'react';
import {Home, LockOpen, Person} from '@material-ui/icons'
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';


const NavBar = (props) => {
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
}


export default NavBar;