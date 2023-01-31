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

import {
  TipPostType,
  TipPutType,
} from '@apis/communityTip/communityTipApi.type';

import { validRequest } from '@components/CommunityTipPage/_fragments/TipDetailModal.data';
import Button from '@components/common/Button';
import CustomSelect from '@components/common/CustomSelect';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

interface TipDetailProps extends Omit<ModalProps, 'children'> {
  isOpen: boolean;
  type?: 'create' | 'modify';
  targetId?: number;
  modifyData?: TipPutType;
  onComplete: (data: TipPostType) => void;
  onModify: (data: TipPutType) => void;
  onOpenAlert: (message: string) => void;
}
interface ICategoty {
  [key: string]: string; // index signature 추가, key는 정해진 키워드가 아니며 변경 가능하다.
}

const categoryValue: ICategoty = {
  HOTPLACE: '1',
  FOOD: '2',
  TOUR: '3',
  FLIGHT: '4',
  SHOPPING: '5',
  HOTEL: '6',
  OOTD: '7',
};

type ImagesType = {
  homeImage?: string;
  bannerImage?: string;
};

const TipDetailModal = ({
  isOpen,
  type,
  targetId,
  modifyData,
  onClose,
  onComplete,
  onModify,
  onOpenAlert,
  ...props
}: TipDetailProps) => {
  const [request, setRequest] = useState<TipPostType | TipPutType>({
    tipTitle: '',
    img: undefined,
    bannerImg: undefined,
    category: '1',
  });
  const [imagePath, setImagePath] = useState<ImagesType>({
    homeImage: undefined,
    bannerImage: undefined,
  });
  const handleChangeInput = (
    key: string,
    value: string | number | File | null,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const handleCreate = () => {
    const valid = validRequest(request);
    if (!valid.success && valid.message) return onOpenAlert(valid.message);

    if (type === 'create') {
      onComplete(request as TipPostType);
    } else {
      onModify(request as TipPutType);
    }
  };

  useEffect(() => {
    if (modifyData) {
      setRequest({
        ...modifyData,
        category: categoryValue[modifyData.category as string],
      });

      setImagePath({
        homeImage: modifyData.homeImage,
        bannerImage: modifyData.bannerImage,
      });
    }
    if (!isOpen) {
      setImagePath({
        homeImage: undefined,
        bannerImage: undefined,
      });
      setRequest({
        tipTitle: '',
        img: undefined,
        bannerImg: undefined,
        category: '1',
      });
    }
  }, [modifyData, isOpen]);
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="제목"
          content={
            <InputBox
              placeholder="여행팁 제목"
              defaultValue={request.tipTitle}
              onChange={(e) => handleChangeInput('tipTitle', e.target.value)}
            />
          }
        />
        <ModalRow
          title="홈 이미지"
          content={
            <FileUpload
              fileValue={imagePath?.homeImage}
              onChange={(file) => handleChangeInput('img', file)}
              onDelete={() => handleChangeInput('deleteFile', 'yes')}
            />
          }
        />
        <ModalRow
          title="배너 이미지"
          content={
            <FileUpload
              fileValue={imagePath?.bannerImage}
              onChange={(file) => handleChangeInput('bannerImg', file)}
              onDelete={() => handleChangeInput('deleteBannerFile', 'yes')}
            />
          }
        />
        <ModalRow
          title="카테고리"
          content={
            <CustomSelect
              size="sm"
              items={[
                { value: '1', label: '핫플레이스' },
                { value: '2', label: '로컬맛집' },
                { value: '3', label: '투어/액티비티' },
                { value: '4', label: '항공' },
                { value: '5', label: '쇼핑템' },
                { value: '6', label: '숙소뷰' },
                { value: '7', label: '여행룩' },
              ]}
              defaultValue={request.category}
              onChange={(value) =>
                handleChangeInput('category', value as string)
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
    <Modal
      isCentered
      variant={'simple'}
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '여행팁 추가' : '여행팁 수정'}
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

export default TipDetailModal;
