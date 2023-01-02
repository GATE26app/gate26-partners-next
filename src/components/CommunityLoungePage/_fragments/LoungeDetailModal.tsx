import { useEffect, useState } from 'react';

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
import { CommunityLoungeDTOType } from '@apis/communityLounge/CommunityLoungeApi.type';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

interface LoungeDetailProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  detail: {
    targetId?: string;
    title?: string;
    coverImg?: string;
    img?: string;
    displayOrder?: number;
    openYn?: boolean;
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
  const [request, setRequest] = useState<CommunityLoungeDTOType>({
    title: '',
    displayOrder: detail.displayOrder ? detail.displayOrder : 0,
    openYn: false,
  });
  const [url, setUrl] = useState({ imgUrl: '', coverImgUrl: '' });

  const handleChangeInput = (
    key: string,
    value: string | number | boolean | File,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const handleCreate = async () => {
    const response = await CommunityLoungeApi.postCommunityLounge(request);
    if (response.tgId) {
      if (onComplete) onComplete();
    }
  };

  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="라운지명"
          content={
            <InputBox
              placeholder="라운지명"
              defaultValue={request.title}
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
            />
          }
        />
        <ModalRow
          title="홈 이미지"
          content={
            <FileUpload
              fileValue={url.imgUrl}
              onChange={(file) => handleChangeInput('img', file)}
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

  useEffect(() => {
    const request: CommunityLoungeDTOType = {
      title: detail.title ? detail.title : '',
      displayOrder: detail.displayOrder ? detail.displayOrder : 0,
      openYn: detail.openYn ? detail.openYn : false,
    };
    const url = {
      imgUrl: detail.img ? detail.img : '',
      coverImgUrl: detail.coverImg ? detail.coverImg : '',
    };
    setRequest(request);
    setUrl(url);
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
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoungeDetailModal;
