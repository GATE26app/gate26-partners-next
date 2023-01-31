import { useRouter } from 'next/router';
import { useRef } from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';
import { useDisclosure, useOutsideClick } from '@chakra-ui/react';

import ArrowDownIcon from '@components/common/@Icons/Admin/ArrowDown';

import styled from '@emotion/styled';
import {
  deleteNickName,
  deleteToken,
  deleteUserId,
  getNickName,
} from '@utils/localStorage/token';

const AdminHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOutsideClick({
    ref,
    handler: onClose,
  });

  const onClickLogout = () => {
    deleteUserId();
    deleteToken();
    deleteNickName();
    alert('로그아웃 완료!');
    Logout();
  };

  const Logout = () => {
    router.push('/login');
  };

  return (
    <Header
      className="admin-header"
      w="100%"
      h={'60px'}
      justifyContent="space-between"
      alignItems="center"
    >
      <Image
        src="/images/header/logo.svg"
        w="161px"
        h="30px"
        cursor="pointer"
      />
      <div className="admin-header-profile" onClick={onOpen}>
        <Image src="/images/header/profile.png" w="30px" h="30px" />
        <div className="profile-name">
          {getNickName() !== undefined && getNickName()} 님
        </div>
        <ArrowDownIcon
          color="white"
          style={{
            transform: isOpen ? 'rotate(180deg)' : '',
          }}
          // transform={isOpen ? 'rotate(180deg)' : null}
        />
        {isOpen && (
          <div className="admin-menu" id="adminMenu" ref={ref}>
            <Text
              textStyle="textSm"
              color="primary.500"
              onClick={onClickLogout}
            >
              로그아웃
            </Text>
          </div>
        )}
      </div>
    </Header>
  );
};

const Header = styled(Flex)`
  &.admin-header {
    padding: 20px 15px;
    background: linear-gradient(180deg, #ff5942 0%, #ff6b6b 100%);
    .admin-header-profile {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      > img {
        margin-right: 8px;
      }
      .admin-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100px;
        height: 40px;
        background-color: #ffffff;
        box-shadow: 0px 0px 10px rgba(26, 26, 26, 0.1);
        border-radius: 5px;
        top: 40px;
        right: 0;
      }
      .profile-name {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em;
        color: #ffffff;
        margin-right: 18px;
      }
    }
  }
`;
export default AdminHeader;
