import React, {useState} from "react";
import Table from "./Table";

const Login = () => {
    const initialUserName = {username: ""};
    const [userName, setUserName] = useState(initialUserName);
    const [password, setPassword] = useState("");

    const handleUserName = (event) => {
        setUserName(event.target.value);
        console.log("Event value = " + userName + " password: " + password);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        console.log("Event value = " + userName + " password: " + password);
    }

    const login = () => {
        console.log("User = " + userName + " : " + password);
        // fetch("http://localhost:8080/authenticate", {
        //     method: 'POST',
        //     body: JSON.stringify(user)
        // })
        //     .then(res => {
        //         const jwtToken = res.headers.get('Authorization');
        //         if (jwtToken !== null) {
        //             sessionStorage.setItem("jwt", jwtToken);
        //             setLoginInfo({...loginInfo, isAuthenticated: true});
        //         }
        //         else {
        //             setLoginInfo({...loginInfo, open: true});
        //         }
        //     })
        //     .catch(err => console.error(err))
    };

    if (false) {
        return (<Table />)
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