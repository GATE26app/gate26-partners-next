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
  useToast,
} from '@chakra-ui/react';

import adminMenuApi from '@apis/menu/AdminMenuApi';
import {
  AdminMenuInfoDTOType,
  AdminMenuModifyDTOType,
} from '@apis/menu/AdminMenuApi.type';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';

import number from 'yup/lib/number';

let TOP_MENU: { label: any; value: any }[] = [];

interface ReqMenuEditModal {
  topMenu: number | undefined;
  title: string;
  path: string;
  step: number | undefined;
  order: number | undefined;
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
  const toast = useToast();
  const [request, setRequest] = useState<ReqMenuEditModal>({
    topMenu: undefined,
    title: '',
    path: '',
    step: undefined,
    order: undefined,
    enable: false,
  });
  function handleChangeInput(key: string, value: string | boolean | number) {
    const newRequest = { ...request, [key]: value };

    setRequest(newRequest);
  }

  const handleCreate = () => {
    if (onComplete) onComplete();
    if (type === 'create') {
      handleCreateCode();
    } else {
      handleModifyCode();
    }
  };

  const handleCreateCode = () => {
    const body: AdminMenuInfoDTOType = {
      upMenuId: request.topMenu,
      menuName: request.title,
      menuPath: request.path,
      depth: request.step,
      sort: request.order,
      useYn: request.enable,
    };

    adminMenuApi
      .postAddAdminMenu(body)
      .then((response) => {
        const { data, success } = response;
        if (success) {
          onClose();
          toast({
            description: '생성 완료',
          });
        } else {
          toast({
            description: '생성 실패',
          });
        }
      })
      .catch(() => {
        toast({
          description: '생성 실패',
        });
      });
  };

  const handleModifyCode = () => {
    const body: AdminMenuModifyDTOType = {
      menuName: request.title,
      menuPath: request.path,
      depth: request.step,
      sort: request.order,
      useYn: request.enable,
    };

    adminMenuApi
      .putModifyAdminMenu(body, targetId)
      .then((response) => {
        const { data, success } = response;
        if (success) {
          onClose();
          toast({
            description: '수정 완료',
          });
        } else {
          toast({
            description: '수정 실패',
          });
        }
      })
      .catch(() => {
        toast({
          description: '수정 실패',
        });
      });
  };

  useEffect(() => {
    loadParentData();
    console.log('선택한 row :', targetId);
    if (targetId !== undefined) {
      adminMenuApi
        .getAdminMenu(targetId)
        .then((response) => {
          const { message, data, success } = response;
          console.log(response);
          if (success) {
            setRequest({
              topMenu: data?.upMenuId,
              title: data?.menuName,
              path: data?.menuPath,
              step: data?.depth,
              order: data?.sort,
              enable: data?.useYn,
            });
          } else {
            console.log('메뉴 불러오기 실패');
          }
        })
        .catch((err) => console.log('hihihiihi' + err));
    } else {
      setRequest({} as ReqMenuEditModal);
    }
  }, [targetId, type]);

  const loadParentData = () => {
    adminMenuApi
      .getParentAdminMenu()
      .then((response) => {
        const { message, data, success } = response;
        console.log(response);
        console.log(success);
        if (success) {
          console.log(data);
          TOP_MENU = [];
          TOP_MENU.push({
            label: '상위 메뉴',
            value: undefined,
          });
          data?.forEach((element: any) => {
            TOP_MENU.push({
              label: element?.menuName,
              value: element?.menuId,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('업데이트 : ', request);
  }, [request]);

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
              defaultValue={request.topMenu}
              key={request.topMenu}
              onChange={(value) => {
                console.log(request.topMenu);
                handleChangeInput('topMenu', value as number);
              }}
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
            <InputBox
              type="number"
              placeholder="메뉴 단계"
              value={request.step}
              onChange={(e) =>
                handleChangeInput('step', Number(e.target.value))
              }
            />
          }
        />
        <ModalRow
          title="정렬순서"
          content={
            <InputBox
              type="number"
              placeholder="정렬순서"
              value={request.order}
              onChange={(e) =>
                handleChangeInput('order', Number(e.target.value))
              }
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
