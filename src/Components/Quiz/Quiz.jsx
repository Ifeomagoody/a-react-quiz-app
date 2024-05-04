import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from '../../assets/data';

const Quiz = () => {
  let [index, setIndex] = useState(0); //the 0 means that it is on the first question
  let [question, setQuestion] = useState(data[index]); //the first question is loaded if the index is 0  // for the {index + 1} if the index is 0 it will display question No.1
  let [lock, setLock] = useState (false)
  let [scroll, setScroll] = useState(0)
  let [result, setResult] = useState(false)

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let Option5 = useRef(null);
  

  let option_array = [Option1, Option2, Option3, Option4, Option5];
                  //to check if the event clicked is the same as the answer
 const checkAns = (e, ans) => {  //function to check if the answer is correct
  
  if (lock === false) {
    if (question.ans === ans) {
      e.target.classList.add("correct!");
      setLock(true)    //this is so that a particular option is locked hence we won't be able to pick two answers 
      setScore(prev => prev + 1) //this is to increase the next by 1
    } else {
      e.target.classList.add("wrong!");
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct")

    }
  }
  }
 

    const next = () => {
      if(lock === true) {
        if (index === data.length-1) {
          setResult(true)
          return 0
        }
        setIndex(++index)  //the index moves from 0 to +1
        setQuestion(data[index])  //the question is the same as the index  
        setLock(false)  //if the lock is wrong it moves to the options below
        option_array.map((option) => {
          option.current.classList.remove("wrong")   //this removes the cursor from the option that was clicked
          option.current.classList.remove("correct")
          return null
        })
      }
    }

    const reset = () => {
      setIndex(0)
      setQuestion(data[0])
      setScore(0)
      setLock(false)
      setResult(false)
    }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? 
        <></>: 
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
            <li
              ref={Option5}
              onClick={(e) => {
                checkAns(e, 5);
              }}
            >
              {question.option5}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
           {result? <>
            <h2>You scored {score} out of {data.length} </h2>
            <button onClick={reset}>Reset</button>
            </>:<></>}
        </>
      }
     
     
      <div className="index1">Designed with 💖 by Ifeoma</div>
    </div>
  );
};

export default Quiz;
