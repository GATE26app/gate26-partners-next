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

import { StampDTOType, StampUpdateDTOType } from '@apis/stamp/StampApis.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import FileUpload from '@components/common/FileUpload/FileUpload';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

import { SEARCH_TYPE, valideRequest } from './MobilityStampModal.data';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface StampProps extends Omit<ModalProps, 'children'> {
  isOpen: boolean;
  type?: string;
  targetId?: number;
  modifyData?: StampUpdateDTOType;
  onComplete: (data: StampDTOType) => void;
  onModify: (data: StampUpdateDTOType) => void;
}
const StampModal = ({
  isOpen,
  type,
  targetId,
  modifyData,
  onClose,
  onComplete,
  onModify,
  ...props
}: StampProps) => {
  const [request, setRequest] = useState<StampDTOType | StampUpdateDTOType>({
    stampName: '',
    stampType: SEARCH_TYPE[0].value,
    descText: '',
    useYn: 'F',
    img: undefined,
  });
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
  const [imagePath, setImagePath] = useState<string | undefined>(undefined);
  const handleAlert = (message?: string) => {
    if (!message) return;
    dispatch(
      customModalSliceAction.setMessage({
        title: '스탬프러리 관리',
        message,
        type: 'alert',
      }),
    );
    openCustomModal();
  };
  const handleCreate = () => {
    const valid = valideRequest(request);
    if (!valid.success) return handleAlert(valid.message);

    if (type === 'create') {
      onComplete(request as StampDTOType);
    } else {
      onModify(request as StampUpdateDTOType);
    }
  };
  const handleChangeInput = (
    key: string,
    value: string | number | File | null,
  ) => {
    if (key === 'img') {
      if (!value) setRequest({ ...request, img: undefined, deleteFile: 'Y' });
      else if (value instanceof File)
        setRequest({ ...request, img: value, deleteFile: undefined });
      return;
    }
    setRequest({ ...request, [key]: value });
  };
  useEffect(() => {
    if (modifyData) {
      setRequest({ ...modifyData });
      if (modifyData.imagePath) setImagePath(modifyData.imagePath);
    }
    if (!isOpen) {
      setImagePath(undefined);
      setRequest({
        stampName: '',
        stampType: SEARCH_TYPE[0].value,
        descText: '',
        useYn: 'F',
        img: undefined,
      });
    }
  }, [modifyData, isOpen]);
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="스탬프러리 유형"
          content={
            <CustomSelect
              width={'100px'}
              placeholder={'Type'}
              defaultValue={request.stampType}
              onChange={(value: any) => handleChangeInput('stampType', value)}
              items={SEARCH_TYPE}
            />
          }
        />
        <ModalRow
          title="스탬프러리명"
          content={
            <InputBox
              placeholder=""
              value={request.stampName}
              onChange={(e) => handleChangeInput('stampName', e.target.value)}
            />
          }
        />
        <ModalRow
          title="스탬프러리 설명"
          height="120px"
          content={
            <InputBox
              value={request.descText}
              onChange={(e) => handleChangeInput('descText', e.target.value)}
              h="120px"
            />
          }
        />
        <ModalRow
          title="이미지"
          content={
            <FileUpload
              fileValue={imagePath}
              onChange={(file) => handleChangeInput('img', file)}
              onDelete={() => handleChangeInput('deleteFile', 'yes')}
            />
          }
        />
        <ModalRow
          title="사용 여부"
          content={
            <CheckBox
              checked={request.useYn === 'T'}
              onClick={() =>
                handleChangeInput('useYn', request.useYn === 'T' ? 'F' : 'T')
              }
            >
              {'사용'}
            </CheckBox>
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
      isOpen={isOpen}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'create' ? '스탬프러리 추가' : '스탬프러리 수정'}
        </ModalHeader>

        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-grayscale"
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

export default StampModal;
