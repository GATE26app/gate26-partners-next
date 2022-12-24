import { useEffect } from 'react';
import { useState } from 'react';

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
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { AlarmColumnType } from '../PushManagePage.data';

interface ReqPushDetail {
  fcmType: string;
  tgId: string;
  pushTarget: string;
  pushType: string;
  title: string;
  content: string;
  url: string;
  file: File | null;
  reserveAt: dayjs.Dayjs;
}
interface PushDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}
const PushDetailModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: PushDetailProps) => {
  const [request, setRequest] = useState<ReqPushDetail>({
    fcmType: '',
    tgId: '',
    pushTarget: '',
    pushType: '',
    title: '',
    content: '',
    url: '',
    file: null,
    reserveAt: dayjs('2022-09-21 09:00'),
  });
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleChangeInput = (
    key: string,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="fcm type"
          content={
            <CustomSelect
              size="sm"
              items={[]}
              defaultValue={request.fcmType}
              onChange={(value) =>
                handleChangeInput('fcmType', value as string)
              }
            />
          }
        />
        <ModalRow
          title="tgId"
          content={
            <InputBox
              placeholder="tgId"
              defaultValue={request.tgId}
              onChange={(e) => handleChangeInput('tgId', e.target.value)}
            />
          }
        />
        <ModalRow
          title="푸쉬 대상"
          content={
            <CustomSelect
              size="sm"
              items={[]}
              defaultValue={request.pushTarget}
              onChange={(value) =>
                handleChangeInput('pushTarget', value as string)
              }
            />
          }
        />
        <ModalRow
          title="푸쉬 유형"
          content={
            <CustomSelect
              size="sm"
              items={[]}
              defaultValue={request.pushType}
              onChange={(value) =>
                handleChangeInput('pushType', value as string)
              }
            />
          }
        />
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
          title="푸쉬내용"
          titleAlign="top"
          content={
            <TextareaBox
              placeholder="내용"
              defaultValue={request.content}
              onChange={(e) => handleChangeInput('content', e.target.value)}
            />
          }
          height={'120px'}
        />
        <ModalRow
          title="URL"
          content={
            <InputBox
              placeholder="http://"
              defaultValue={request.url}
              onChange={(e) => handleChangeInput('url', e.target.value)}
            />
          }
        />
        <ModalRow title="첨부파일" content={<FileUpload />} />
        <ModalRow
          title="예약발행"
          content={
            <DatePicker
              type={'datetime'}
              curDate={request.reserveAt}
              onApply={(val) => handleChangeInput('reserveAt', val)}
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
    console.log(request);
  }, [request]);

  return (
    <Modal isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '푸쉬 추가' : '푸쉬 수정'}
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

export default PushDetailModal;
