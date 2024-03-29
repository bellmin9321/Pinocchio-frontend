import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Loading from "./Loading";
import Question from "./WebcamQuestion";
import WebcamScreen from "./WebcamScreen";
import WebcamButton from "./WebcamButton";
import ModalTerminate from "./ModalTerminate";

import useStore from "../zustand/store";
import { LOADING_DELAY } from "../constants";

function Main() {
  const [isQuestionStarted, setIsQuestionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showModal } = useStore();

  const generateLoadingTime = () =>
    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DELAY);

  useEffect(() => {
    generateLoadingTime();
  }, []);

  return (
    <ContentBox>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <WebcamScreen isQuestionStarted={isQuestionStarted} />
          <Question
            isQuestionStarted={isQuestionStarted}
            setIsQuestionStarted={setIsQuestionStarted}
          />
          <WebcamButton isQuestionStarted={isQuestionStarted} />
          {showModal && <ModalTerminate />}
        </>
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
`;

export default Main;
