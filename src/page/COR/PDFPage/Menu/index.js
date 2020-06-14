import React from 'react';
import classes from './index.module.css'
import {withRouter} from 'react-router-dom';

class CORMenuReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className='d-flex mt-2'>
                <div>
                    <div
                        className={this.props.location.pathname.indexOf('/cor/home') > -1? classes.selectrectangle: classes.rectangle}
                        onClick={() => {this.props.history.push('/cor/home');}}
                    >Home</div>
                    <div className={this.props.location.pathname.indexOf('/cor/home') > -1? classes.selectarrow: classes.arrow}></div>
                </div>
                <div style={{marginLeft:'-20px'}}>
                    <div className={classes.arrow2}></div>
                    <div
                        className={this.props.location.pathname.indexOf('/cor/pdf') > -1? classes.selectrectangle: classes.rectangle}
                        onClick={() => {this.props.history.push('/cor/pdf');}}
                    >Learn</div>
                    <div className={this.props.location.pathname.indexOf('/cor/pdf') > -1? classes.selectarrow: classes.arrow}></div>

                </div>
                <div style={{marginLeft:'-20px'}}>
                    <div className={classes.arrow2}></div>
                    <div
                        className={this.props.location.pathname.indexOf('/cor/qa') > -1? classes.selectrectangle: classes.rectangle}
                        onClick={() => {this.props.history.push('/cor/qa');}}
                    >Assessment</div>
                    <div className={this.props.location.pathname.indexOf('/cor/qa') > -1? classes.selectarrow: classes.arrow}></div>
                </div>
                <div style={{marginLeft:'-20px'}}>
                    <div className={classes.arrow2}></div>
                    <div
                        className={this.props.location.pathname.indexOf('/cor/worksheet') > -1? classes.selectrectangle: classes.rectangle}
                        onClick={() => {this.props.history.push('/cor/worksheet');}}
                    >Exercise</div>
                </div>

            </div>
        );
    }
}
export const CORMenu = withRouter(CORMenuReact)
