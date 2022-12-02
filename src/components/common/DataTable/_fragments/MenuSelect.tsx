import React from 'react';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import MoreIcon from '@components/common/@Icons/Admin/More';

interface MenuSelectProps {
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  onClickRegister?: () => void;
  onClickAtom?: () => void;
  onClickRefusal?: () => void;
  state: any;
}

const MenuSelect = ({
  onClickEdit,
  onClickDelete,
  onClickRegister,
  onClickRefusal,
  onClickAtom,
  state,
}: MenuSelectProps) => {
  const handleClickEdit = (e: any) => {
    if (onClickEdit) {
      onClickEdit();
    }
  };

  const handleClickDelete = (e: any) => {
    if (onClickDelete) {
      onClickDelete();
    }
  };
  const handleClickRegister = (e: any) => {
    if (onClickRegister) {
      onClickRegister();
    }
  };
  const handleClickRefusal = (e: any) => {
    if (onClickRefusal) {
      onClickRefusal();
      console.log(state);
    }
  };
  const handleClickAtom = (e: any) => {
    if (onClickAtom) {
      onClickAtom();
    }
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MoreIcon />}
        variant="unstyled"
      />
      <MenuList>
        {onClickEdit && <MenuItem onClick={handleClickEdit}>수정</MenuItem>}
        {onClickDelete && <MenuItem onClick={handleClickDelete}>삭제</MenuItem>}
        {onClickRegister && state !== 0 && (
          <MenuItem onClick={handleClickRegister}>등록</MenuItem>
        )}
        {onClickRefusal && state !== 1 && (
          <MenuItem onClick={handleClickRefusal}>거절</MenuItem>
        )}
        {onClickAtom && state !== 2 && (
          <MenuItem onClick={handleClickAtom}>대기</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuSelect;
