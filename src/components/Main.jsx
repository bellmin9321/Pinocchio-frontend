import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";

import WebcamScreen from "./WebcamScreen";
import Question from "./Question";
import WebcamButton from "./WebcamButton";
import Loading from "./Loading";
import { LOADING_DELAY } from "../constants";
import ModalTerminate from "./ModalTerminate";

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
          <WebcamButton />
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
