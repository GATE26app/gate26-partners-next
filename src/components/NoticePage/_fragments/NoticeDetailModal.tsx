import { useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

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

import NoticeApi from '@apis/notice/NoticeApi';
import { NoticeDTOType } from '@apis/notice/NoticeApi.type';

import Button from '@components/common/Button';
import DatePicker from '@components/common/DatePicker';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { NoticeColumnType } from '../NoticePage.data';

interface NoticeDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  detail: {
    targetId?: string;
    title?: string;
    content?: string;
    startDate?: Dayjs;
    expiredDate?: Dayjs;
  };

  onComplete?: () => void;
}
const NoticeDetailModal = ({
  type,
  detail,
  onClose,
  onComplete,
  ...props
}: NoticeDetailProps) => {
  const [request, setRequest] = useState<NoticeDTOType>({
    noticeId: '',
    title: '',
    content: '',
    startDate: dayjs(),
    expiredDate: dayjs(),
  });

  useEffect(() => {
    const request = {
      noticeId: detail.targetId ? detail.targetId : undefined,
      title: detail.title ? detail.title : '',
      content: detail.content ? detail.content : '',
      startDate: detail.startDate ? dayjs(detail.startDate) : dayjs(),
      expiredDate: detail.expiredDate ? dayjs(detail.expiredDate) : dayjs(),
    };
    setRequest(request);
  }, [detail]);

  const handleCreate = async () => {
    const response = await NoticeApi.postNotice(request);
    if (response.success) {
      if (onComplete) onComplete();
    }
  };

  const handleUpdate = async () => {
    const response = await NoticeApi.putNotice(request);
    if (response.success) {
      if (onComplete) onComplete();
    }
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
              curDate={request.startDate}
              onApply={(val) => handleChangeInput('startDate', val)}
            />
          }
        />
        <ModalRow
          title="종료일자"
          content={
            <DatePicker
              type="datetime"
              curDate={request.expiredDate}
              onApply={(val) => handleChangeInput('expiredDate', val)}
            />
          }
        />
      </Flex>
    );
  };

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
            onClick={type === 'create' ? handleCreate : handleUpdate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoticeDetailModal;
