import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

import useStore from "../zustand/store";
import {
  loadFaceLandmarksDetection,
  detectLies,
} from "../helpers/FaceLandmarksDetectionHelper.js";
import FaceFilter from "./FaceFilter";
import { DETECT_INTERVAL } from "../constants";

function WebcamScreen({ isQuestionStarted }) {
  const {
    isWebcamOpen,
    isMuted,
    isMirrored,
    isQuestionDone,
    screenshotList,
    lieCount,
  } = useStore();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const video = webcamRef.current?.video;
  const canvas = canvasRef.current;

  let detectedLyingBehavior;
  let faceRotateCount = 0;
  let eyesGazeCount = 0;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    screenshotList.push(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (
      webcamRef !== null &&
      isQuestionStarted === true &&
      isQuestionDone === false
    ) {
      loadFaceLandmarksDetection(video, canvas);

      const ticking = setInterval(async () => {
        detectedLyingBehavior = await detectLies(video);

        // 얼굴 돌리기 & 머리 기울이기 탐지
        if (
          detectedLyingBehavior?.HEAD_STATE === "LEFT" ||
          detectedLyingBehavior?.HEAD_STATE === "RIGHT"
        ) {
          faceRotateCount++;

          if (faceRotateCount >= 5) {
            useStore.setState((state) => ({ lieCount: state.lieCount + 1 }));

            capture();
          }
        }

        // 눈 흘겨보기 탐지
        if (
          detectedLyingBehavior?.EYES_GAZING === "LEFT" ||
          detectedLyingBehavior?.EYES_GAZING === "RIGHT"
        ) {
          eyesGazeCount++;

          if (eyesGazeCount > 1) {
            useStore.setState((state) => ({ lieCount: state.lieCount + 1 }));

            capture();
          }
        }
      }, DETECT_INTERVAL);

      // 눈 깜빡임 탐지
      const detectBlinkingEyes = setInterval(() => {
        if (detectedLyingBehavior?.EYES_BLINKING > 2) {
          useStore.setState((state) => ({ lieCount: state.lieCount + 1 }));

          capture();
        }
      }, 300);

      return () => {
        clearInterval(ticking);
        clearInterval(detectBlinkingEyes);
      };
    }
  }, [isQuestionStarted, isWebcamOpen, isQuestionDone, lieCount]);

  console.log("거짓말 포착 횟수: ", lieCount);

  return (
    <WebcamLayout>
      {isWebcamOpen ? (
        <>
          <Webcam
            ref={webcamRef}
            audio={isMuted}
            mirrored={isMirrored}
            screenshotFormat="image/jpeg"
          />
          <Canvas
            style={isMirrored ? { transform: "rotateY(180deg)" } : {}}
            ref={canvasRef}
          />
          {lieCount > 0 ? <FaceFilter /> : <></>}
        </>
      ) : (
        <></>
      )}
    </WebcamLayout>
  );
}

const WebcamLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #181717;

  video {
    height: 100%;
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
`;

export default WebcamScreen;
