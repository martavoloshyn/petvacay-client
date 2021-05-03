import React from 'react';

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {Base} from "./base/Base";

export class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                {/*<Head />*/}
                <Switch>
                    <Route exact path="/" component={Base} />
                </Switch>
            </BrowserRouter>
        );
    }
}