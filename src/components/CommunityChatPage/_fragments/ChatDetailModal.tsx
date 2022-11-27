import { useEffect, useState } from 'react';

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

import Button from '@components/common/Button';
import CustomSelect from '@components/common/CustomSelect';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

interface ReqChatDetail {
  title: string;
  thumbnail: File | null;
  location: string;
}
interface ChatDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}
const ChatDetailModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: ChatDetailProps) => {
  const [request, setRequest] = useState<ReqChatDetail>({
    title: '',
    thumbnail: null,
    location: '',
  });

  const handleChangeInput = (key: string, value: string | number) => {
    setRequest({ ...request, [key]: value });
  };

  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="채팅명"
          content={
            <InputBox
              placeholder="채팅명"
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow title="썸네일 사진" content={<div></div>} />
        <ModalRow
          title="라운지 위치"
          content={
            <CustomSelect
              size="sm"
              items={[]}
              defaultValue={request.location}
              onChange={(value) =>
                handleChangeInput('location', value as string)
              }
            />
          }
        />
      </Flex>
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
          {type === 'create' ? '오픈채팅 추가' : '오픈채팅 수정'}
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
            text="추가"
            size={'sm'}
            width={'120px'}
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChatDetailModal;
