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

import CommunityLoungeApi from '@apis/communityLounge/CommunityLoungeApi';
import { CommunityLoungePostType } from '@apis/communityLounge/CommunityLoungeApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

import { validRequest } from './LoungeDetailModal.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface LoungeDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  detail?: {
    targetId: string;
    title: string;
    coverImg: string;
    img: string;
    displayOrder: number;
    openYn: boolean;
  };
  displayMax: number;
  onComplete?: () => void;
}
const LoungeDetailModal = ({
  type,
  detail,
  displayMax,
  onClose,
  onComplete,
  ...props
}: LoungeDetailProps) => {
  const [request, setRequest] = useState<CommunityLoungePostType>({
    title: '',
    displayOrder: detail?.displayOrder ? detail?.displayOrder : 0,
    openYn: false,
  });
  const [url, setUrl] = useState({ imgUrl: '', coverImgUrl: '' });

  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const handleAlert = (message?: string) => {
    if (!message) return;
    dispatch(
      customModalSliceAction.setMessage({
        title: '라운지',
        message,
        type: 'alert',
      }),
    );
    openCustomModal();
  };

  const handleCreate = async () => {
    const valid = validRequest(request);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
    const response = await CommunityLoungeApi.postCommunityLounge(request);
    if (response.tgId) {
      if (onComplete) onComplete();
    }
  };

  const handleUpdate = async () => {
    const newRequest = {
      ...request,
      deleteFile: url.imgUrl === '' && !request.img ? 'delete' : undefined,
      deleteCoverFile:
        url.coverImgUrl === '' && !request.coverImg ? 'delete' : undefined,
    };
    const valid = validRequest(newRequest);
    if (!valid.success) {
      handleAlert(valid.message);
      return;
    }
    const response = await CommunityLoungeApi.putCommunityLounge(newRequest);
    if (response.tgId) {
      if (onComplete) onComplete();
    }
  };

  const handleChangeInput = (
    key: string,
    value: string | number | boolean | File | null,
  ) => {
    setRequest({ ...request, [key]: value });
  };

  const renderContent = () => {
    console.log(request);
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="라운지명"
          content={
            <InputBox
              placeholder="라운지명"
              value={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow
          title="배너 이미지"
          content={
            <FileUpload
              fileValue={url.coverImgUrl}
              onChange={(file) => handleChangeInput('coverImg', file)}
              onDelete={() => setUrl({ ...url, coverImgUrl: '' })}
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
          title="라운지 노출 순서"
          content={
            <CustomSelect
              size="sm"
              items={
                displayMax > 0
                  ? Array.from({ length: displayMax }, (_, idx) => {
                      return { value: idx + 1, label: String(idx + 1) };
                    })
                  : []
              }
              defaultValue={request.displayOrder}
              onChange={(value) =>
                handleChangeInput('displayOrder', value as string)
              }
            />
          }
        />
        <ModalRow
          title="활성화 여부"
          content={
            <CheckBox
              checked={request.openYn}
              onClick={() => handleChangeInput('openYn', !request.openYn)}
            />
          }
        ></ModalRow>
      </Flex>
    );
  };

  const resetData = () => {
    setRequest({
      title: '',
      displayOrder: 0,
      openYn: false,
    });
    setUrl({ imgUrl: '', coverImgUrl: '' });
  };

  useEffect(() => {
    if (type === 'modify') {
      if (!detail) return;
      const { targetId: loungeId, title, displayOrder, openYn } = detail;
      setRequest({ loungeId, title, displayOrder, openYn });
      setUrl({
        imgUrl: detail.img ? detail.img : '',
        coverImgUrl: detail.coverImg ? detail.coverImg : '',
      });
    } else {
      resetData();
    }
  }, [detail]);

  return (
    <Modal isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '라운지 추가' : '라운지 수정'}
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
            text="추가"
            size={'sm'}
            width={'120px'}
            onClick={type === 'create' ? handleCreate : handleUpdate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoungeDetailModal;
