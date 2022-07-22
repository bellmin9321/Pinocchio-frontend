import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useStore from "../zustand/store";
import ModalScreenshot from "./ModalScreenshot";

const AnalysisResult = () => {
  const navigate = useNavigate();
  const { screenshotList, lieCount, showModal, headCount, eyesCount } =
    useStore();

  const initializeScreenshotList = () => {
    useStore.setState({
      screenshotList: [],
      isQuestionDone: false,
      lieCount: 0,
      isHardcoreSelected: false,
    });
    navigate("/main");
  };

  const openScreenshotModal = () => {
    useStore.setState({
      showModal: true,
      modalSize: "L",
    });
  };

  return (
    <AnalysisResultLayout>
      <AnalysisResultBox>
        <header>
          <span className="title">분석 결과</span>
          <span className="restart" onClick={initializeScreenshotList}>
            RESTART
          </span>
        </header>
        <section>
          <InformationBox>
            <p>거짓말 포착횟수: {lieCount}번</p>
            <p>
              최다 포착 부위:{" "}
              {lieCount ? (headCount > eyesCount ? "머리" : "눈") : "없음"}
            </p>
            <p>코길이: {(lieCount + 1) * 4.08}cm</p>
          </InformationBox>
          <ScreenshotBox>
            {screenshotList.length ? (
              <>
                <span className="title">거짓말 포착 스크린샷</span>
                <Screenshot
                  onClick={openScreenshotModal}
                  height={"70%"}
                  width={"83%"}
                  src={screenshotList[0]}
                />
                <ClickText>스크린샷을 클릭하면 볼 수 있습니다</ClickText>
              </>
            ) : (
              <HonestImageBox>
                <img height={"85%"} width={"90%"} src="image/good.png" />
                <span>YOU ARE HONEST</span>
              </HonestImageBox>
            )}
          </ScreenshotBox>
          {showModal && <ModalScreenshot />}
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

    .restart {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #1c6aaa;
  color: white;
  font-size: 40px;
  height: 100%;
  width: 49%;
  border-radius: 10px;

  .title {
    margin-top: 15px;
  }
`;

const HonestImageBox = styled.div`
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
      transform: scale(1.03);
      transition: 200ms ease-in;
    }
  }

  span {
    font-family: "Rocher";
    margin-top: 12px;
  }
`;

const Screenshot = styled.img`
  flex: 1 0 10%;
  width: 80%;
  height: 100%;
  padding: 0 2px;
  border-radius: 10px;
  margin-bottom: 20px;
  filter: blur(1.5rem);

  :hover {
    opacity: 0.7;
  }
`;

const ClickText = styled.span`
  position: absolute;
  bottom: 8%;
  font-size: 20px;
  color: blue;
`;

export default AnalysisResult;
