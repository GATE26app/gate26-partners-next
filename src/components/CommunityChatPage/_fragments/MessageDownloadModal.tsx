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
import { ChatMessageRequestType, ChatroomListInfo } from '@apis/CommunityChat/CommunityChatApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import CustomSelect from '@components/common/CustomSelect';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import useExcelSheetDown from '@hooks/useExcelSheetDown';

import { validRequest } from './MessageDownloadModal.data';
import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import { formatDateDash, checkInvalidDateYYYYMMDD } from 'utils/format';

interface MessageDownloadProps extends Omit<ModalProps, 'children'> {
  detail: {
    targetId: string;
    roomName: string;
    loungeId: string;
    img: string;
  } | null;
  onComplete?: () => void;
}
const MessageDownloadModal = ({
  isOpen,
  detail,
  onClose,
  onComplete,
  ...props
}: MessageDownloadProps) => {
  const [request, setRequest] = useState<ChatMessageRequestType>({
    roomId: '',
    startDate: formatDateDash(Date.now()),
    endDate: formatDateDash(Date.now())
  });
  const roomTypes = [
    {'type': 'LOUNGE', 'name': '라운지'},
    {'type': 'GROUP', 'name': '소모임'}
  ]

  const [roomList, setRoomList] = useState<ChatroomListInfo[]>([]);
  const [selectedType, setRoomType] = useState<string>('LOUNGE');
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

  const getChatListByType = (roomType: string) => {
    console.log(roomType);
    communityChatApi.getChatroomListByRoomType(roomType).then((response) => {
      if (response.success) {
        if(response.data.length > 0) {
          handleChangeInput('roomId', response.data[0].roomId);
        }
        setRoomList(response.data);
        console.log(response.data);
      }
    });
  };

  const handleChangeInput = (
    key: string,
    value: string | number | File | null,
  ) => {
    setRequest({ ...request, [key]: value });
  };

  const handleRoomList = (
    value: string,
  ) => {
    setRoomType(value);
    getChatListByType(value);
  };

  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="채팅방 유형"
          content={
            <CustomSelect
              size="sm"
              items={roomTypes.map((item) => ({
                value: item.type,
                label: item.name,
              }))}
              defaultValue={selectedType}
              onChange={(value) =>
                handleRoomList(value as string)
              }
            />
          }
        />
        <ModalRow
          title="채팅방 선택"
          content={
            <CustomSelect
              size="sm"
              items={roomList.map((item) => ({
                value: item.roomId as string,
                label: item.roomName,
              }))}
              defaultValue={request.roomId}
              onChange={(value) =>
                handleChangeInput('roomId', value as string)
              }
            />
          }
        />
        <ModalRow
          title="조회 시작 일자"
          content={
            <InputBox
              isInvalid={checkInvalidDate(request.startDate)}
              errorBorderColor='red.300'
              placeholder="yyyy-MM-dd"
              defaultValue={request.startDate as string}
              onChange={(e) => handleChangeInput('startDate', e.target.value)}
            />
          }
        />
        <ModalRow
          title="조회 종료 일자"
          content={
            <InputBox
              isInvalid={checkInvalidDate(request.endDate)}
              errorBorderColor='red.300'
              placeholder="yyyy-MM-dd"
              defaultValue={request.endDate as string}
              onChange={(e) => handleChangeInput('endDate', e.target.value)}
            />
          }
        />
      </Flex>
    );
  };

  const checkInvalidDate = (d: string) => {
    var isValidDate = Date.parse(d);
    if (isNaN(isValidDate) || !checkInvalidDateYYYYMMDD(d)){
      return true;
    }
    return false;
  }

  const onClickDownload = () => {
    let cnt = 0;
    const valid = validRequest(request);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
   
    communityChatApi.getMessagesByRoomIdAndDate(request).then((response) => {
      if (response.success) {
        let dateStr = Object.keys(response.data);
        console.log(dateStr);
        // dateStr.forEach(element => {
        //   cnt += response.data[sheetName].length;
        // });
        useExcelSheetDown(response.data, "채팅방데이터");
      }
    });
  };

  useEffect(() => {
    let defaultDate = formatDateDash(Date.now());
    getChatListByType('LOUNGE');
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
          {'채팅 데이터 엑셀 다운로드'}
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
            text={'엑셀 다운로드'}
            size={'sm'}
            width={'120px'}
            onClick={onClickDownload}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageDownloadModal;
