import React from "react";
import AddCredential from "./Components/AddCredential";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Table from "./Components/Table";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import UpdateCredential from "./Components/UpdateCredential";

const App = () => {

    return (
            <Router>
                <Route exact path="/" component={Login}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/add" component={AddCredential}/>
                <Route exact path="/view" component={Table}/>
                <Route exact path="/update" component={UpdateCredential}/>
            </Router>
    );

}

export default App;
