import React from "react";
import {Redirect} from "react-router";

const Logout = () => {
    console.log("Logout" + sessionStorage.getItem("jwt") + " : " + sessionStorage.getItem("activeUser"));
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("activeUser");
    console.log("Logout complete" + sessionStorage.getItem("jwt") + " : " + sessionStorage.getItem("activeUser"));
    return (
        <Redirect to="/"/>
    );
}

export default Logout;