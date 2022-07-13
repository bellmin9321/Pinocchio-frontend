import styled from "styled-components";
import useStore from "../zustand/store";

function AnalysisScreenshot() {
  const { screenshotList } = useStore();

  return (
    screenshotList.length && (
      <ScreenshotBox>
        {screenshotList.map((screenshot, i) => (
          <div key={i}>
            <img src={screenshot} />
            <div>거짓말 특징</div>
          </div>
        ))}
      </ScreenshotBox>
    )
  );
}

const ScreenshotBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 80%;
    }

    div {
      height: 10%;
      width: 100%;
      background-color: #fff;
      font-size: 20px;
    }
  }
`;

export default AnalysisScreenshot;
