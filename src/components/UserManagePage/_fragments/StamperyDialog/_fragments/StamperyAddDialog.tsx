import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
} from '@chakra-ui/react';

import { StamperyItems } from '@components/UserManagePage/_fragments/StamperyDialog/_fragments/StamperyAddDialog.data';
import StamperyItem from '@components/UserManagePage/_fragments/StamperyDialog/_fragments/StamperyItem';
import Button from '@components/common/Button';
import Toggle, { ToggleOption } from '@components/common/Toggle';

interface StamperyAddDialogProps extends Omit<ModalProps, 'children'> {
  targetId?: number;
}

const TOGGLE_OPTION: ToggleOption[] = [
  {
    value: '1',
    text: '챌린지',
  },
  {
    value: '2',
    text: '국가',
  },
  {
    value: '3',
    text: '항공사',
  },
];

const StamperyAddDialog = ({
  targetId,
  onClose,
  ...props
}: StamperyAddDialogProps) => {
  const [selectedItem, setSelectedItem] = useState<any>('');

  const renderContent = () => {
    return (
      <Box
        maxH="380px"
        overflowY="auto"
        overflowX="hidden"
        padding="0 12px"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E5E7EC',
            borderRadius: '24px',
          },
        }}
      >
        <SimpleGrid columns={4} gap="20px 18px">
          {StamperyItems.map(({ icon, text }, index) => {
            return (
              <StamperyItem
                key={index}
                isAcitve={selectedItem === index}
                onClick={setSelectedItem}
                icon={icon}
                text={text}
                value={index}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    );
  };

  useEffect(() => {
    console.log('선택한 row :', targetId);
  }, [targetId]);

  return (
    <Modal size="md" isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent={'space-between'} direction="column">
            <span style={{ marginBottom: '29px' }}>스탬프러리 추가</span>
            <Toggle toggleOptions={TOGGLE_OPTION} />
          </Flex>
        </ModalHeader>
        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-grayscale"
            text={'취소'}
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
          <Button
            type="square"
            text={'추가'}
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StamperyAddDialog;
