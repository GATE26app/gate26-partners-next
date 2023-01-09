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

import { AirLineCol } from '../AirLineCode.data';

interface ReqAirportKey {
  nameKr: string;
  nameEng: string;
  iata: string;
  icao: string;
  imageUrl: string;
  pageUrl: string;
  selfUrl: string;
  dutyUrl: string;
  repNum: string;
  korYn: string;
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
    nameKr: '',
    nameEng: '',
    iata: '',
    icao: '',
    imageUrl: '',
    pageUrl: '',
    selfUrl: '',
    dutyUrl: '',
    repNum: '',
    korYn: '',
    answer: '',
  });

  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleCodeType = (e: any) => {
    setCodeType(e);
  };
  const [codeType, setCodeType] = useState<boolean>(false);
  const handleChangeInput = (
    key: AirLineCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="항공사명 (국문)"
          content={
            <InputBox
              placeholder="항공사명 (국문)"
              defaultValue={request.nameEng}
              onChange={(e) => handleChangeInput('nameEng', e.target.value)}
            />
          }
        />

        <ModalRow
          title="항공사명 (영문)"
          content={
            <InputBox
              placeholder="항공사명 (영문)"
              defaultValue={request.nameEng}
              onChange={(e) => handleChangeInput('nameEng', e.target.value)}
            />
          }
        />
        <ModalRow
          title="IATA"
          content={
            <InputBox
              placeholder="IATA"
              defaultValue={request.iata}
              onChange={(e) => handleChangeInput('iata', e.target.value)}
            />
          }
        />
        <ModalRow
          title="ICAO"
          content={
            <InputBox
              placeholder="ICAO"
              defaultValue={request.icao}
              onChange={(e) => handleChangeInput('icao', e.target.value)}
            />
          }
        />
        <ModalRow
          title="항공사 이미지 URL"
          content={
            <InputBox
              placeholder="항공사 이미지 URL"
              defaultValue={request.imageUrl}
              onChange={(e) => handleChangeInput('imageUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="홈페이지 URL"
          content={
            <InputBox
              placeholder="홈페이지 URL"
              defaultValue={request.pageUrl}
              onChange={(e) => handleChangeInput('pageUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="셀프체크인 URL"
          content={
            <InputBox
              placeholder="셀프체크인 URL"
              defaultValue={request.selfUrl}
              onChange={(e) => handleChangeInput('selfUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="면세점 URL"
          content={
            <InputBox
              placeholder="면세점 URL"
              defaultValue={request.dutyUrl}
              onChange={(e) => handleChangeInput('dutyUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="대표번호"
          content={
            <InputBox
              placeholder="대표번호"
              defaultValue={request.repNum}
              onChange={(e) => handleChangeInput('repNum', e.target.value)}
            />
          }
        />
        <ModalRow
          title="국내외여부"
          content={<RadioButton group groupLabel={['국내', '국회']} />}
        />
        <ModalRow
          title="대표번호"
          content={
            <InputBox
              placeholder="대표번호"
              defaultValue={request.repNum}
              onChange={(e) => handleChangeInput('repNum', e.target.value)}
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
