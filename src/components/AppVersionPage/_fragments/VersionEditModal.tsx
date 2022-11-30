/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import { string } from 'yup';

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
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

interface ReqVersionEditModal {
  os: string;
  majorVer: string;
  minorVer: string;
  patchVer: string;
  releaseContent: string;
  releaseStatus: string;
}

export interface VersionEditModalProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}

const VersionEditModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: VersionEditModalProps) => {
  const [request, setRequest] = useState<ReqVersionEditModal>({
    os: '',
    majorVer: '',
    minorVer: '',
    patchVer: '',
    releaseContent: '',
    releaseStatus: '',
  });

  const handleCreate = () => {
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (type !== 'modify') {
      return;
    }
    console.log('선택한 row :', targetId);
  }, [targetId, type]);
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };

    setRequest(newRequest);
  }
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="OS"
          content={
            <InputBox
              placeholder="OS"
              value={request.os}
              onChange={(e) => handleChangeInput('os', e.target.value)}
            />
          }
        />
        <ModalRow
          title="Major Version"
          content={
            <InputBox
              placeholder="Major Version"
              value={request.majorVer}
              onChange={(e) => handleChangeInput('majorVer', e.target.value)}
            />
          }
        />
        <ModalRow
          title="Minor Version"
          content={
            <InputBox
              placeholder="Minor Version"
              value={request.minorVer}
              onChange={(e) => handleChangeInput('minorVer', e.target.value)}
            />
          }
        />
        <ModalRow
          title="Patch Version"
          content={
            <InputBox
              placeholder="Patch Version"
              value={request.patchVer}
              onChange={(e) => handleChangeInput('patchVer', e.target.value)}
            />
          }
        />
        <ModalRow
          title="업데이트 내용"
          height="120px"
          titleAlign="top"
          content={
            <TextareaBox
              placeholder="업데이트 내용"
              h={'120px'}
              defaultValue={request.releaseContent}
              onChange={(e) =>
                handleChangeInput('releaseContent', e.target.value)
              }
            />
          }
        />
        <ModalRow
          title="릴리즈 상태"
          content={
            <InputBox
              placeholder="릴리즈 상태"
              value={request.releaseStatus}
              onChange={(e) =>
                handleChangeInput('releaseStatus', e.target.value)
              }
            />
          }
        />
      </Flex>
    );
  };

  return (
    <Modal size="md" isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent maxH="unset" marginBottom="0" marginTop="0">
        <ModalHeader>
          {type === 'create' ? '앱 버전 추가' : '앱 버전 수정'}
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

export default VersionEditModal;
