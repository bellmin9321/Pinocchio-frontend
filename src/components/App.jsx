import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { loadModels } from "../helpers/headDetection";

import Main from "./Main";
import AnalysisResult from "./AnalysisResult";
import NotFound from "./NotFound";
import Home from "./Home";

loadModels();

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/result" element={<AnalysisResult />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  );
}

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
  }
`;

export default App;
