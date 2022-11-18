import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
} from '@chakra-ui/react';

import ArrowRightIcon from '@components/common/@Icons/Admin/ArrowRight';

import styled from '@emotion/styled';

import { MenuRouter, MenuType } from './AdminSideMenu.data';

interface AdminSideMenuProps {
  children: any;
}

const AdminSideMenu = ({ children }: AdminSideMenuProps) => {
  const router = useRouter();

  const getActiveRow = () => {
    const activeArr: number[] = [];
    MenuRouter.forEach((route, index: number) => {
      const isActive = router.pathname.includes(route.path);
      if (isActive) {
        activeArr.push(index);
      }
    });
    return activeArr;
  };

  const handleClickMenu = (route: MenuType) => {
    if (route.subMenus) return;
    router.push(route.path);
  };

  const renderMenu = () => {
    return MenuRouter.map((route) => {
      const isActive = router.pathname.includes(route.path);
      return (
        <AccodionRow key={`${route.name}_${route.path}`}>
          <AccordionButton>
            <div
              className={`sidemenu-item ${isActive ? 'active' : ''}`}
              onClick={() => handleClickMenu(route)}
            >
              <img
                src={isActive ? route.iconOn : route.iconOff}
                alt={route.alt}
              />
              <span>{route.name}</span>
            </div>
          </AccordionButton>

          {route.subMenus && (
            <AccordionPanel>
              {route.subMenus.map((subRoute) => {
                const isActive = subRoute.path === router.pathname;
                return (
                  <Link
                    key={`${subRoute.name}_${subRoute.path}`}
                    href={subRoute.path}
                  >
                    <div
                      className={`sidemenu-sub-item ${isActive && 'active'}`}
                    >
                      <span>{subRoute.name}</span>
                      {isActive && <ArrowRightIcon />}
                    </div>
                  </Link>
                );
              })}
            </AccordionPanel>
          )}
        </AccodionRow>
      );
    });
  };

  return (
    <WrapperSideMenu>
      <SideMenu className="admin-sidemenu">
        <Accordion w={'100%'} defaultIndex={getActiveRow()} allowMultiple>
          {renderMenu()}
        </Accordion>
      </SideMenu>
      {children}
    </WrapperSideMenu>
  );
};

const WrapperSideMenu = styled.div`
  display: flex;
`;

const SideMenu = styled(Flex)`
  &.admin-sidemenu {
    padding: 15px;
    width: 200px;
    height: 100vh;
    background-color: #ffffff;
    border-right: 1px solid #e5e7ec;
    .sidemenu-item {
      display: flex;
      align-items: center;
      padding: 13px 15px;
      width: 100%;
      height: 50px;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.02em;
      color: #757983;
      > img {
        margin-right: 8px;
      }
      &.active {
        background: #ffdfdb;
        border-radius: 5px;
        color: #ff5942;
      }
    }
    .sidemenu-sub-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      display: flex;
      align-items: flex-end;
      letter-spacing: -0.02em;
      color: #b8bcc8;
      &.active {
        color: #1a1a1a;
      }
    }
  }
`;

const AccodionRow = styled(AccordionItem)`
  border: 0;
  .chakra-accordion__button {
    padding: 0;
    border: 0;
  }
  .chakra-accordion__panel {
    padding: 16px 25px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }
`;

export default AdminSideMenu;
