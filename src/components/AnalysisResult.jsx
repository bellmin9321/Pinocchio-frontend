import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AnalysisResult = () => {
  const navigate = useNavigate();

  return (
    <AnalysisResultLayout>
      <AnalysisResultBox>
        <header>
          <p className="title">분석 결과</p>
          <p className="back" onClick={() => navigate("/main")}>
            RESTART
          </p>
        </header>
        <section>
          <div>
            <p>거짓말 포착횟수: 8번</p>
            <p>최다 포착 부위: 눈</p>
            <p>코길이: 36.7cm</p>
          </div>
          <div>
            Screenshot
            <img height={"70%"} width={"83%"} src="image/pinokio.gif" />
          </div>
        </section>
      </AnalysisResultBox>
    </AnalysisResultLayout>
  );
};

const AnalysisResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const AnalysisResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 96%;
  height: 90%;
  border-radius: 30px;
  background-color: white;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 15%;
    font-size: 50px;
    font-weight: bold;

    .back {
      cursor: pointer;
      background-color: #1c6aaa;
      color: white;
      padding: 15px 20px;
      font-size: 28px;
      border-radius: 10px;

      :hover {
        transform: scale(1.03);
        opacity: 0.7;
      }
    }
  }

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 70%;
    margin-bottom: 30px;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #1c6aaa;
      color: white;
      font-size: 40px;
      height: 100%;
      width: 49%;
      border-radius: 10px;
    }
  }
`;

const ResultInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2196f3;
  height: 100%;
`;

const ResultScreenshot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2196f3;

  height: 100%;
`;

export default AnalysisResult;
