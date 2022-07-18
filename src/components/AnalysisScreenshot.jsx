import styled from "styled-components";
import useStore from "../zustand/store";

function AnalysisScreenshot() {
  const { screenshotList } = useStore();

  return (
    screenshotList.length && (
      <ScreenshotLayout>
        {screenshotList.map((screenshot, i) => (
          <ScreenshotBox key={i}>
            <img src={screenshot} />
            <div>거짓말 특징</div>
          </ScreenshotBox>
        ))}
      </ScreenshotLayout>
    )
  );
}

const ScreenshotLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px 0;
`;

const ScreenshotBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 500px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
    width: 100%;
    background-color: #fff;
    font-size: 20px;
  }
`;

export default AnalysisScreenshot;
