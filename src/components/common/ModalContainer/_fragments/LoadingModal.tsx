import { useEffect, useState } from 'react';

import {
  CircularProgress,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
} from '@chakra-ui/react';

import useAppStore from '@features/useAppStore';

import styled from '@emotion/styled';
import { ColorBlue } from '@utils/_Palette';

// interface LoadingModalProps extends Omit<ModalProps, 'children'> {
//   onClose: () => void;
// }
function LoadingModal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal {...props} isCentered>
        <ModalOverlay />
        <ModalContent
          mx="38px"
          style={{ backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none' }}
        >
          <ModalBody p={0}>
            <Flex
              w="100%"
              h="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner
                mt="43px"
                mb="43px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#FF6955"
                size="xl"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* </Box> */}
    </>
    // <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
    //   <ModalOverlay>
    //     <Content maxW={300} maxH={186}>
    //       <Flex justifyContent={'center'} alignItems={'center'}>
    //         <CircularProgress isIndeterminate color={ColorBlue} />
    //       </Flex>
    //     </Content>
    //   </ModalOverlay>
    // </Modal>
  );
}

// const Content = styled(ModalContent)`
//   &.chakra-modal__content {
//     border-radius: 10px;
//     background-color: transparent;
//   }
// `;
export default LoadingModal;
