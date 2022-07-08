import React, { useEffect, useState } from "react";
import styled from "styled-components";

import WebcamScreen from "./WebcamScreen";
import Question from "./Question";
import WebcamButton from "./WebcamButton";
import Loading from "./Loading";

function Main() {
  const [isQuestionStarted, setIsQuestionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadingTime = () =>
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);

  useEffect(() => {
    loadingTime();
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
