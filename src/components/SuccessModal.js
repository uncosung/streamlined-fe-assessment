import React from "react";
import styled from "styled-components";
import { useInvoiceContext } from "/src/contexts/InvoiceContext";
import { CloseIcon, CircleCheckIcon } from "/src/assets/assets";

const SuccessModal = () => {
  const { setOpenModal } = useInvoiceContext();
  return (
    <BackgroundBody>
      <Modal>
        <ModalHeader>
          <CloseButton onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <CheckContainer>
            <CircleCheckIcon />
          </CheckContainer>
          <ModalMessage>Draft saved!</ModalMessage>
        </ModalBody>
      </Modal>
    </BackgroundBody>
  );
};

const BackgroundBody = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const Modal = styled.div`
  width: 300px;
  height: 160px;
  background: white;
  margin: auto;
  margin-top: 90px;
  box-shadow: 2px 5px 3px grey;
  border-radius: 6px;
`;

const ModalHeader = styled.div`
  margin-left: auto;
  margin-right: 0;
  text-align: right;
  svg {
    height: 15px;
    width: 15px;
    margin: 15px;
  }
`;

const ModalBody = styled.div`
  margin: auto;
  text-align: center;
`;

const ModalMessage = styled.div`
  font-weight: bold;
  margin-top: 15px;
`;

const CheckContainer = styled.div`
  svg {
    height: 30px;
    width: 30px;
  }
`;

const CloseButton = styled.div``;

export { SuccessModal };
