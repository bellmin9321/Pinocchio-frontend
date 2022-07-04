import React from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import useStore from "../zustand/store";

function WebcamScreen() {
  const { isWebcamOpen, isMuted, isMirrored } = useStore();

  return (
    <WebcamLayout>
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

export default WebcamScreen;
