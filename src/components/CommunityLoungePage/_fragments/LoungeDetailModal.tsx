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
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

interface ReqLoungeDetail {
  title: string;
  banner: File | null;
  home: File | null;
  order: string;
  enable: boolean;
}
interface LoungeDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: string;
  onComplete?: () => void;
}
const LoungeDetailModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: LoungeDetailProps) => {
  const [request, setRequest] = useState<ReqLoungeDetail>({
    title: '',
    banner: null,
    home: null,
    order: '0',
    enable: false,
  });
  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setRequest({ ...request, [key]: value });
  };
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="라운지명"
          content={
            <InputBox
              placeholder="라운지명"
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow title="배너 이미지" content={<FileUpload />} />
        <ModalRow title="홈 이미지" content={<FileUpload />} />
        <ModalRow
          title="라운지 노출 순서"
          content={
            <CustomSelect
              size="sm"
              items={[]}
              defaultValue={request.order}
              onChange={(value) => handleChangeInput('order', value as string)}
            />
          }
        />
        <ModalRow
          title="활성화 여부"
          content={
            <CheckBox
              checked={request.enable}
              onClick={() => handleChangeInput('enable', !request.enable)}
            />
          }
        ></ModalRow>
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
          {type === 'create' ? '라운지 추가' : '라운지 수정'}
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

export default LoungeDetailModal;
