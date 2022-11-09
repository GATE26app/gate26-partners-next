import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import useAppStore from '@features/useAppStore';

import styled from '@emotion/styled';

interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}
function AlertModal({ onClose, ...props }: AlertModalProps) {
  const { title, message, type, okButtonName, cbOk, cbCancel } = useAppStore(
    (store) => store.CUSTOM_MODAL,
  );

  const handleClickOK = () => {
    if (cbOk) {
      cbOk();
    }
    onClose();
  };

  const handleClickClose = () => {
    if (cbCancel) {
      cbCancel();
    }
    onClose();
  };
  const renderFooter = () => {
    if (type === 'alert') {
      return (
        <div className="button" onClick={handleClickOK}>
          확인
        </div>
      );
    } else if (type === 'confirm') {
      return (
        <>
          <div className="button" onClick={handleClickClose}>
            취소
          </div>
          <div className="button highlight" onClick={handleClickOK}>
            {okButtonName || "확인"}
          </div>
        </>
      );
    }
    return <></>;
  };
  return (
    <Modal onClose={onClose} isCentered {...props}>
      <ModalOverlay />
      <Content maxW={300} maxH={186}>
        <Header>{title || "Alert"}</Header>
        <ModalBody>{message}</ModalBody>

        <ModalFooter>{renderFooter()}</ModalFooter>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 20px 0px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 20px;
        text-align: center;
        color: #ff5942;
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }
      &__body {
        padding: 10px 20px 20px 20px;
        text-align: center;
        white-space: break-spaces;
        color: #757983;

        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }
      &__footer {
        padding: 0;
        display: flex;
        justify-content: space-between;
        .button {
          cursor: pointer;

          border-top: 1px solid #e5e7ec;
          width: 100%;
          height: 55px;
          display: flex;
          justify-content: center;
          align-items: center;

          color: #1a1a1a;

          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 27px;
          letter-spacing: -0.02em;

          &.highlight {
            color: #ff5942;
            border-left: 1px solid #e5e7ec;
          }
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)``;
export default AlertModal;
