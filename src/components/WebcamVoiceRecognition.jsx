import React, { useEffect } from "react";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import useStore from "../zustand/store";

function WebcamVoiceRecognition({ isQuestionStarted }) {
  const { isMuted, questionCount } = useStore();
  const { finalTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우져가 지원하지 않고 있습니다.</span>;
  }

  useEffect(() => {
    if (isQuestionStarted) {
      SpeechRecognition.startListening();
    }
  }, [isQuestionStarted, questionCount, isMuted]);

  return (
    <VoiceText>
      {finalTranscript && !isMuted
        ? finalTranscript === "네" ||
          finalTranscript === "아니요" ||
          finalTranscript === "아니오"
          ? finalTranscript
          : "적절한 대답이 아닙니다"
        : !isMuted
        ? `질문에 "네", "아니요"로 대답해주세요`
        : "음소거 상태입니다"}
    </VoiceText>
  );
}

const VoiceText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 13%;
  width: 20%;
  font-size: 15px;
  color: blue;
  border-radius: 5px;
  z-index: 15;
`;

export default WebcamVoiceRecognition;
