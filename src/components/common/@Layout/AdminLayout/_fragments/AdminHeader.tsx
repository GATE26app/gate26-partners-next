import { Flex, Image } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import ArrowDownIcon from '@components/common/@Icons/Admin/ArrowDown';

import styled from '@emotion/styled';
import { getNickName } from '@utils/localStorage/token';

const AdminHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   const cssByVariant = HOME_HEADER_VARIANTS[variant];

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
      <div className="admin-header-profile">
        <Image src="/images/header/profile.png" w="30px" h="30px" />
        <div className="profile-name">{getNickName()} 님</div>
        <ArrowDownIcon />
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
      > img {
        margin-right: 8px;
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
