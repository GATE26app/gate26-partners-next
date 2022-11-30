/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import {
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
import { DataTableRowType } from '@components/common/DataTable';

interface ReqAuthChangeModal {
  title: string;
  banner: File | null;
  home: File | null;
  order: string;
  enable: boolean;
}
interface AuthChangeModalProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number;
  onComplete?: () => void;
}

const AuthChangeModalModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: AuthChangeModalProps) => {
  const [request, setRequest] = useState<ReqAuthChangeModal>({
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
        <ModalHeader>권한 수정</ModalHeader>
        <ModalBody>
          <DataTable columns={Colunms.LIST_COLUMNS} rows={rows} />
        </ModalBody>
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
            text="수정"
            size={'sm'}
            width={'120px'}
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthChangeModalModal;
