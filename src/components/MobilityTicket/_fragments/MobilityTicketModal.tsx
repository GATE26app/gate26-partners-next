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
import DatePicker from '@components/common/DatePicker';
import ImageCloseUp from '@components/common/ImageCloseUp/ImageCloseUp';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { TiketCol } from '../MobilityTicketPage.data';

interface ReqTiketKey {
  ocr: string;
  airLineName: string;
  flightName: string;
  start: string;
  end: string;
  startDt: dayjs.Dayjs;
  endDt: dayjs.Dayjs;
}
interface OneQuestionProps extends Omit<ModalProps, 'children'> {
  type?: string;
  targetId?: number;
  onComplete?: () => void;
}
const TiketModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: OneQuestionProps) => {
  const [request, setRequest] = useState<ReqTiketKey>({
    ocr: '',
    airLineName: '',
    flightName: '',
    start: '',
    end: '',
    startDt: dayjs('2022-09-21 09:00'),
    endDt: dayjs('2022-09-21 09:00'),
  });
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleChangeInput = (
    key: TiketCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="OCR"
          height="132px"
          content={
            <ImageCloseUp src={request.ocr} width={'110px'} height={'132px'} />
          }
        />
        <ModalRow
          title="항공사명"
          content={
            <InputBox
              placeholder=""
              defaultValue={request.airLineName}
              onChange={(e) => handleChangeInput('airLineName', e.target.value)}
            />
          }
        />
        <ModalRow
          title="항공편명"
          content={
            <InputBox
              defaultValue={request.flightName}
              onChange={(e) => handleChangeInput('flightName', e.target.value)}
            />
          }
        />
        <ModalRow
          title="출발공함"
          content={
            <InputBox
              defaultValue={request.start}
              onChange={(e) => handleChangeInput('start', e.target.value)}
            />
          }
        />
        <ModalRow
          title="도착공항"
          content={
            <InputBox
              placeholder="답변 내용"
              defaultValue={request.end}
              onChange={(e) => handleChangeInput('end', e.target.value)}
            />
          }
        />
        <ModalRow
          title="출발일자"
          content={
            <DatePicker
              type="datetime"
              curDate={request.startDt}
              onApply={(val) => handleChangeInput('startDt', val)}
            />
          }
        />
        <ModalRow
          title="도착일자"
          content={
            <DatePicker
              type="datetime"
              curDate={request.endDt}
              onApply={(val) => handleChangeInput('endDt', val)}
            />
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
        <ModalHeader>항공권 인증 등록</ModalHeader>

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
            text={'확인'}
            size={'sm'}
            width={'120px'}
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TiketModal;
