import React from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";

import useStore from "../zustand/store";
import ModalWrapper from "./ModalWrapper";

function ModalScreenshot() {
  const { screenshotList } = useStore();
  const carousel = [];

  for (let i = 0; i < screenshotList.length; i++) {
    if (carousel.length < 10) {
      carousel.push({
        original: screenshotList[i],
        thumbnail: screenshotList[i],
      });
    }
  }

  return (
    <ModalWrapper>
      <ImageGallery items={carousel} />
      <LyingBehavior>
        거짓말 특징: 1️⃣고개 돌리기 2️⃣머리 기울이기 3️⃣눈 빨리 깜빡이기 4️⃣눈
        흘겨보기
      </LyingBehavior>
      <CancelButton
        onClick={() =>
          useStore.setState({
            showModal: false,
          })
        }
      >
        ❌
      </CancelButton>
    </ModalWrapper>
  );
}

const LyingBehavior = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 22%;
  width: 62%;
  padding: 15px 0;
  font-size: 25px;
  border-radius: 15px;
  background-color: #fff;
`;

const CancelButton = styled.button`
  position: absolute;
  top: 2%;
  right: 7%;
  z-index: 25;
  font-size: 50px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-radius: 10%;
  width: 70px;
  height: 70px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
    transform: scale(1.1);
    background-color: white;
    transition: 100ms ease-out;
  }
`;

export default ModalScreenshot;
