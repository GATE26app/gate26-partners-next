import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import ImageCloseUp from '@components/common/ImageCloseUp/ImageCloseUp';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { StampCol } from '../MobilityStamp.data';

interface ReqStampKey {
  type: string;
  title: string;
  info: string;
  image: string;
  answer: string;
}
interface StampProps extends Omit<ModalProps, 'children'> {
  type?: string;
  targetId?: number;
  onComplete?: () => void;
}
const StampModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: StampProps) => {
  const [request, setRequest] = useState<ReqStampKey>({
    type: '',
    title: '',
    info: '',
    image: '',
    answer: '',
  });
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleChangeInput = (
    key: StampCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="스탬프러리 유형"
          content={
            <CustomSelect
              width={'100px'}
              placeholder={'Type'}
              items={[
                { value: 1, label: '첼린지' },
                { value: 2, label: '항공사' },
                { value: 3, label: '국가' },
              ]}
            />
          }
        />
        <ModalRow
          title="스탬프러리명"
          content={
            <InputBox
              placeholder=""
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow
          title="스탬프러리 설명"
          height="120px"
          content={
            <InputBox
              defaultValue={request.info}
              onChange={(e) => handleChangeInput('info', e.target.value)}
              h="120px"
            />
          }
        />
        <ModalRow
          title="이미지"
          content={<FileUpload fileValue={request.image} />}
        />
        <ModalRow title="사용 여부" content={<CheckBox>{'사용'}</CheckBox>} />
      </Flex>
    );
  };

  useEffect(() => {
    console.log('선택한 row :', targetId);
  }, [targetId, type]);

  useEffect(() => {
    console.log('업데이트 : ', request);
  }, [request]);

  return (
    <Modal
      size={'md'}
      isCentered
      variant={'simple'}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '스탬프러리 추가' : '스탬프러리 수정'}
        </ModalHeader>

        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-grayscale"
            text="취소"
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
          <Button
            type="square"
            text={'추가'}
            size={'sm'}
            width={'120px'}
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StampModal;
