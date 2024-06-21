import { useEffect } from 'react';

import useAppStore from '@features/useAppStore';

import AlertModal from './_fragments/AlertModal';
import OrderModal from './_fragments/OrderModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalContainerProps {}

function ModalContainer({ ...props }: ModalContainerProps) {
  const isOpenModal = useAppStore((store) => store.CUSTOM_MODAL.isOpenModal);
  const isOrderOpenModal = useAppStore(
    (store) => store.ORDER_MODAL.isOpenModal,
  );
  const { closeCustomModal } = useCustomModalHandlerContext();
  const { closeOrderModal } = useCustomModalHandlerContext();

  useEffect(() => {
    if (!isOpenModal) {
      closeCustomModal();
    } else if (!isOrderOpenModal) {
      closeOrderModal();
    }
  }, [isOpenModal, isOrderOpenModal]);
  return (
    <>
      <AlertModal isOpen={isOpenModal} onClose={() => closeCustomModal()} />
      <OrderModal isOpen={isOrderOpenModal} onClose={() => closeOrderModal()} />
    </>
  );
}

export default ModalContainer;
