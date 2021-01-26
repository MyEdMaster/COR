//import React from "react";


// import 'hopscotch/dist/css/hopscotch.css';
import React, { Component } from 'react';
import classes from './index.module.css'


export class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {

        return (
            <div className='d-flex'>
                <div>
                    <div className={`${classes.rectangle}`}>Review</div>
                    <div className={classes.arrow}></div>
                </div>
                <div style={{marginLeft:'-20px'}}>
                    <div className={classes.arrow2}></div>
                    <div className={classes.rectangle}>Worksheet</div>
                    <div className={classes.arrow}></div>
                </div>
                <div style={{marginLeft:'-20px'}}>
                    <div className={classes.arrow2}></div>
                    <div className={classes.rectangle}>Answer</div>
                    <div className={classes.arrow}></div>
                </div>

            </div>
        );
    }
}
