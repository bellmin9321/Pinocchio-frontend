import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useStore from "../zustand/store";
import ModalWrapper from "./ModalWrapper";

function ModalTerminate() {
  const navigate = useNavigate();

  const moveHome = () => {
    useStore.setState({ showModal: false });
    navigate("/");
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <div className="mainText">
          <div>정말 종료하시겠습니까?</div>
        </div>
        <div className="answerBox">
          <div onClick={moveHome}>네</div>
          <div onClick={() => useStore.setState({ showModal: false })}>
            아니요
          </div>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalContent = styled.div`
  z-index: 100;
  position: relative;
  color: white;
  height: 80%;

  .mainText {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60%;
    font-size: 35px;
  }

  .answerBox {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 20px;
    width: 40%;

    div {
      cursor: pointer;
      padding: 10px;

      :hover {
        opacity: 0.5;
      }
    }
  }
`;

export default ModalTerminate;
