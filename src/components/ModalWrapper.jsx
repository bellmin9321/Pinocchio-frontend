import ReactDom from "react-dom";
import styled from "styled-components";

import useStore from "../zustand/store";

function ModalWrapper({ children }) {
  const { modalSize } = useStore();

  return ReactDom.createPortal(
    <ModalLayout onClick={() => useStore.setState({ showModal: false })}>
      {modalSize === "SMALL" ? (
        <ModalBoxSmall>{children}</ModalBoxSmall>
      ) : (
        <ModalBoxLarge>{children}</ModalBoxLarge>
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999;
`;

const ModalBoxSmall = styled.div`
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
  background-color: #343433;
  box-shadow: 0px 8px 30px;
  border-radius: 20px;
  z-index: 999999;
`;

const ModalBoxLarge = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 250px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #343433;
  box-shadow: 0px 8px 30px;
  border-radius: 20px;
  z-index: 999999;
`;

export default ModalWrapper;
