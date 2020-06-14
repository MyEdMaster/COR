import React from 'react';


import {url} from "../../../../tool/fetch-help";
import classes from './index.module.css'
import {MDBBtn, MDBIcon} from "mdbreact";
import {cancelSyn} from "../../../RRH/Component/speech-syn";

export class AnswerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer:'',
            render:1,
            hint:'',
            feedback:''

        };
    }
    // componentDidMount() {
    //     const option={
    //         method:'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //         }
    //     };
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
    scoreRange=(rate)=>{
        if(rate>0.9) return '1';
        else if(rate>0.78) return '2';
        // else if(rate>0.55) return '3';
        else return '3';
    };

    searchAnswer=(value)=>{
        //cancelSyn()
        //console.log(this.state.backend.content[this.state.index].id);
        const option={
            method:'POST',
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify({
                question_id:this.props.id,
                answer:value,
            })
        };
        fetch(`${url}/CheckAnswer/1`,option)
            .then(response=>response.json())
            .then(answer=>{
                this.setState({
                    backendjson:answer
                });
                let type = this.scoreRange(answer[0][0]);
                switch (type) {
                    case '1':
                        this.setState({
                            feedback:'',
                            // index:this.state.index + 1,
                            type:1,
                            hint:'Yes! You got it.'
                        });
                        //handleSyn('Yes! You got it.');
                        // if(this.state.index <= this.state.backend.content.length){
                        //     //handleSyn(this.state.backend.content[this.state.index].question.replace('?', '.'))
                        // }
                        break;
                    case '2':
                        this.setState({
                            hint:'Is that what you are answering?',
                            feedback:answer[0][3],
                            type:2
                        });
                        //handleSyn('Is that what you are answering');
                        //handleSyn((answer.answer.replace('?', '.')));

                        break;
                    case '3':
                        this.setState({
                            feedback:'The right answer is:  '+answer[0][3],
                            hint:'Wrong answer',
                            type:3
                        });
                        break;
                    case '4':
                        this.setState({
                            feedback:'',
                            hint:'I cannot understand. Could you rephrase your words?',
                            type:4
                        });
                        //handleSyn('No, the answer is');
                        //handleSyn((answer.answer.replace('?', '.')));
                }
            })
    };



    render() {
        if (this.state.render === 1){
            return (
                <div  style={{padding: '0 5px', marginTop:'5px'}}>
                     <textarea
                         placeholder="Answer here"
                         className="form-control"
                         style={{fontSize: '18px',borderColor:'#CC0000'}}
                         rows="3"
                         onChange={(e) => {
                             this.setState({
                                 answer: e.target.value
                             });
                         }}
                     />
                    <div className={classes["align-end"]}>
                        <button
                            className={classes.btn}
                            onClick={()=>{this.searchAnswer(this.state.answer)}}
                        >
                            Submit
                        </button>
                    </div>

                    {/*<div className={classes.hint}>Feedback</div>*/}
                    <div className={classes.hint2}>
                        {this.state.hint}
                    </div>
                    <div className={classes.answer}>
                        {this.state.feedback}
                    </div>
                    <div>
                        {this.state.type===2?(
                            <div className='text-center'>
                                <MDBBtn
                                    tag="a" floating className="green" size='1x'
                                    onClick={()=>{
                                        this.setState({
                                            feedback:'',
                                            // index:this.state.index + 1,
                                            type:1,
                                            hint:'Yes! You got it.',
                                        });
                                    }}
                                >
                                    <MDBIcon icon="check" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a" floating className="red lighten-1" size='1x'
                                    onClick={()=>{
                                        this.setState({
                                            feedback:'The right answer is:  '+this.state.backendjson[0][3],
                                            hint:'Wrong answer',
                                            type:3
                                        });
                                    }}
                                >
                                    <MDBIcon icon="times" />
                                </MDBBtn>
                            </div>

                        ):(
                            null
                        )}
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
