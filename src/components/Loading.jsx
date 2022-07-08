import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingLayout>
      <img src="image/pinokio.gif" />
      <h1 className="loading">L O A D I N G . . . </h1>
    </LoadingLayout>
  );
}

const LoadingLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loading {
    color: white;
    font-weight: bold;
    display: inline-block;
    font-family: monospace;
    font-size: 50px;
    clip-path: inset(0 3ch 0 0);
    animation: l 2s steps(4) infinite;
  }

  @keyframes l {
    to {
      clip-path: inset(0 -1ch 0 0);
    }
  }
`;

export default Loading;
