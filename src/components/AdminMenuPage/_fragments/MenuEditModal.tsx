/* eslint-disable @typescript-eslint/no-unused-vars */
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

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

const TOP_MENU = [
  { value: 1, label: '이용자' },
  { value: 2, label: '관리자' },
  { value: 3, label: '공통 코드' },
  { value: 4, label: '커뮤니티' },
  { value: 5, label: '모빌리티' },
  { value: 6, label: '공지사항' },
  { value: 7, label: '푸쉬알림 관리' },
  { value: 8, label: '1:1문의' },
  { value: 9, label: '앱 관리' },
];

interface ReqMenuEditModal {
  topMenu: string;
  title: string;
  path: string;
  step: string;
  order: string;
  enable: boolean;
}

export interface MenuEditModalProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}

const MenuEditModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: MenuEditModalProps) => {
  const [request, setRequest] = useState<ReqMenuEditModal>({
    topMenu: '',
    title: '',
    path: '',
    step: '',
    order: '',
    enable: false,
  });
  function handleChangeInput(key: string, value: string | boolean) {
    const newRequest = { ...request, [key]: value };

    setRequest(newRequest);
  }

  const handleCreate = () => {
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (type !== 'modify') {
      return;
    }
    console.log('선택한 row :', targetId);
  }, [targetId, type]);
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="상위 메뉴"
          content={
            <CustomSelect
              width={'100px'}
              placeholder={'상위 메뉴'}
              items={TOP_MENU}
              value={request.topMenu}
              onChange={(value) =>
                handleChangeInput('topMenu', value as string)
              }
            />
          }
        />
        <ModalRow
          title="메뉴 제목"
          content={
            <InputBox
              placeholder="메뉴 제목"
              value={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow
          title="WEB 경로"
          content={
            <InputBox
              placeholder="ex) /admin/list"
              value={request.path}
              onChange={(e) => handleChangeInput('path', e.target.value)}
            />
          }
        />
        <ModalRow
          title="메뉴 단계"
          content={
            <CustomSelect
              width={'100px'}
              placeholder={'Type'}
              items={[
                { value: 1, label: '0' },
                { value: 2, label: '1' },
                { value: 3, label: '2' },
                { value: 4, label: '3' },
              ]}
              value={request.step}
              onChange={(value) => handleChangeInput('step', value as string)}
            />
          }
        />
        <ModalRow
          title="정렬순서"
          content={
            <CustomSelect
              width={'100px'}
              placeholder={'Type'}
              items={[
                { value: 1, label: '0' },
                { value: 2, label: '1' },
                { value: 3, label: '2' },
                { value: 4, label: '3' },
              ]}
              value={request.order}
              onChange={(value) => handleChangeInput('order', value as string)}
            />
          }
        />
        <ModalRow
          title="사용 여부"
          content={
            <CheckBox
              checked={request.enable}
              onClick={() => handleChangeInput('enable', !request.enable)}
            >
              사용
            </CheckBox>
          }
        />
      </Flex>
    );
  };

  return (
    <Modal isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent maxH="unset" marginBottom="0" marginTop="0">
        <ModalHeader>
          {type === 'create' ? '메뉴 추가' : '메뉴 수정'}
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

export default MenuEditModal;
