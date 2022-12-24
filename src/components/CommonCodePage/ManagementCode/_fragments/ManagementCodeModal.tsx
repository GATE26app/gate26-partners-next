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

import { MenageCol } from '../ManagementCode.data';

interface ReqManageKey {
  code: string;
  codeValue: string;
  info: string;
  parentCode: string;
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
  const [request, setRequest] = useState<ReqManageKey>({
    code: '',
    codeValue: '',
    info: '',
    parentCode: '',
  });
  const [codeType, setCodeType] = useState<string>('0');
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleCodeType = (e: any) => {
    setCodeType(e);
  };
  const handleChangeInput = (
    key: MenageCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="코드 구분"
          content={
            <RadioButton
              group
              groupLabel={['상위코드', '하위코드']}
              onClick={handleCodeType}
            />
          }
        />
        {codeType === '0' ? null : (
          <ModalRow
            title="상위 코드"
            content={
              <CustomSelect
                width={'100px'}
                placeholder={'상위 코드'}
                items={[
                  { value: 1, label: '첼린지' },
                  { value: 2, label: '항공사' },
                  { value: 3, label: '국가' },
                ]}
              />
            }
          />
        )}

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
          title="코드값"
          content={
            <InputBox
              placeholder="코드값 (선택)"
              defaultValue={request.codeValue}
              onChange={(e) => handleChangeInput('codeValue', e.target.value)}
            />
          }
        />
        <ModalRow
          title="설명"
          content={
            <InputBox
              placeholder="설명 (선택)"
              defaultValue={request.info}
              onChange={(e) => handleChangeInput('info', e.target.value)}
            />
          }
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
