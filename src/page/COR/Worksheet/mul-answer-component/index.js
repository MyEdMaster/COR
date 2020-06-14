import React from 'react';


import {url} from "../../../../tool/fetch-help";
import classes from './index.module.css'
import {cancelSyn, handleSyn} from "../../../RRH/Component/speech-syn";
import {MDBBtn, MDBCard, MDBIcon, MDBModal, MDBModalBody} from "mdbreact";

export class MulAnswerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer:'',
            render:1,
            hint:'',
            feedback:'',
            count:[0,1,2,3,4,5,6,7,8,9],
            answered:[],
            modal2: false,
            array:[],
            array2:[],
            rest:[],
            finish:false,
            done:false
        };
        this.answerList=[
            'Quickly and easily assembled, taken apart and packed for transportation',
            'Able to be assembled and put into operating condition in about 1 hour',
            'Carries two persons (combined weight: 350 pounds)',
            'Carries fuel for 125-mile flight',
            'Speed: 40 mph',
            'Able to serve in any country (for field service)',
            'Simple and transportable starting device',
            'Able to land in fields without a specially prepared spot and without damaging its structure',
            'Device permits safe descent in case of an accident',
            'Simple in construction and operation'
        ];


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
    isFinsh = ()=>{
        return this.state.array2.length === 10;
    };
    // finishHint = ()=>{
    //     if(this.isFinsh()){
    //         this.setState({
    //             hint:''
    //         })
    //     }
    // }
    answeredArray = (id, text)=>{

        if(this.state.array.indexOf(id) === -1){
            this.state.array.push(id);
            this.state.array2.push(text)
        }
        else if(this.state.array.indexOf(id) > -1){
            this.setState({
                hint:'It was already answered. Please try other answers'
            })
        }
    };
    restArray = (count) => {
        let tmp=[];
        for (let i=0; i<count.length;i++){
            tmp.push(this.answerList[count[i]])
        }
        this.setState({
            rest:tmp,
            hint:'',
            feedback:''
        })
    };

    updateCount = (id, count)=>{
        for (let i=0; i<count.length;i++){
            if (count[i] === id){
                count.splice(i, 1);
            }
        }
        this.setState({
            count:count
        });
        // return array
    };
    updateHint=(array)=>{
        let tmp=[];
        for (let i=0; i<array.length;i++){
            tmp.push(array[i]+1)
        }
        return tmp.join(',')
    };
    updateAnswered=(id,array)=>{
        if(array.indexOf(id) === -1){
            array.push(id);
        }

        return array
    };
    scoreRange=(rate)=>{
        if(rate>0.9) return '1';
        else if(rate>0.78) return '2';
        else if(rate>0.55) return '3';
        else return '4';
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
                question_id:3,
                answer:value,
            })
        };
        fetch(`${url}/question3`,option)
            .then(response=>response.json())
            .then(answer=>{
                this.setState({
                    backendjson:answer,
                    done:false
                });

                let type = this.scoreRange(answer[0][0]);
                switch (type) {
                    case '1':
                        let hint;
                        if(this.state.array.indexOf(answer[0][3]) > -1){
                            hint='It was already answered. Please try other answers'
                        }
                        else hint='Yes! You got it.';
                        this.answeredArray(this.state.backendjson[0][3],this.answerList[this.state.backendjson[0][3]]);
                        this.updateCount(this.state.backendjson[0][3], this.state.count);
                        this.setState({
                            feedback:'',
                            // index:this.state.index + 1,
                            type:1,
                            hint:hint,
                            answer:'',
                            // count: this.updateCount(parseInt(answer[0][3]), this.state.count),
                            // answered: this.updateAnswered(parseInt(answer[0][3]), this.state.answered)
                        });
                        //handleSyn('Yes! You got it.');
                        // if(this.state.index <= this.state.backend.content.length){
                        //     //handleSyn(this.state.backend.content[this.state.index].question.replace('?', '.'))
                        // }
                        break;
                    case '2':
                        this.setState({
                            hint:'Is that what you are answering?',
                            feedback:answer[0][2],
                            type:2
                        });
                        //handleSyn('Is that what you are answering');
                        //handleSyn((answer.answer.replace('?', '.')));

                        break;
                    case '3':
                        this.answeredArray(this.state.backendjson[0][3],this.answerList[this.state.backendjson[0][3]]);
                        this.updateCount(this.state.backendjson[0][3], this.state.count);
                        this.setState({
                            feedback:'The right answer is:  '+answer[0][2],
                            hint:'Wrong answer',
                            type:3
                        });
                        break;
                    case '4':
                        this.setState({
                            feedback:'',
                            hint:'This is not a correct answer. Answer all you can one by one and then press "Done"',
                            type:4
                        });
                        //handleSyn('No, the answer is');
                        //handleSyn((answer.answer.replace('?', '.')));
                }
            })
    };
    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            answer:''
        });
    };


    render() {
        // console.log(this.state.count);
        // console.log(this.state.answered);
        cancelSyn();

        if (this.state.render === 1){
            return (
                <div  style={{padding: '0 5px', marginTop:'5px'}}>
                    {

                        this.state.array2.map((item, index)=>{
                        return(
                            <div>
                                    {index+1})  {item}
                            </div>
                        )

                    })}
                    {
                        !this.isFinsh()?(
                            <div>
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
                                    value={this.state.answer}
                                />
                                <div className={classes["align-end"]}>
                                    <button
                                        className={classes.btn}
                                        onClick={()=>{
                                            this.searchAnswer(this.state.answer);
                                        }}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className={`${classes.btn} ml-2`}
                                        onClick={()=>{
                                            this.restArray(this.state.count)
                                            this.setState({
                                                done:true,
                                                answer:''
                                            })
                                        }}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        ):(<div className={classes.hint2}>
                            {/*{this.finishHint()}*/}
                            All answers have been answered.
                        </div>)
                    }

                    <div className={classes.hint2}>
                        {this.state.hint}
                    </div>
                    <div className={classes.answer}>
                        {this.state.feedback}
                        {this.state.done?(
                            <div>
                                <div>You missed these standards: </div>
                                {
                                    this.state.rest.map((item, index)=>{
                                        return(
                                            <div>
                                                {index+1})  {item}
                                            </div>
                                        )
                                    })}
                            </div>
                        ):(null)}
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
                                            answer:'',
                                            // count: this.updateCount(parseInt(this.state.backendjson[0][3]), this.state.count),
                                            // answered: this.updateAnswered(parseInt(this.state.backendjson[0][3]), this.state.answered)
                                        });
                                        this.answeredArray(this.state.backendjson[0][3],this.answerList[this.state.backendjson[0][3]]);
                                        this.updateCount(this.state.backendjson[0][3], this.state.count);
                                    }}
                                >
                                    <MDBIcon icon="check" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a" floating className="red lighten-1" size='1x'
                                    onClick={()=>{
                                        this.setState({
                                            feedback:'The right answer is:  '+ this.answerList[this.state.backendjson[0][3]]+'. You can input your next answer in the box',
                                            // hint:'You can continue ',
                                            // count: this.updateCount(parseInt(this.state.backendjson[0][3]), this.state.count),
                                            // answered: this.updateAnswered(parseInt(this.state.backendjson[0][3]), this.state.answered),
                                            type:3,
                                            answer:''
                                        });
                                        this.answeredArray(this.state.backendjson[0][3],this.answerList[this.state.backendjson[0][3]]);
                                        this.updateCount(this.state.backendjson[0][3], this.state.count);
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
