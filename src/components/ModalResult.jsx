import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ModalWrapper from "./ModalWrapper";

function ModalResult() {
  const navigate = useNavigate();

  return (
    <ModalWrapper>
      <ModalContent>
        <div className="resultText">
          <div>당신은 피노키오입니다</div>
        </div>
        <button
          onClick={() => {
            navigate("/result");
          }}
        >
          분석결과
        </button>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  .resultText {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    padding-bottom: 40px;
  }

  button {
    font-size: 25px;
    padding: 10px 0;
    width: 40%;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      transform: scale(1.03);
      opacity: 0.7;
    }
  }
`;
export default ModalResult;
