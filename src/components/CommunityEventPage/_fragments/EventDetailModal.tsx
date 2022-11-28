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
} from '@chakra-ui/react';

import Button from '@components/common/Button';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

interface ReqEventDetail {
  title: string;
  eventContent: string;
  type: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  banner: File | null;
  home: File | null;
  location: string;
}
interface EventDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}
const EventDetailModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: EventDetailProps) => {
  const [request, setRequest] = useState<ReqEventDetail>({
    title: '',
    eventContent: '',
    type: '',
    start: dayjs('2022-09-21 09:00'),
    end: dayjs('2022-09-21 09:00'),
    banner: null,
    home: null,
    location: '',
  });

  const handleChangeInput = (
    key: string,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };

  const handleCreate = () => {
    if (onComplete) onComplete();
  };

  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow title="타입" content={<div></div>} />
        <ModalRow
          title="제목"
          content={
            <InputBox
              placeholder="이벤트 제목"
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow
          title="이벤트 내용"
          content={
            request.type === '0' ? (
              <InputBox
                placeholder="http://"
                defaultValue={request.eventContent}
                onChange={(e) =>
                  handleChangeInput('eventContent', e.target.value)
                }
              />
            ) : request.type === '1' ? (
              <div></div>
            ) : (
              <TextareaBox
                placeholder="이벤트 내용"
                h={'300px'}
                defaultValue={request.eventContent}
                onChange={(e) =>
                  handleChangeInput('eventContent', e.target.value)
                }
              />
            )
          }
          height="300px"
        />
        <ModalRow
          title="시작일자"
          content={
            <DatePicker
              type="datetime"
              curDate={request.start}
              onApply={(val) => handleChangeInput('start', val)}
            />
          }
        />
        <ModalRow
          title="종료일자"
          content={
            <DatePicker
              type="datetime"
              curDate={request.end}
              onApply={(val) => handleChangeInput('end', val)}
            />
          }
        />
        <ModalRow title="배너 이미지" content={<div></div>} />
        <ModalRow title="홈 이미지" content={<div></div>} />
        <ModalRow
          title="표시장소"
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
          {type === 'create' ? '이벤트 추가' : '이벤트 수정'}
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

export default EventDetailModal;
