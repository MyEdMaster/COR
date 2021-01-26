import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
//import AnimatedRouter from 'react-animated-router';
// import 'react-animated-router/animate.css';
import {TestPage} from "./page/test-page";
import {COR} from "./page/COR";

// import {ProblemList} from "./CRUD_module/problem_list"
// import {ProblemDetail} from "./CRUD_module/problem_detail";


export class App extends Component {
    render() {
        return (
            <Route>
                <Switch>
                    <Route
                        path="/cor"
                        component={routeProps => <COR {...routeProps} />}
                    />

                    <Route
                        path="/test"
                        component={routeProps => <TestPage {...routeProps} />}
                    />
                    <Redirect to="/cor"/>
                </Switch>
            </Route>

        );
    }
}
