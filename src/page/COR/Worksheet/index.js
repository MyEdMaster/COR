import React from 'react';

import classes from './index.module.css'


import {MDBBtn, MDBCard, MDBCol, MDBIcon, MDBModalBody, MDBRow} from "mdbreact";
import {cancelSyn, handleSyn} from "../../RRH/Component/speech-syn";

import {url} from "../../../tool/fetch-help";
import {AnswerComponent} from "./answer-component";
import {MulAnswerComponent} from "./mul-answer-component";
// import Joyride from 'react-joyride';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

export class CORWorkSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listening: false,
            speechState:'Click to start...',
            hints:'',
            backendjson:'',
            backend:'',
            question:'',
            answer:'',
            type:0,
            tag:'',
            render:1,
            index:0,
            feedback:'',
            steps: [
                {
                    target: ".question",
                    content: "We ask your questions to make sure if you understand our story. Once your answer is right, there will be a new question"
                },
                {
                    target: ".input",
                    content: "Input your answer here"
                }
            ]
        };
    }
    // componentDidMount() {
    //     const option={
    //         method:'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //         }
    //     }
    //     fetch(`${url}/feedback/CN/question`,option)
    //         .then(response=>response.json())
    //         .then(question=>{
    //             this.setState({
    //                 backend:question,
    //                 render:1
    //             })
    //         })
    // }
    // componentWillMount() {
    //
    // }


    searchAnswer=(value)=>{
        //cancelSyn()
        console.log(this.state.backend.content[this.state.index].id)
        const option={
            method:'POST',
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify({
                question_id:this.state.backend.content[this.state.index].id,
                answer:value,
                // "question":this.state.backend.content[this.state.index].id,
                // "answer":value
            })
        };
        fetch(`${url}/analyse_answer/a2`,option)
            .then(response=>response.json())
            .then(answer=>{
                this.setState({
                    backendjson:answer
                });
                // let rate = parseFloat(answer.score);
                switch (answer.type) {
                    case '1':
                        this.setState({
                            feedback:'',
                            index:this.state.index + 1,
                            type:1,
                            tag:'Yes! You got it.'
                        });
                        handleSyn('Yes! You got it.');
                        if(this.state.index <= this.state.backend.content.length){
                            handleSyn(this.state.backend.content[this.state.index].question.replace('?', '.'))
                        }
                        break;
                    case '2':
                        this.setState({
                            tag:'Is that what you are answering?',
                            feedback:answer.answer,
                            type:2
                        });
                        handleSyn('Is that what you are answering');
                        handleSyn((answer.answer.replace('?', '.')));

                        break;
                    case '3':
                        this.setState({
                            feedback:answer.answer,
                            tag:'No.',
                            type:3
                        });
                        handleSyn('No, the answer is');
                        handleSyn((answer.answer.replace('?', '.')));
                }
            })
    };

    //--------------Speech Recognition--------------

    render() {
        cancelSyn();
        if (this.state.render === 1){
            const { steps } = this.state;
            //console.log(this.state.backend.content[0])
            return (
                <div className='cell-wall'>
                    <div className='cell-membrane mb-5'>
                        <div className={classes.title}>TABLE: PERFORMANCE REQUIREMENTS SUMMARY (PRS)</div>
                        <div className='d-flex'>
                            <div className={classes.form1}>
                                <div className={classes.formtitle}>Requirement</div>
                                <div className={classes.question}>What do we want to accomplish as the end result of this contract?</div>
                                <AnswerComponent id={0}/>

                            </div>
                            <div className={classes.form1}>
                                <div className={classes.formtitle}>Tasks and Critical Subtasks</div>
                                <div className={classes.question}>What tasks must be accomplished to give us the end result?</div>
                                    <AnswerComponent id={1}/>

                                </div>
                                <div className={classes.form1}>
                                    <div className={classes.formtitle}>
                                        Performance Standards  <div className={classes.formtitle2}>
                                        (There are 10 standard. Enter them one at a time, in any order, and press "submit" after each one.)
                                    </div>
                                    </div>
                                    <div className={classes.question}>What should the standard be for completeness, reliability, accuracy, timeliness, customer satisfaction, quality, and/or cost?</div>
                                    <MulAnswerComponent/>
                                </div>
                                <div className={classes.form1}>
                                    <div className={classes.formtitle}>Acceptable Quality Level</div>
                                    <div className={classes.question}>How much error will we accept?</div>
                                    <AnswerComponent id={2}/>
                                </div>
                                <div className={classes.form1}>
                                    <div className={classes.formtitle}>Method of Monitoring</div>
                                    <div className={classes.question}>How will we determine that success has been achieved?</div>
                                    <AnswerComponent id={3}/>
                                </div>
                                <div className={classes.form1}>
                                    <div className={classes.formtitle}>Incentives</div>
                                    <div className={classes.question}>How will we reward good performance or address poor performance?</div>
                                    <AnswerComponent id={4}/>
                                </div>
                            <div className={classes.form2}>
                                <div className={classes.formtitle}>Disincentives</div>
                                <div className={classes.question}>How will we reward good performance or address poor performance?</div>
                                <AnswerComponent id={5}/>
                            </div>

                            </div>
                        </div>

                    </div>
                    );
                    }
                    else{
                    return(
                    null
                    );
                }
                    }
                    }
