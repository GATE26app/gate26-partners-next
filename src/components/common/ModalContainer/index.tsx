import { useEffect } from 'react';

import useAppStore from '@features/useAppStore';

import AlertModal from './AlertModal';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ModalContainerProps {}
function ModalContainer({ ...props }: ModalContainerProps) {
  const isOpenModal = useAppStore((store) => store.CUSTOM_MODAL.isOpenModal);
  const { closeCustomModal } = useCustomModalHandlerContext();

  useEffect(() => {
    if (!isOpenModal) {
      closeCustomModal();
    }
  }, [isOpenModal]);
  return <AlertModal isOpen={isOpenModal} onClose={() => closeCustomModal()} />;
}

export default ModalContainer;
