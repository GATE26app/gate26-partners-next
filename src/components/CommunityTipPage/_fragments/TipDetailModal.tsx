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
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

interface ReqTipDetail {
  title: string;
  home: File | null;
  banner: File | null;
  category: string;
}
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
  const [request, setRequest] = useState<ReqTipDetail>({
    title: '',
    home: null,
    banner: null,
    category: '',
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
          title="제목"
          content={
            <InputBox
              placeholder="여행팁 제목"
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow title="홈 이미지" content={<FileUpload />} />
        <ModalRow title="배너 이미지" content={<FileUpload />} />
        <ModalRow
          title="카테고리"
          content={
            <CustomSelect
              size="sm"
              items={[
                { value: '0', label: '핫플레이스' },
                { value: '1', label: '로컬맛집' },
                { value: '2', label: '투어 액티비티' },
                { value: '3', label: '항공' },
                { value: '4', label: '쇼핑템' },
                { value: '5', label: '숙소뷰' },
                { value: '6', label: '행룩' },
              ]}
              defaultValue={request.category}
              onChange={(value) =>
                handleChangeInput('category', value as string)
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
