import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

import useStore from "../zustand/store";

function WebcamFixedRect({ isQuestionStarted }) {
  const { isDetected } = useStore();
  const canvasRef = useRef(null);

  const draw = () => {
    if (canvasRef.current) {
      canvasRef.current.width = "800";
      canvasRef.current.height = "650";

      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.lineCap = "square";

      isQuestionStarted
        ? ctx.strokeRect(270, 80, 280, 400)
        : ctx.strokeRect(100, 10, 600, 470);
    }
  };

  useEffect(() => {
    draw();
  }, [isQuestionStarted, isDetected]);

  return (
    <>
      {isQuestionStarted ? (
        <>
          <FixedRect ref={canvasRef}></FixedRect>
          <AlertMessage style={{ top: "70px" }}>
            얼굴 높이를 테두리 높이에 맞춰주세요
          </AlertMessage>
        </>
      ) : (
        isDetected && (
          <>
            <FixedRect ref={canvasRef}></FixedRect>
            <AlertMessage>
              얼굴을 테두리 안에 위치시키고 시작해주세요
            </AlertMessage>
          </>
        )
      )}
    </>
  );
}

const FixedRect = styled.canvas`
  position: absolute;
  top: 30px;
  z-index: 14;
`;

const AlertMessage = styled.span`
  position: absolute;
  color: red;
  font-size: 30px;
  top: 50px;
  z-index: 14;
`;

export default WebcamFixedRect;
