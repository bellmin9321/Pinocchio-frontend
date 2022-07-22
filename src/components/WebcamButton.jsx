import React from "react";
import styled from "styled-components";

import useStore from "../zustand/store";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { AiTwotoneAudio, AiOutlineAudioMuted } from "react-icons/ai";

const WebcamButton = ({ isQuestionStarted }) => {
  const { isMuted, isWebcamOpen } = useStore();

  const showModalSmall = () => {
    useStore.setState({ modalSize: "S", showModal: true });
  };

  return (
    <WebcamButtonLayout>
      <Icon
        style={
          isMuted
            ? { backgroundColor: "#ea4335" }
            : { backgroundColor: "#3c4145" }
        }
        onClick={useStore((state) => state.toggleIsMuted)}
      >
        {isMuted ? <AiOutlineAudioMuted /> : <AiTwotoneAudio />}
      </Icon>
      <Icon
        disabled={isQuestionStarted}
        style={
          !isWebcamOpen
            ? { backgroundColor: "#ea4335" }
            : { backgroundColor: "#3c4145" }
        }
        onClick={useStore((state) => state.toggleIsWebcamOpen)}
      >
        {isWebcamOpen ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
      </Icon>
      <Icon
        disabled={isQuestionStarted}
        onClick={useStore((state) => state.toggleIsMirrored)}
      >
        <FaExchangeAlt />
      </Icon>
      <Icon className="end" onClick={showModalSmall}>
        <MdCallEnd />
      </Icon>
    </WebcamButtonLayout>
  );
};

const WebcamButtonLayout = styled.nav`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 25%;
  height: 10%;
  z-index: 15;

  .end {
    width: 60px;
    height: 40px;
    padding: 8px 13px;
    border-radius: 100px;
    font-size: 25px;
    background-color: #ea4335;
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
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 0.9)};

  :${(props) => (props.disabled ? "" : "hover")} {
    opacity: 1;
    transform: scale(1.03);
  }
`;

export default WebcamButton;
