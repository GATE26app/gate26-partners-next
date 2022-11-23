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
}

const MenuSelect = ({ onClickEdit, onClickDelete }: MenuSelectProps) => {
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
      </MenuList>
    </Menu>
  );
};

export default MenuSelect;
