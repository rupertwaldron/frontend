import React from "react";
import AddCredential from "./Components/AddCredential";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Table from "./Components/Table";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UpdateCredential from "./Components/UpdateCredential";
import {createStore} from "redux";
import {Provider} from "react-redux";

const App = () => {

    const initialState = {
        currentUser: {}
    }

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'LOGIN_USER':
                return {...state, currentUser: action.payload}
            default:
                return state;
        }
    }

    const store = createStore(reducer);

    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={AddCredential}/>
                <Route exact path="/view" component={Table}/>
                <Route exact path="/update" component={UpdateCredential}/>
            </Router>
        </Provider>
    );

}

export default App;
