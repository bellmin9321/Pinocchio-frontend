import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ModalResult from "./ModalResult";
import WebcamVoiceRecognition from "./WebcamVoiceRecognition";

import useStore from "../zustand/store";
import { QUESTION_COUNTDOWN, TOTAL_QUESTIONS } from "../constants";

function WebcamQuestion({ isQuestionStarted, setIsQuestionStarted }) {
  const {
    isWebcamOpen,
    questionList,
    randomQuestionList,
    questionCount,
    hardcoreList,
    isHardcoreSelected,
  } = useStore();
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
        modalSize: "M",
        isQuestionDone: true,
      });
    }
  }, [questionCount]);

  return isWebcamOpen ? (
    isQuestionStarted ? (
      questionCount < TOTAL_QUESTIONS ? (
        <>
          <ProgressBox>진행률 {questionCount}0%</ProgressBox>
          <QuestionBox>
            <div className="question">
              {isHardcoreSelected
                ? hardcoreList[questionCount]
                : randomQuestionList[questionCount]}
            </div>
            <div className="time">{time}</div>
          </QuestionBox>
          <WebcamVoiceRecognition isQuestionStarted={isQuestionStarted} />
        </>
      ) : (
        <ModalResult />
      )
    ) : (
      <>
        <QuestionStartBox onClick={() => setIsQuestionStarted(true)}>
          <div>질문 시작</div>
        </QuestionStartBox>
        <HardcoreBox
          style={
            isHardcoreSelected === true
              ? { backgroundColor: "black" }
              : { backgroundColor: "white" }
          }
          onClick={() =>
            useStore.setState({ isHardcoreSelected: !isHardcoreSelected })
          }
        >
          <div>HARDCORE</div>
        </HardcoreBox>
      </>
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

const HardcoreBox = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 12%;
  transform: translateX(220px);
  width: 10%;
  padding: 10px 0;
  font-size: 20px;
  color: red;
  border: none;
  border-radius: 5px;
  z-index: 15;
  cursor: pointer;
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
  padding: 15px;
  font-size: 30px;
  border-radius: 15px;
  z-index: 15;
`;

export default WebcamQuestion;
