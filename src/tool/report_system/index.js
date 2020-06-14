//const url  = 'http://127.0.0.1:8080';
// const url  = 'http://47.252.83.229:8081';
const url = 'https://admin.alistempirefoundation.org';
const formatTime = (timestamp)=>{
    const date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    console.log(Y+M+D+h+m+s);
    return (Y+M+D+h+m+s)

};
const quesList=[
    'What is a requirements document?',
    'What is a statement of work?',
    'What does SOW stand for?',
    ' What is a statement of objectives?',
    'What does SOO stand for?',
    'When do you use an SOW vs an SOO?',
    'What is a performance work statement?',
    'What does PWS stand for?',
    'What makes an outcome measurable?',
    'What is a specification?',
    'What\'s the difference between a specification and an outcome?',
    'Why do we have requirements documents?',
    'What is a statement of objectives?',
    'Which gives the offeror more flexibility, a statement of work or a statement of objectives?',
    'What is a performance work statement?',
    'It you are writing a performance work statement for an airplane, is the requirement "The plane should not require high speeds in order for take off" a measurable outcome?',
    'What would be a better way to express the term high speeds in the performance work statement, so that it would be a measurable outcome?',
    'what do we want to accomplish as the end result of this contract?',
    'what tasks must be accomplished to give us the end result?',
    'how much error will we accept?',
    'how will we determine that success has been achieved?',
    'how will we reward good performance or address poor performance?'
];
const scoreRangeAsk=(rate)=>{
    if(rate>0.9) return '1';
    else if(rate>0.76) return '2';
    // else if(rate>0.5) return '3';
    else return '3';
};
const scoreRangeAssess=(rate)=>{
    if(rate>0.9) return '1';
    else if(rate>0.8) return '2';
    else if(rate>0.5) return '3';
    else return '4';
};
export const handleStuAskQues=(ele, content) =>{
    let rate = parseFloat(ele[0]);
    let isCovered,question_content,question_id,system_answer;
    let timestamp = new Date().getTime();
    if(rate>0.76){
        isCovered = 1;
        question_content = ele[1];
        for (let i =0;i<quesList.length;i++){
            if (quesList[i] == ele[1]){
                question_id = i
            }
        }
        system_answer = ele[2]

    }
    else{
        isCovered = 0;
        question_content ='';
        system_answer = '';
        question_id = -1;
    }
    const option={
        method:'POST',
        headers: {
            'content-type': 'application/json',
        },
        body:JSON.stringify({
            //id:,
            content:content,
            isCovered:isCovered,
            rate:rate,
            question_content:question_content,
            question_id:question_id,
            system_answer:system_answer,
            time:formatTime(timestamp)
        })
    };
    fetch(`${url}/student_ask_question`,option)
        .then(response=>response.json())
        .then(res=>{
            console.log('fetch OK')
        });
};
export const handleSysAskQues=(ele, content,question) =>{
    let rate = parseFloat(ele[0]);
    let student_answer = content;
    let question_content,question_id,right_answer,isRight;
    let timestamp = new Date().getTime();
    for (let i=0;i<quesList.length;i++){
        //console.log(quesList[i]);
        if (quesList[i] == question){
            question_id = i
        }
    }
    question_content = ele[1];
    if(rate>0.8){
        isRight = 1;
        right_answer = ele[3]
    }
    else{
        isRight = 0;
        right_answer = '';
    }
    const option={
        method:'POST',
        headers: {
            'content-type': 'application/json',
        },
        body:JSON.stringify({
            // id:,
            question_content:question_content,
            question_id:question_id,
            student_answer:student_answer,
            right_answer:right_answer,
            rate:rate,
            isRight:isRight,
            time:formatTime(timestamp)
        })
    };
    fetch(`${url}/system_ask_question`,option)
        .then(response=>response.json())
        .then(res=>{
            console.log('fetch OK')
        });
};

