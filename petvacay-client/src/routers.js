import React from 'react';

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {Login} from "./login/Login";
import {Base} from "./base/Base";
import {Registration} from "./auth/registration";
import {ActivationUser} from "./auth/activationUser";

export class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                {/*<Head />*/}
                <Switch>
                    <Route exact path="/" component={Base} />
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/activation/:activationCode" component={ActivationUser} />
                </Switch>
            </BrowserRouter>
        );
    }
}