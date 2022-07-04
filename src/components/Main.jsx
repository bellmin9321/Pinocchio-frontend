import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Webcam from "react-webcam";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { AiTwotoneAudio, AiOutlineAudioMuted } from "react-icons/ai";

function Main() {
  const [isMuted, setIsMuted] = useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState(true);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isQuestionStarted, setIsQuestionStarted] = useState(false);
  const navigate = useNavigate();

  return (
    <ContentBox>
      <section>
        {isWebcamOpen ? (
          <Webcam
            className="video"
            height={"100%"}
            width={"100%"}
            audio={isMuted}
            mirrored={isMirrored}
          />
        ) : (
          <></>
        )}
      </section>
      <nav>
        <Icon
          style={
            isMuted
              ? { backgroundColor: "#ea4335" }
              : { backgroundColor: "#3c4145" }
          }
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <AiOutlineAudioMuted /> : <AiTwotoneAudio />}
        </Icon>
        <Icon
          style={
            !isWebcamOpen
              ? { backgroundColor: "#ea4335" }
              : { backgroundColor: "#3c4145" }
          }
          onClick={() => setIsWebcamOpen(!isWebcamOpen)}
        >
          {isWebcamOpen ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
        </Icon>
        <Icon onClick={() => setIsMirrored(!isMirrored)}>
          <FaExchangeAlt />
        </Icon>
        <Icon className="end" onClick={() => navigate(-1)}>
          <MdCallEnd />
        </Icon>
      </nav>

      {isWebcamOpen ? (
        !isQuestionStarted ? (
          <QuestionStartBox
            onClick={() => setIsQuestionStarted(!isQuestionStarted)}
          >
            <div>질문시작</div>
          </QuestionStartBox>
        ) : (
          <QuestionBox>
            <div className="question">나는 지금 떨고있다</div>
            <div className="time">3</div>
          </QuestionBox>
        )
      ) : (
        <></>
      )}
    </ContentBox>
  );
}

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #181717;
  }

  nav {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 25%;
    height: 10%;

    .end {
      width: 60px;
      height: 40px;
      padding: 8px 13px;
      border-radius: 100px;
      font-size: 25px;
      background-color: #ea4335;
    }
  }
`;

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

const Icon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c4145;
  border: none;
  height: 45px;
  width: 45px;
  font-size: 20px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  opacity: 0.9;

  :hover {
    opacity: 1;
    transform: scale(1.03);
  }
`;

export default Main;
