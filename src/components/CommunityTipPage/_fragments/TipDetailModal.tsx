import { useEffect } from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import Button from '@components/common/Button';

interface TipDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}
const TipDetailModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: TipDetailProps) => {
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const renderContent = () => {
    return (
      <div>{type === 'create' ? '생성중' + targetId : '수정중' + targetId}</div>
    );
  };

  useEffect(() => {
    if (type !== 'modify') {
      return;
    }
    console.log('선택한 row :', targetId);
  }, [targetId, type]);

  return (
    <Modal isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '여행팁 추가' : '여행팁 수정'}
        </ModalHeader>
        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-outline"
            text="취소"
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
          <Button
            type="square"
            text={type === 'create' ? '추가' : '수정'}
            size={'sm'}
            width={'120px'}
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TipDetailModal;
