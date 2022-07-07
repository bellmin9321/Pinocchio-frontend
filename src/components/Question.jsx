import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";

function Question({ isQuestionStarted, setIsQuestionStarted }) {
  const { isWebcamOpen } = useStore();
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (isQuestionStarted === true) {
      time > 0 && setTimeout(() => setTime(time - 1), 1000);
    }
  }, [time, isQuestionStarted]);

  return isWebcamOpen ? (
    isQuestionStarted ? (
      <QuestionBox>
        <div className="question">나는 지금 떨고있다</div>
        <div className="time">{time}</div>
      </QuestionBox>
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
  width: 40%;
  background-color: white;
  font-size: 40px;
  border-radius: 15px;

  .question {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
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

export default Question;
