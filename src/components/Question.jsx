import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { delay } from "../constants/question";
import { useInterval } from "../helpers/useInterval";
import useStore from "../zustand/store";

function Question({ isQuestionStarted, setIsQuestionStarted }) {
  const { isWebcamOpen, questionList, randomQuestionList } = useStore();
  const [time, setTime] = useState(5);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    while (randomQuestionList.length < 10) {
      const randomQuestion = questionList.splice(
        Math.floor(Math.random() * questionList.length),
        1,
      )[0];

      randomQuestionList.push(randomQuestion);
    }
  }, []);

  useEffect(() => {
    if (isQuestionStarted === true) {
      time > 1 && setTimeout(() => setTime(time - 1), 1000);
    }
  }, [isQuestionStarted, time]);

  useInterval(() => {
    if (questionCount < 10) {
      setTimeout(() => {
        setQuestionCount(questionCount + 1);
        setTime(5);
      }, 2000);
    }
  }, delay);

  return isWebcamOpen ? (
    isQuestionStarted ? (
      questionCount < 10 ? (
        <>
          <QuestionBox>
            <div className="question">{randomQuestionList[questionCount]}</div>
            <div className="time">{time}</div>
          </QuestionBox>
          <ProgressBox>진행률 {questionCount + 1}0%</ProgressBox>
        </>
      ) : (
        <></>
      )
    ) : (
      <QuestionStartBox onClick={() => setIsQuestionStarted(true)}>
        <div>질문시작</div>
      </QuestionStartBox>
    )
  ) : (
    <></>
  );
}

const QuestionStartBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 12%;
  width: 20%;
  padding: 20px 0;
  background-color: white;
  font-size: 40px;
  border-radius: 15px;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const QuestionBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 12%;
  width: 60%;
  background-color: white;
  padding: 0 20px;
  font-size: 40px;
  border-radius: 15px;

  .question {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    width: 80%;
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ea4335;
    color: white;
    font-size: 50px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding-top: 4px;
  }
`;

const ProgressBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5%;
  right: 15%;
  width: 13%;
  background-color: white;
  color: black;
  padding: 20px;
  font-size: 35px;
  border-radius: 15px;
`;

export default Question;
