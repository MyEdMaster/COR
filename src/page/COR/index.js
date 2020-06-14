import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Nav} from "../Nav";
import {CORPdf} from "./PDFPage/index.js";
import {AskQuestionCOR} from "./PDFPage/ask-question";
import {CORHome} from "./HomePage";
import {CORWorkSheet} from "./Worksheet";
import {CORMenu} from "./PDFPage/Menu";
import {CORQA} from "./QA";

export class COR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
          <div>
              <Nav/>

              <CORMenu/>
              <Switch>
                  <Route
                      path={`${this.props.match.url}/home`}
                      component={routeProps => <CORHome {...routeProps} />}
                  />
                  <Route
                      path={`${this.props.match.url}/pdf`}
                      component={routeProps => <CORPdf {...routeProps} />}
                  />
                  <Route
                      path={`${this.props.match.url}/worksheet`}
                      component={routeProps => <CORWorkSheet {...routeProps} />}
                  />
                  <Route
                      path={`${this.props.match.url}/qa`}
                      component={routeProps => <CORQA {...routeProps} />}
                  />

                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/intro`}*/}
                      {/*component={routeProps => <ComplexIntro {...routeProps} />}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/add`}*/}
                      {/*component={routeProps => <ComplexAdd {...routeProps} />}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/divi`}*/}
                      {/*component={routeProps => <ComplexDivi {...routeProps} />}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/feedback`}*/}
                      {/*component={routeProps => <ComplexFeedback {...routeProps} />}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/mult`}*/}
                      {/*component={routeProps => <ComplexMult {...routeProps} />}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/subt`}*/}
                      {/*component={routeProps => <ComplexSubt {...routeProps} />}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path={`${this.props.match.url}/home`}*/}
                      {/*component={routeProps => <ComplexHome {...routeProps} />}*/}
                  />
                  <Redirect to={`${this.props.match.url}/home`} />

              </Switch>

          </div>

        );
    }
}
