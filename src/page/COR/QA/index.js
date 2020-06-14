import React from 'react';
import classes from './index.module.css'


import {MDBBtn, MDBCard, MDBCol, MDBIcon, MDBModalBody, MDBRow} from "mdbreact";
import {handleSyn} from "../../RRH/Component/speech-syn";
import {cancelSyn} from "../../RRH/Component/speech-syn";
import {url} from "../../../tool/fetch-help";
import Joyride from 'react-joyride';
import {handleSysAskQues} from "../../../tool/report_system";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

export class CORQA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listening: false,
            speechState:'Click the microphone icon to speak...',
            // speechState:'Hold down the CTRL to speak...',
            hints:'',
            backendjson:'',
            backend:'',
            question:'',
            answer:'',
            type:0,
            tag:'',
            render:0,
            index:0,
            feedback:'',
            btn:1,
            next:0,
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
        this.toggleListen = this.toggleListen.bind(this);
        this.handleListen = this.handleListen.bind(this)
    }
    componentDidMount() {
        // document.addEventListener("keydown", this.onKeyDown);
        // document.addEventListener("keyup", this.onKeyUp);
        const option={
            method:'GET',
            headers: {
                'content-type': 'application/json',
            }
        };
        fetch(`${url}/CheckAnswer/2/get_question`,option)
            .then(response=>response.json())
            .then(question=>{
                this.setState({
                    backend:question,
                    render:1
                });
                handleSyn(this.state.backend.content[0].question.replace('?', '.'))
            })
    }
    componentWillMount() {
        // document.removeEventListener("keydown", this.onKeyDown);
        // document.removeEventListener("keyup", this.onKeyUp);
        handleSyn(this.state.answer)
    }

    scoreRange=(rate)=>{
        if(rate>0.9) return '1';
        else if(rate>0.8) return '2';
        else if(rate>0.5) return '3';
        else return '4';
    };
    nextBtn = ()=>{
        return(
            <button
                onClick={()=>{
                    cancelSyn();
                    this.setState({
                        index:this.state.index + 1,
                        type:'0'
                    });

                    if(this.state.index < this.state.backend.content.length - 1){
                        handleSyn('The next question is');
                        handleSyn(this.state.backend.content[this.state.index+1].question.replace('?', '.'))
                    }
                }}
                className={classes.btn2}
            >
                Next Question
            </button>
        )
    };
    hint = (type) =>{
        switch(type){
            case '1':
                return(
                    <div className='py-1 px-3 '>
                        <p className={classes.fb2}>{this.state.tag}</p>
                        <p className={classes.fb2}>{this.state.feedback}</p>
                    </div>
                );
            case '2':
                return(
                    <div className='py-1 px-3 '>
                        <p className={classes.fb2}>{this.state.tag}</p>
                        <p className={classes.fb2}>{this.state.feedback}</p>
                        {this.state.btn ===1?(
                            <div className="d-flex justify-content-center align-items-center">
                                <MDBBtn
                                    tag="a" floating className="green"
                                    onClick={()=>{
                                        cancelSyn();
                                        this.setState({
                                            index:this.state.index + 1,
                                            btn:0,
                                            answer:'',
                                            tag:'Yes, you got it',
                                            feedback:'',
                                        });
                                        handleSyn('Yes, you got it.');

                                        if(this.state.index < this.state.backend.content.length - 1){
                                            handleSyn('The next question is');
                                            handleSyn(this.state.backend.content[this.state.index+1].question.replace('?', '.'))
                                        }
                                    }}
                                >
                                    <MDBIcon icon="check" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a" floating className="red lighten-1"
                                    onClick={()=>{
                                        cancelSyn();
                                        this.setState({
                                            tag:'No',
                                            btn:0,
                                            next:1,
                                            feedback:this.state.backendjson[3],
                                            // index:this.state.index + 1,
                                            answer:'',
                                        });
                                        handleSyn('No, the answer is');
                                        handleSyn((this.state.backendjson[3].replace('?', '.')));
                                    }}
                                >
                                    <MDBIcon icon="times" />
                                </MDBBtn>
                            </div>
                        ):(null)}

                        {this.state.next?this.nextBtn():null}
                    </div>
                );

            case '3':
                return(
                    <div className='py-1 px-3 '>
                        <p className={classes.fb2}>{this.state.tag}</p>
                        {/*<p className={classes.fb2}>{this.state.feedback}</p>*/}
                    </div>
                );
            case '4':
                return(
                    <div className='py-1 px-3 '>
                        <p className={classes.fb2}>{this.state.tag}</p>
                        <p className={classes.fb2}>{this.state.feedback}</p>
                        {this.nextBtn()}
                    </div>
                );


        }
    };
    searchAnswer=(value)=>{
        cancelSyn();
        // console.log(this.state.backend.content[this.state.index].id);
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
        fetch(`${url}/CheckAnswer/2`,option)
            .then(response=>response.json())
            .then(answer=>{
                this.setState({
                    backendjson:answer[0]
                });
                handleSysAskQues(answer[0],this.state.answer,this.state.backend.content[this.state.index].question);
                let rate = parseFloat(answer[0][0]);
                console.log(rate);
                let type = this.scoreRange(rate);
                switch (type) {
                    case '1':
                        this.setState({
                            feedback:'',
                            index:this.state.index + 1,
                            type:'1',
                            answer:'',
                            tag:'Yes! You got it.'
                        });
                        handleSyn('Yes! You got it.');

                        if(this.state.index < this.state.backend.content.length){
                            handleSyn('Next question is');
                            handleSyn(this.state.backend.content[this.state.index].question.replace('?', '.'))
                        }
                        break;
                    case '2':
                        this.setState({
                            tag:'Is that what you are answering?',
                            btn:1,
                            feedback:answer[0][3],
                            type:'2'
                        });
                        handleSyn('Is that what you are answering');
                        handleSyn((answer[0][3].replace('?', '.')));

                        break;
                    case '3':
                        this.setState({
                            tag:'Could you rephrase your answer',
                            feedback:answer[0][3],
                            type:'3'
                        });
                        handleSyn('Could you rephrase your answer');


                        break;
                    case '4':
                        this.setState({
                            feedback:answer[0][3],
                            tag:'No.',
                            answer:'',
                            type:'4'
                        });
                        handleSyn('No, the answer is');
                        handleSyn((answer[0][3].replace('?', '.')));
                }
            })
    };

    //--------------Speech Recognition--------------
    // onKeyDown = (e) => {
    //     switch( e.keyCode) {
    //         case 17:
    //             this.toggleListen();
    //             break
    //     }
    // };
    // onKeyUp = (e) => {
    //     switch( e.keyCode) {
    //         case 17:
    //             this.toggleListen();
    //             break
    //     }
    // };
    toggleListen() {
        cancelSyn();
        this.setState({
            listening: !this.state.listening
        }, this.handleListen)
    }

    handleListen() {

        // console.log('listening?', this.state.listening)

        if (this.state.listening) {
            recognition.start();
            recognition.onend = () => {
                this.setState({
                    speechState:'...continue listening...'
                });
                recognition.start()
            }

        } else {
            recognition.stop();
            recognition.onend = () => {
                this.setState({
                    // speechState:'Hold down the CTRL to speak...'
                    speechState:'Click the microphone icon to speak...'
                });
            }
        }

        recognition.onstart = () => {
            this.setState({
                // speechState:'Listening...Release the CTRL to stop'
                speechState:'Listening...click the icon to stop'
            });
        };

        let finalTranscript = '';
        recognition.onresult = event => {
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
            }

            this.setState({
                answer:finalTranscript
            });
            document.getElementById('interim').innerHTML = interimTranscript;
            document.getElementById('final').value = finalTranscript;

            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ');
            const stopCmd = transcriptArr.slice(-3, -1);
            console.log('stopCmd', stopCmd);

            if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
                recognition.stop();
                recognition.onend = () => {
                    console.log('Stopped listening per command');
                    const finalText = transcriptArr.slice(0, -3).join(' ');
                    document.getElementById('final').value = finalText
                }
            }
        }

        //-----------------------------------------------------------------------

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }

    }

    render() {
        // cancelSyn();
        if (this.state.render === 1){
            const { steps } = this.state;
            return (
                <div className={`${classes.body} align-content-center w-100 h-100 text-center`}>
                    {/*{cancelSyn()}*/}
                    <Joyride
                        steps={steps}
                        continuous={true}
                        scrollToFirstStep={true}
                        scrollToSteps={false}
                        styles={{
                            options: {
                                primaryColor: '#CC0000',
                                zIndex: 1000,
                            }
                        }}
                    />

                    <div className="d-flex align-items-baseline justify-content-center">
                        <div className={classes.title1}>
                            Assessment
                        </div>
                    </div>
                    <MDBRow>
                        <MDBCol size="2">

                        </MDBCol>
                        <MDBCol size="8">
                            <div className={classes.ph}>
                                Great! Now you finish the course and we have some question for you to answer.
                            </div>
                            <br/>

                            <div className={classes.border} style={{borderWidth:'1px'}}>

                                <p className={`${classes.ph}`}>
                                    {this.state.index < this.state.backend.content.length?
                                        this.state.backend.content[this.state.index].question
                                        :'All questions have been done!'}
                                </p>

                                <div className="d-flex justify-content-center align-content-start mt-3 mb-3">
                                    <div className="flex-grow-1">
                                        <form
                                            autoComplete="off"
                                            onSubmit = {(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                        <input
                                            id='final'
                                            className={`form-control form-control-lg input`}
                                            placeholder="Answer question here"
                                            style={{
                                                borderStyle:'solid',
                                                borderWidth:'1px',
                                                borderColor:'#CC0000',
                                                borderRadius:'15px',
                                                fontFamily:'\'Rajdhani\', sans-serif',
                                                fontSize:'22px',
                                            }}
                                            value={this.state.answer}
                                            onChange={(e) => {
                                                const str=e.target.value;
                                                this.setState({
                                                    answer: str
                                                });
                                            }}

                                            onKeyDown={(e) =>{
                                                if(e.keyCode===13){
                                                    if(this.state.answer===''){
                                                        alert('Please input your answer')
                                                    }
                                                    else{
                                                        this.searchAnswer(this.state.answer)
                                                    }}
                                            }}
                                        />
                                        </form>
                                    </div>
                                    <div className="ml-3">
                                        <MDBBtn
                                            tag="a" floating color="red" style={{margin:'6px'}}
                                            onClick={()=>{
                                                if(this.state.answer===''){
                                                    alert('Please input your answer')
                                                }
                                                else{
                                                    this.searchAnswer(this.state.answer)
                                                }
                                            }}
                                        >
                                            <MDBIcon icon="question" />
                                        </MDBBtn>
                                    </div>
                                    <div className="ml-1">
                                        <MDBBtn
                                            tag="a" floating color="white" style={{margin:'6px'}}
                                            onClick={this.toggleListen}
                                        >
                                            <MDBIcon icon="microphone" className='red-text'/>
                                        </MDBBtn>

                                    </div>
                                </div>
                                <div>
                                    <div className={classes.body2}>{this.state.speechState}</div>
                                    <div id='interim'></div>
                                </div>
                                <div className="mt-3">
                                    <MDBCard
                                        size="8"
                                        text="white"
                                        className="w-100 grey lighten-4"
                                        style={{boxShadow:'none', borderRadius:'0px'}}
                                    >
                                        {this.hint(this.state.type)}

                                    </MDBCard>
                                </div>
                            </div>
                            <br/>
                        </MDBCol>

                    </MDBRow>

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
