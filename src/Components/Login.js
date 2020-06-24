import React, {useState} from "react";
import {Redirect} from "react-router";

const Login = () => {
    const initialState = {username: "", password: "", isAuthenticated: false, open: false};
    const [userInfo, setUserInfo] = useState(initialState);

    const handleUserName = (event) => {
        setUserInfo({...userInfo, username: event.target.value})
        console.log("Event value = " + userInfo.username + " password: " + userInfo.password);
    }

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

    if (userInfo.isAuthenticated) {
        return (<Redirect to="/view"/>);
    } else {
        return (
            <div id="login">
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

        );
    }

}


export default Login;