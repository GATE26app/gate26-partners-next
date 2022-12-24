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
import RadioButton from '@components/common/CustomRadioButton/RadioButton';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import ImageCloseUp from '@components/common/ImageCloseUp/ImageCloseUp';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { AirPortCol } from '../AirportCode.data';

interface ReqAirportKey {
  name: string;
  code: string;
  rounge: string;
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
  const [request, setRequest] = useState<ReqAirportKey>({
    name: '',
    code: '',
    rounge: '',
    answer: '',
  });
  const [codeType, setCodeType] = useState<boolean>(false);
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleCodeType = (e: any) => {
    setCodeType(e);
  };
  const handleChangeInput = (
    key: AirPortCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="공항명 (국문)"
          content={
            <CustomSelect
              placeholder={'공항명'}
              items={[
                { value: 1, label: '0' },
                { value: 2, label: '0' },
                { value: 3, label: '0' },
              ]}
            />
          }
        />

        <ModalRow
          title="코드"
          content={
            <InputBox
              placeholder="코드"
              defaultValue={request.code}
              onChange={(e) => handleChangeInput('code', e.target.value)}
            />
          }
        />
        <ModalRow
          title="라운지"
          content={
            <CustomSelect
              placeholder={'라운지 선택'}
              items={[
                { value: 1, label: '0' },
                { value: 2, label: '0' },
                { value: 3, label: '0' },
              ]}
            />
          }
        />

        <ModalRow
          title="사용 여부"
          content={
            <CheckBox checked={codeType} onClick={() => setCodeType(!codeType)}>
              {'사용'}
            </CheckBox>
          }
        />
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
          {type === 'create' ? '코드 추가' : '코드 수정'}
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
            text={type === 'create' ? '추가' : '수정 '}
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
