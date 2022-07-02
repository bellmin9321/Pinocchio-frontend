import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Main() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div>Webcam</div>
      <div onClick={() => navigate(-1)}>종료하기</div>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 97%;
  height: 92%;

  background: #ffffff;
  border-radius: 30px;
`;

export default Main;
