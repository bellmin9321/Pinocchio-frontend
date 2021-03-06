import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

import useStore from "../zustand/store";
import { detectFaces, drawResults } from "../helpers/headDetection";
import { initEyeDetection, renderPrediction } from "../helpers/eyeDetection";

function WebcamScreen({ isQuestionStarted }) {
  const { isWebcamOpen, isMuted, isMirrored, isQuestionDone, screenshotList } =
    useStore();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const video = webcamRef.current?.video;
  const canvas = canvasRef.current;

  let CapturingLyingBehavior;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    screenshotList.push(imageSrc);
  }, [webcamRef]);

  const getFaces = async () => {
    try {
      if (webcamRef.current !== null) {
        const faces = await detectFaces(video);
        await drawResults(video, canvas, faces, "landmarks");
      } else {
        return;
      }
    } catch (error) {
      console.log("얼굴 인식이 되지 않고 있음");
    }
  };

  const clearOverlay = (canvas) => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas?.width, canvas?.height);
    }
  };

  useEffect(() => {
    if (
      webcamRef !== null &&
      isQuestionStarted === true &&
      isQuestionDone === false
    ) {
      initEyeDetection(video, canvas);
      const ticking = setInterval(async () => {
        CapturingLyingBehavior = await renderPrediction(video);
        console.log(CapturingLyingBehavior);
        await getFaces();

        if (screenshotList.length < 10) {
          capture();
        }
      }, 1000);

      return () => {
        clearOverlay(canvasRef);
        clearInterval(ticking);
      };
    } else {
      clearOverlay(canvasRef);
    }
  }, [isQuestionStarted, isWebcamOpen, isQuestionDone]);

  return (
    <WebcamLayout>
      {isWebcamOpen ? (
        <>
          <Webcam
            ref={webcamRef}
            className="video"
            height={"100%"}
            width={"100%"}
            audio={isMuted}
            mirrored={isMirrored}
            screenshotFormat="image/jpeg"
          />
          <Canvas ref={canvasRef} />
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
