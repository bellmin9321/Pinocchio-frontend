import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useStore from "../zustand/store";
import ModalWrapper from "./ModalWrapper";

function ModalResult() {
  const navigate = useNavigate();
  const { lieCount } = useStore();
  let result;

  if (lieCount === 0) {
    result = "당신은 정직한 사람이군요 👍";
  } else if (0 < lieCount && lieCount < 3) {
    result = "당신은 피노키오처럼 코가 길군요🤭";
  } else if (3 <= lieCount && lieCount < 6) {
    result = "당신은 사람이 될 수 있는 피노키오입니다. 자신을 속이지 마세요!";
  } else {
    result = "당신은 사람이 될 수 없는 피노키오입니다 👺";
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <span className="resultText">{result}</span>
        <button
          onClick={() => {
            navigate("/result");
            useStore.setState({
              questionCount: 0,
            });
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
  justify-content: center;
  align-items: center;
  color: white;

  .resultText {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 37px;
    width: 100%;
    height: 70%;
    padding: 30px 40px;
  }

  button {
    font-size: 25px;
    padding: 10px 0;
    width: 30%;
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
