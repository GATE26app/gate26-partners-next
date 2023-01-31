import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

import eventApi from '@apis/event/EventApi';
import { EventPostType } from '@apis/event/EventApi.type';
import { PushLoungeListResponse } from '@apis/push/Push.type';
import pushApi from '@apis/push/PushApi';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import RadioButton from '@components/common/CustomRadioButton/RadioButton';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { RadioGroups, validRequest } from './EventDetailModal.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface EventDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  detail: {
    targetId: string;
    title: string;
    content: string;
    contentType: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    img?: string;
    bannerImg?: string;
    loungeId?: string;
  } | null;
  targetId?: string;
  onComplete?: () => void;
}
const EventDetailModal = ({
  isOpen,
  type,
  detail,
  onClose,
  onComplete,
  ...props
}: EventDetailProps) => {
  const [request, setRequest] = useState<EventPostType>({
    title: '',
    content: '',
    contentType: '0',
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [url, setUrl] = useState({ imgUrl: '', bannerImgUrl: '' });
  const [loungeList, setLoungeList] = useState<PushLoungeListResponse[]>([]);

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleAlert = (message?: string) => {
    if (!message) return;
    dispatch(
      customModalSliceAction.setMessage({
        title: '이벤트',
        message,
        type: 'alert',
      }),
    );
    openCustomModal();
  };

  const handleCreate = () => {
    const contentType = RadioGroups.find(
      (item) => item.value === request.contentType,
    )?.label;
    if (!contentType) return;

    const newRequest = { ...request, contentType };
    const valid = validRequest(newRequest);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
    eventApi.postEvent(newRequest).then((response) => {
      if (response && response.eventId) {
        if (onComplete) onComplete();
      }
    });
  };

  const handleUpdate = () => {
    const contentType = RadioGroups.find(
      (item) => item.value === request.contentType,
    )?.label;
    if (!contentType) return;

    const newRequest = {
      ...request,
      contentType,
      deleteFile: url.imgUrl === '' && !request.img ? 'delete' : undefined,
      deleteBannerFile:
        url.bannerImgUrl === '' && !request.bannerImg ? 'delete' : undefined,
    };
    const valid = validRequest(newRequest);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
    eventApi.putEvent(newRequest).then((response) => {
      if (response && response.success) {
        if (onComplete) onComplete();
      }
    });
  };

  const handleChangeInput = (
    key: string,
    value: string | number | dayjs.Dayjs | File | null,
  ) => {
    setRequest({ ...request, [key]: value });
  };

  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="타입"
          content={
            <RadioButton
              group
              groupItems={RadioGroups}
              value={request.contentType}
              onClick={(value) => handleChangeInput('contentType', value)}
            />
          }
        />
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
            request.contentType === '0' ? (
              <InputBox
                placeholder="http://"
                defaultValue={request.content}
                onChange={(e) => handleChangeInput('content', e.target.value)}
              />
            ) : request.contentType === '1' ? (
              <FileUpload />
            ) : (
              <TextareaBox
                placeholder="이벤트 내용"
                h={'300px'}
                defaultValue={request.content}
                onChange={(e) => handleChangeInput('content', e.target.value)}
              />
            )
          }
          height={request.contentType === '2' ? '300px' : undefined}
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
              curDate={request.endDate}
              onApply={(val) => handleChangeInput('endDate', val)}
            />
          }
        />
        <ModalRow
          title="배너 이미지"
          content={
            <FileUpload
              fileValue={url.bannerImgUrl}
              onChange={(file) => handleChangeInput('bannerImg', file)}
              onDelete={() => setUrl({ ...url, bannerImgUrl: '' })}
            />
          }
        />
        <ModalRow
          title="홈 이미지"
          content={
            <FileUpload
              fileValue={url.imgUrl}
              onChange={(file) => handleChangeInput('img', file)}
              onDelete={() => setUrl({ ...url, imgUrl: '' })}
            />
          }
        />
        <ModalRow
          title="표시장소"
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
    setRequest({
      title: '',
      content: '',
      contentType: '0',
      startDate: dayjs(),
      endDate: dayjs(),
      loungeId: '',
    });
    setUrl({ imgUrl: '', bannerImgUrl: '' });
  };

  useEffect(() => {
    if (type === 'modify') {
      if (!detail) return;

      const contentType = RadioGroups.find(
        (item) => item.label === detail.contentType,
      )?.value;
      setRequest({
        eventId: detail.targetId,
        title: detail.title,
        content: detail.content,
        contentType: contentType ? contentType : '0',
        startDate: dayjs(detail.startDate),
        endDate: dayjs(detail.endDate),
        loungeId: detail.loungeId,
      });
      setUrl({
        imgUrl: detail.img ? detail.img : '',
        bannerImgUrl: detail.bannerImg ? detail.bannerImg : '',
      });
    } else {
      resetData();
    }
  }, [detail, type]);

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
            onClick={type === 'create' ? handleCreate : handleUpdate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailModal;
