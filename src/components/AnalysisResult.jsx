import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useStore from "../zustand/store";

const AnalysisResult = () => {
  const navigate = useNavigate();
  const { screenshotList, lieCount } = useStore();

  const initializeScreenshotList = () => {
    useStore.setState({
      screenshotList: [],
      isQuestionDone: false,
      lieCount: 0,
    });
    navigate("/main");
  };

  return (
    <AnalysisResultLayout>
      <AnalysisResultBox>
        <header>
          <p className="title">분석 결과</p>
          <p className="back" onClick={initializeScreenshotList}>
            RESTART
          </p>
        </header>
        <section>
          <InformationBox>
            <p>거짓말 포착횟수: {lieCount}번</p>
            <p>최다 포착 부위: 눈</p>
            <p>코길이: {(lieCount + 1) * 4.08}cm</p>
          </InformationBox>
          <ScreenshotBox>
            {screenshotList.length ? (
              <>
                {screenshotList.map((screenshot, i) => (
                  <Screenshot
                    key={i}
                    onClick={() => navigate("/result/screenshot")}
                    height={"70%"}
                    width={"83%"}
                    src={screenshot}
                  />
                ))}
              </>
            ) : (
              <HonestBox>
                <img height={"100%"} width={"100%"} src="image/good.png" />
                <div>YOU ARE HONEST</div>
              </HonestBox>
            )}
          </ScreenshotBox>
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
  }
`;

const InformationBox = styled.div`
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
`;

const ScreenshotBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
  background-color: #1c6aaa;
  color: white;
  font-size: 40px;
  height: 100%;
  width: 49%;
  border-radius: 10px;
`;

const HonestBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  margin: auto;

  img {
    border-radius: 15px;

    :hover {
      transform: scale(1.05);
      transition: 300ms ease-in;
    }
  }

  div {
    font-family: "Rocher";
    margin-top: 12px;
  }
`;

const Screenshot = styled.img`
  flex: 1 0 10%;
  width: 21%;
  height: 49%;
  padding: 0 2px;
  border-radius: 10px;
`;

export default AnalysisResult;
