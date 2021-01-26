import React from 'react';

import {MDBRow, MDBCol,MDBBtn,MDBIcon} from 'mdbreact'

import classes from './index.module.css'
// import {InlineMath} from "react-katex";



export class CORHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test:'',
            render:0

        };
    }

    render() {

        return (
            <div>
                <div className={classes.font}>
                    INTERMEDIATE COR REFRESHER
                </div>
                {/*<div className={classes.font2}>*/}
                    {/*SYLLABUS*/}
                {/*</div>*/}
                <MDBRow>
                    <MDBCol size="2">

                    </MDBCol>
                    <MDBCol size="8" className={classes.font3}>
                        <h4 style={{color:'#CC0000'}}>COURSE OVERVIEW</h4>
                        <p>Experienced contracting officer's representatives (COR) know that projects can present a variety of
                            challenges and responsibilities. This course will provide refresher training and an update on
                            contracting principles that can build a strong foundation for future contracting work. You will be
                            faced with various, relevant simulations to test your critical thinking abilities.</p>
                        <h4 style={{color:'#CC0000'}}>Learning Objectives</h4>
                        <ul type="square">
                            <li>Discuss the purpose, process, and the role and responsibilities of the COR as a member of the
                                market research team</li>
                            <li>Identify the role and responsibilities of the COR related to the development of the solicitation</li>
                            <li>Define best value and discuss the processes to achieve it</li>
                            <li>Identify COR responsibilities and activities for the postaward orientation and development of the
                                COR Work Plan</li>
                            <li>Discuss the government's method of assuring quality through inspection and the COR's role</li>
                            <li>Explain the COR’s role and responsibilities in reviewing contractor invoices and recommending payment</li>
                            <li>Explain the COR's role in addressing contract remedies for different situations</li>
                            <li>Explain the role of the COR in evaluating a contractor's performance and contract closeout</li>
                        </ul>
                    </MDBCol>
                </MDBRow>


                <MDBRow center>
                    <MDBCol size="2" className={classes.btn} onClick={() => {this.props.history.push('/cor/pdf');}}>
                        <span><MDBIcon icon="hand-point-right" className='red-text px-2'/></span>
                        <span>
                            START LEARNING
                        </span>
                    </MDBCol>
                </MDBRow>
            </div>

        );
    }
}
