import React, { useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";

function Question() {
  const [isQuestionStarted, setIsQuestionStarted] = useState(false);
  const { isWebcamOpen } = useStore();

  return isWebcamOpen ? (
    isQuestionStarted ? (
      <QuestionBox>
        <div className="question">나는 지금 떨고있다</div>
        <div className="time">3</div>
      </QuestionBox>
    ) : (
      <QuestionStartBox
        onClick={() => setIsQuestionStarted(!isQuestionStarted)}
      >
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
  height: 10%;
  width: 20%;
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
  height: 10%;
  width: 40%;
  background-color: white;
  font-size: 40px;
  border-radius: 15px;

  .question {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ea4335;
    color: white;
    font-size: 50px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    padding-top: 4px;
  }
`;

export default Question;
