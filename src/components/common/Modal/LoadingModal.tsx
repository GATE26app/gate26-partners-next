import { useEffect, useState } from 'react';

import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Spinner,
} from '@chakra-ui/react';

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
  );
}
export default LoadingModal;
