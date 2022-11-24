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
import DatePicker from '@components/common/DatePicker';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { NoticeColumnType } from '../NoticePage.data';

interface ReqNoticeDetail {
  title: string;
  content: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
}
interface NoticeDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}
const NoticeDetailModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: NoticeDetailProps) => {
  const [request, setRequest] = useState<ReqNoticeDetail>({
    title: '',
    content: '',
    start: dayjs('2022-09-21 09:00'),
    end: dayjs('2022-09-21 09:00'),
  });
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleChangeInput = (
    key: NoticeColumnType,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="제목"
          content={
            <InputBox
              placeholder="제목"
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow
          title="내용"
          content={
            <TextareaBox
              placeholder="내용"
              h={'300px'}
              defaultValue={request.content}
              onChange={(e) => handleChangeInput('content', e.target.value)}
            />
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
      </Flex>
    );
  };

  useEffect(() => {
    if (type !== 'modify') {
      return;
    }
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
          {type === 'create' ? '공지 추가' : '공지 수정'}
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

export default NoticeDetailModal;
