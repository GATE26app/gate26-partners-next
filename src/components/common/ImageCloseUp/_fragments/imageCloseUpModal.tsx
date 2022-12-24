import React from 'react';

import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import RoundImage from '@components/common/RoundImage';

import { IconArea } from './imageCloseUpModal.style';

interface ImageCloseUpModalProps extends Omit<ModalProps, 'children'> {
  src: string;
}

const imageCloseUpModal = ({
  src,
  onClose,
  ...props
}: ImageCloseUpModalProps) => {
  return (
    <Modal
      size={'lg'}
      isCentered
      variant={'simple'}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent height={'465px'} position={'relative'}>
        <IconArea src={'/icons/svg/modal-close.svg'} onClick={onClose} />
        <ModalBody margin={'60px auto'}>
          <RoundImage src={src} width={'375px'} height={'375px'} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default imageCloseUpModal;
