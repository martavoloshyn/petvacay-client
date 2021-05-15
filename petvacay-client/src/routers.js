import React from 'react';

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {Login} from "./login/Login";
import {Base} from "./base/Base";
import {Registration} from "./auth/Registration";
import {ActivationUser} from "./auth/ActivationUser";
import {CustomerRegistration} from "./auth/CustomerRegistration";
import {UserInfo} from "./auth/UserInfo";

export class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                {/*<Head />*/}
                <Switch>
                    <Route exact path="/" component={Base} />
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/user/info" component={UserInfo} />
                    <Route path="/activation/:activationCode" component={ActivationUser} />
                </Switch>
            </BrowserRouter>
        );
    }
}