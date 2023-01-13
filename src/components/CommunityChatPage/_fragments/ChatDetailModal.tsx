import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

import communityChatApi from '@apis/CommunityChat/CommunityChatApi';
import { CommunityChatPostType } from '@apis/CommunityChat/CommunityChatApi.type';
import { PushLoungeListResponse } from '@apis/push/Push.type';
import pushApi from '@apis/push/PushApi';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import CustomSelect from '@components/common/CustomSelect';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

import { validRequest } from './ChatDetailModal.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ChatDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  detail: {
    targetId: string;
    roomName: string;
    loungeId: string;
    img: string;
  } | null;
  onComplete?: () => void;
}
const ChatDetailModal = ({
  type,
  isOpen,
  detail,
  onClose,
  onComplete,
  ...props
}: ChatDetailProps) => {
  const [request, setRequest] = useState<CommunityChatPostType>({
    roomName: '',
    img: null,
  });
  const [loungeList, setLoungeList] = useState<PushLoungeListResponse[]>([]);
  const [imgUrl, setImgUrl] = useState<string>('');

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleAlert = (message?: string) => {
    if (!message) return;
    dispatch(
      customModalSliceAction.setMessage({
        title: '오픈채팅',
        message,
        type: 'alert',
      }),
    );
    openCustomModal();
  };

  const handleCreate = () => {
    const valid = validRequest(request);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
    communityChatApi.postCommunityChat(request).then((response) => {
      if (response && response.roomId) {
        if (onComplete) onComplete();
      }
    });
  };

  const handleUpdate = () => {
    const newRequest = {
      ...request,
      deleteFile: imgUrl === '' && !request.img ? 'delete' : undefined,
    };
    const valid = validRequest(newRequest);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
    communityChatApi.putCommunityChat(newRequest).then((response) => {
      if (response && response.roomId) {
        if (onComplete) onComplete();
      }
    });
  };

  const handleChangeInput = (
    key: string,
    value: string | number | File | null,
  ) => {
    setRequest({ ...request, [key]: value });
  };

  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="채팅명"
          content={
            <InputBox
              placeholder="채팅명"
              defaultValue={request.roomName}
              onChange={(e) => handleChangeInput('roomName', e.target.value)}
            />
          }
        />
        <ModalRow
          title="썸네일 사진"
          content={
            <FileUpload
              fileValue={imgUrl}
              onChange={(file) => handleChangeInput('img', file)}
              onDelete={() => setImgUrl('')}
            />
          }
        />
        <ModalRow
          title="라운지 위치"
          content={
            <CustomSelect
              size="sm"
              items={loungeList.map((item) => ({
                value: item.tgId,
                label: item.loungeName,
              }))}
              defaultValue={request.loungeId}
              onChange={(value) =>
                handleChangeInput('loungeId', value as string)
              }
            />
          }
        />
      </Flex>
    );
  };

  const resetData = () => {
    setRequest({ roomName: '', loungeId: '', img: null, roomId: '' });
    setImgUrl('');
  };
  useEffect(() => {
    if (type === 'modify') {
      if (!detail) return;

      setRequest({
        roomId: detail.targetId,
        roomName: detail.roomName,
        loungeId: detail.loungeId ? detail.loungeId : '',
      });
      setImgUrl(detail.img ? detail.img : '');
    } else {
      resetData();
    }
  }, [detail]);

  useEffect(() => {
    if (!isOpen) resetData();
  }, [isOpen]);

  useEffect(() => {
    pushApi.getPushLoungeList().then((response) => {
      if (response.success) {
        setLoungeList(response.data);
      }
    });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      isCentered
      variant={'simple'}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '오픈채팅 추가' : '오픈채팅 수정'}
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

export default ChatDetailModal;
