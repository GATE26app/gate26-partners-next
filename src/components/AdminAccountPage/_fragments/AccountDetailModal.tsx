/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

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

import DataTable from '@components/AdminAccountPage/_fragments/AuthModalTable';
import {
  MenuAuthColumns,
  MenuColumnType,
} from '@components/AdminAccountPage/_fragments/AuthModalTable.data';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import { DataTableRowType } from '@components/common/DataTable';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

import { formatDate } from '@utils/format';

interface ReqAccountDetailModal {
  title: string;
  banner: File | null;
  home: File | null;
  order: string;
  enable: boolean;
}
interface AccountDetailModalProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}

const AccountDetailModalModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: AccountDetailModalProps) => {
  const [request, setRequest] = useState<ReqAccountDetailModal>({
    title: '',
    banner: null,
    home: null,
    order: '0',
    enable: false,
  });

  const [rows, setRows] = useState<DataTableRowType<MenuColumnType>[]>([
    {
      id: 1,
      name: '이용자',
      status: false,
    },
    {
      id: 2,
      name: '관리자',
      status: false,
    },
    {
      id: 3,
      name: '공통 코드',
      status: false,
    },
    {
      id: 4,
      name: '커뮤니티',
      status: false,
    },
    {
      id: 5,
      name: '모빌리티',
      status: false,
    },
    {
      id: 6,
      name: '공지사항',
      status: false,
    },
    {
      id: 7,
      name: '푸쉬알림 관리',
      status: false,
    },
    {
      id: 8,
      name: '1:1 문의',
      status: false,
    },
    {
      id: 9,
      name: '앱관리',
      status: false,
    },
  ]);

  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setRequest({ ...request, [key]: value });
  };

  const handleValueChange = (id: number, value: boolean) => {
    const rowArr = [...rows];
    const index = rowArr.findIndex((item) => item.id === id);
    rowArr[index].status = value;
    setRows(rowArr);
  };

  const Colunms = new MenuAuthColumns(handleValueChange);

  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="아이디"
          content={
            <InputBox
              placeholder="아이디"
              defaultValue={request.title}
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
          }
        />
        <ModalRow
          title="비밀번호"
          content={<InputBox placeholder="비밀번호" type="password" />}
        />
        <ModalRow title="이름" content={<InputBox placeholder="이름" />} />
        <ModalRow
          title="이메일"
          content={<InputBox placeholder="gate26@toktokhan.dev" />}
        />
        <ModalRow
          title="등록일"
          content={
            <InputBox
              isDisabled
              placeholder={formatDate(dayjs('2022-09-21 09:00'))}
            />
          }
        />
        <ModalRow
          title="사용 여부"
          content={
            <CheckBox
              checked={request.enable}
              onClick={() => handleChangeInput('enable', !request.enable)}
            />
          }
        />
        <ModalRow
          title="권한"
          titleAlign="top"
          height="fit-content"
          content={<DataTable columns={Colunms.LIST_COLUMNS} rows={rows} />}
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
    <Modal isCentered variant={'simple'} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent maxH="unset" marginBottom="0" marginTop="0">
        <ModalHeader>
          {type === 'create' ? '관리자 추가' : '관리자  수정'}
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

export default AccountDetailModalModal;
