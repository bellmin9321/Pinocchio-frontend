import React from "react";
import styled from "styled-components";

import WebcamScreen from "./WebcamScreen";
import Question from "./Question";
import WebcamButton from "./WebcamButton";

function Main() {
  return (
    <ContentBox>
      <WebcamScreen />
      <Question />
      <WebcamButton />
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
