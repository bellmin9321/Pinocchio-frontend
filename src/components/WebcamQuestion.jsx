import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { QUESTION_COUNTDOWN, TOTAL_QUESTIONS } from "../constants";
import useStore from "../zustand/store";
import ModalResult from "./ModalResult";

function Question({ isQuestionStarted, setIsQuestionStarted }) {
  const { isWebcamOpen, questionList, randomQuestionList, questionCount } =
    useStore();
  const [time, setTime] = useState(5);

  useEffect(() => {
    while (randomQuestionList.length < TOTAL_QUESTIONS) {
      const randomQuestion = questionList.splice(
        Math.floor(Math.random() * questionList.length),
        1,
      )[0];

      randomQuestionList.push(randomQuestion);
    }
  }, []);

  useEffect(() => {
    if (isQuestionStarted === true) {
      if (time === 0) {
        useStore.setState({ questionCount: questionCount + 1 });

        return setTime(5);
      }

      setTimeout(() => setTime(time - 1), QUESTION_COUNTDOWN);
    }
  }, [isQuestionStarted, time]);

  useEffect(() => {
    if (questionCount === TOTAL_QUESTIONS) {
      useStore.setState({
        modalSize: "LARGE",
        isQuestionDone: true,
      });
    }
  }, [questionCount]);

  return isWebcamOpen ? (
    isQuestionStarted ? (
      questionCount < TOTAL_QUESTIONS ? (
        <>
          <QuestionBox>
            <div className="question">{randomQuestionList[questionCount]}</div>
            <div className="time">{time}</div>
          </QuestionBox>
          <ProgressBox>진행률 {questionCount}0%</ProgressBox>
        </>
      ) : (
        <ModalResult />
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
  z-index: 15;

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
  z-index: 15;

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
  width: 15%;
  background-color: white;
  color: black;
  padding: 20px;
  font-size: 35px;
  border-radius: 15px;
  z-index: 15;
`;

export default Question;
