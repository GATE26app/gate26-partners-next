/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback, useRef } from 'react';

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

import AdminAccountApi from '@apis/admin/AdminAccountApi';

interface ReqAccountDetailModal {
  title: string;
  banner: File | null;
  home: File | null;
  order: string;
}

interface AccountDetailModalProps extends Omit<ModalProps, 'children'> {
  type?: 'create' | 'modify';
  targetId?: number | string;
  onComplete?: () => void;
}

interface AccountDetailInfoProps {
  adminId: string;
  adminName: string;
  adminEmail: string;
  createdDate: string;
  useYn: string;
}

const AccountDetailModalModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: AccountDetailModalProps) => {

  const defaultValue = {
    adminId: '',
    adminName: '',
    adminEmail: '',
    useYn: 'F',
    createdDate: ''
  };

  const [admin, setAdmin] = useState<AccountDetailInfoProps>(defaultValue);
  const [request, setRequest] = useState<ReqAccountDetailModal>({
    title: '',
    banner: null,
    home: null,
    order: '0'
  });

  const [checked, setChecked] = useState<boolean>(false);

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

  // 관리자 상세 정보 호출
  const getAdminAccountByAdminId = useCallback((params) => {
    AdminAccountApi.getAdminAccountByAdminId(params).then((response) => {
          const { success, data, message } = response;
          if (success) {
            // 어드민 정보 셋팅
            setAdmin(data as AccountDetailInfoProps);
            setChecked(data?.useYn === 'T' ? true : false);
          } else {
          }
        });
  },[]);

  // 관리자 수정 API 호출
  const updateAdminAccount = useCallback((params) => {
    AdminAccountApi.updateAdminAccount(params).then((response) => {
          const { success, data, message } = response;
          if (success) {
            console.log("수정");
          } else {
            console.log(message);
          }
        });
  },[]);

  // 관리자 추가 API 호출
  const createAdminAccount = useCallback((params) => {
    AdminAccountApi.createAdminAccount(params).then((response) => {
          const { success, data, message } = response;
          if (success) {
            console.log("생성");
          } else {
            console.log(message);
          }
        });
  },[]);

  const handleChangeInput = (key: string, value: string | number | boolean) => {
    if(key === 'useYn') {
      setChecked(!checked as boolean);
      value = (!value === true) ? 'T' : 'F';
    }
    setAdmin({ ...admin, [key]: value });
  };

  const handleValueChange = (id: number, value: boolean) => {
    const rowArr = [...rows];
    const index = rowArr.findIndex((item) => item.id === id);
    rowArr[index].status = value;
    setRows(rowArr);
  };

  const Colunms = new MenuAuthColumns(handleValueChange);

  const handleCreate = () => {
    if(type === 'modify') {
      updateAdminAccount(admin);
    } else {
      createAdminAccount(admin);
    }
    if (onComplete) onComplete();
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'15px'}>
        <ModalRow
          title="아이디"
          content={
            <InputBox
              isDisabled = {type === 'modify' ? true : false}
              placeholder="아이디"
              value={admin.adminId}
              onChange={(e) => handleChangeInput('adminId', e.target.value)}
            />
          }
        />
        <ModalRow
          title="비밀번호"
          content={<InputBox placeholder="새 비밀번호" type="password" onChange={(e) => handleChangeInput('adminPwd', e.target.value)}/>}
        />
        <ModalRow 
          title="이름" 
          content={<InputBox placeholder="이름" value={admin.adminName} onChange={(e) => handleChangeInput('adminName', e.target.value)}/>} />
        <ModalRow
          title="이메일"
          content={<InputBox type="email" value={admin.adminEmail} placeholder="gate26@toktokhan.dev" onChange={(e) => handleChangeInput('adminEmail', e.target.value)} />}
        />
        <ModalRow
          title="등록일"
          content={
            <InputBox
              isDisabled
              value={type === 'modify' ? formatDate(dayjs(admin.createdDate)) : formatDate(dayjs(Date()))}
              placeholder={formatDate(dayjs(Date()))}
            />
          }
        />
        <ModalRow
          title="사용 여부"
          content={
            <CheckBox
              checked={checked}
              onClick={() => handleChangeInput('useYn', checked)}
            />
          }
        />
        {/* <ModalRow
          title="권한"
          titleAlign="top"
          height="fit-content"
          content={<DataTable columns={Colunms.LIST_COLUMNS} rows={rows} />}
        /> */}
      </Flex>
    );
  };

  useEffect(() => {
    if (type !== 'modify') { // 추가하기
      return() => {
        // unmount
        setAdmin(defaultValue); // 초기값 세팅
      };
    }
    getAdminAccountByAdminId(targetId);
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
            text= {type === 'create' ? '추가' : '수정'}
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
