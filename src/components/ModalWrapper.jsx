import ReactDom from "react-dom";
import styled from "styled-components";

import useStore from "../zustand/store";

function ModalWrapper({ children }) {
  const { modalSize } = useStore();

  return ReactDom.createPortal(
    <ModalLayout
      onClick={() =>
        modalSize === "S" && useStore.setState({ showModal: false })
      }
    >
      {modalSize === "S" ? (
        <ModalBox>{children}</ModalBox>
      ) : modalSize === "M" ? (
        <ModalBox style={{ width: "600px", height: "250px" }}>
          {children}
        </ModalBox>
      ) : (
        <ModalBox
          style={{
            backgroundColor: "black",
            boxShadow: "none",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </ModalBox>
      )}
    </ModalLayout>,
    document.getElementById("modal"),
  );
}

const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(22, 21, 21, 0.6);
  z-index: 15;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 450px;
  height: 170px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1c6aaa;
  box-shadow: 0px 8px 30px;
  border-radius: 20px;
  z-index: 20;
`;

export default ModalWrapper;
