import { useEffect } from 'react';
import { useState } from 'react';

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

import {
  PushChatroomListResponse,
  PushLoungeListResponse,
  PushPostType,
} from '@apis/push/Push.type';
import pushApi from '@apis/push/PushApi';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { FCM_TYPE, validRequest } from './PushDetailModal.data';

interface PushDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  detail: {
    targetId: string;
    fcmType: string;
    title: string;
    content: string;
    noticeDate: Dayjs;
    loungeId: string;
    chatRoomId: string;
    coverImg?: string;
  } | null;
  onComplete?: () => void;
}
const PushDetailModal = ({
  type,
  detail,
  onClose,
  onComplete,
  ...props
}: PushDetailProps) => {
  const [request, setRequest] = useState<PushPostType>({
    title: '',
    content: '',
    type: '',
    noticeDate: dayjs(),
  });
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [loungeId, setLoungeId] = useState<string>();
  const [chatroomList, setChatroomList] = useState<PushChatroomListResponse[]>(
    [],
  );
  const [loungeList, setLoungeList] = useState<PushLoungeListResponse[]>([]);
  const [isAllTarget, setAllTarget] = useState<boolean>(false);

  const handleCreate = () => {
    const newRequest = {
      ...request,
      chatRoom: isAllTarget ? undefined : request.chatRoom,
    };
    const valid = validRequest(newRequest);
    if (!valid.success) {
      return alert(valid.message);
    }
    pushApi.postPush(newRequest).then((response) => {
      if (response && response.noticeId) {
        if (onComplete) onComplete();
      }
    });
  };

  const handleUpdate = () => {
    const newRequest = {
      ...request,
      chatRoom: isAllTarget ? undefined : request.chatRoom,
      deleteChatRoom: isAllTarget ? 'delete' : undefined,
      deleteFile:
        coverImgUrl === '' && !request.coverImg ? 'delete' : undefined,
    };
    const valid = validRequest(newRequest);
    if (!valid.success) {
      return alert(valid.message);
    }
    pushApi.putPush(newRequest).then((response) => {
      if (response && response.noticeId) {
        if (onComplete) onComplete();
      }
    });
  };

  const handleChangeInput = (
    key: string,
    value: string | number | dayjs.Dayjs | boolean | File | null,
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
              items={FCM_TYPE}
              defaultValue={request.type}
              onChange={(value) => handleChangeInput('type', value as string)}
            />
          }
        />
        <ModalRow
          title="푸쉬 대상"
          content={
            <Flex rowGap={'10px'} direction={'column'}>
              <Flex columnGap={'10px'}>
                <CustomSelect
                  size="sm"
                  items={loungeList.map((item) => ({
                    value: item.tgId,
                    label: item.loungeName,
                  }))}
                  defaultValue={loungeId}
                  disabled={isAllTarget}
                  onChange={(value) => setLoungeId(value as string)}
                />
                <CustomSelect
                  size="sm"
                  items={chatroomList.map((item) => ({
                    value: item.roomId,
                    label: item.roomName,
                  }))}
                  defaultValue={request.chatRoom}
                  disabled={isAllTarget}
                  onChange={(value) =>
                    handleChangeInput('chatRoom', value as string)
                  }
                />
              </Flex>
              <Flex>
                <CheckBox
                  checked={isAllTarget}
                  onClick={() => setAllTarget(!isAllTarget)}
                >
                  전체발송하기
                </CheckBox>
              </Flex>
            </Flex>
          }
          height={'80px'}
        />
        <ModalRow
          title="제목"
          content={
            <InputBox
              placeholder="제목"
              value={request.title}
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
              value={request.content}
              onChange={(e) => handleChangeInput('content', e.target.value)}
            />
          }
          height={'120px'}
        />
        <ModalRow
          title="첨부파일"
          content={
            <FileUpload
              fileValue={coverImgUrl}
              onChange={(file) => handleChangeInput('coverImg', file)}
              onDelete={() => setCoverImgUrl('')}
            />
          }
        />
        <ModalRow
          title="예약발행"
          content={
            <DatePicker
              type={'datetime'}
              curDate={request.noticeDate}
              onApply={(val) => handleChangeInput('noticeDate', val)}
            />
          }
        />
      </Flex>
    );
  };

  const resetData = () => {
    setRequest({
      title: '',
      content: '',
      type: '',
      chatRoom: undefined,
      noticeDate: dayjs(),
    });
    setLoungeId(undefined);
    setAllTarget(false);
    setCoverImgUrl('');
    setChatroomList([]);
  };
  useEffect(() => {
    if (type === 'modify') {
      if (!detail) return;

      const request = {
        noticeId: detail.targetId,
        type: detail.fcmType,
        title: detail.title,
        chatRoom: detail.chatRoomId,
        content: detail.content,
        noticeDate: dayjs(detail.noticeDate),
      };
      setRequest(request);
      setLoungeId(detail.loungeId);
      if (!detail.chatRoomId) setAllTarget(true);
      if (detail.coverImg) setCoverImgUrl(detail.coverImg);
    } else {
      resetData();
    }
  }, [detail]);

  useEffect(() => {
    pushApi.getPushLoungeList().then((response) => {
      if (response.success) {
        setLoungeList(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!loungeId) return;
    pushApi.getPushChatroomList({ loungeId }).then((response) => {
      if (response.success) {
        setChatroomList(response.data);
        setRequest({ ...request, chatRoom: response.data[0].roomId });
      }
    });
  }, [loungeId]);

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
            onClick={type === 'create' ? handleCreate : handleUpdate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PushDetailModal;
