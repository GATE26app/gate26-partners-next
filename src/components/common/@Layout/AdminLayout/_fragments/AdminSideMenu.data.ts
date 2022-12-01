export type MenuType = {
  name: string;
  iconOn: string;
  iconOff: string;
  path: string;
  alt: string;
  subMenus?: {
    name: string;
    path: string;
  }[];
};
export const MenuRouter: MenuType[] = [
  {
    name: '이용자',
    iconOn: '/icons/admin/user-on.svg',
    iconOff: '/icons/admin/user-off.svg',
    alt: 'user',
    path: '/user',
    subMenus: [
      {
        name: '회원 목록',
        path: '/user/list',
      },
      {
        name: '회원 관리',
        path: '/user/manage',
      },
      {
        name: '신고 조회',
        path: '/user/report',
      },
    ],
  },
  {
    name: '관리자',
    iconOn: '/icons/admin/admin-on.svg',
    iconOff: '/icons/admin/admin-off.svg',
    path: '/admin',
    alt: 'admin',
    subMenus: [
      {
        name: '관리자 관리',
        path: '/admin/account',
      },
      {
        name: '메뉴 관리',
        path: '/admin/menu',
      },
    ],
  },
  {
    name: '공통 코드',
    iconOn: '/icons/admin/code-on.svg',
    iconOff: '/icons/admin/code-off.svg',
    path: '/admin',
    alt: 'code',
    subMenus: [
      {
        name: '코드 관리',
        path: '/commonCode/managementCode',
      },
      {
        name: '항공사 코드',
        path: '/commonCode/airLineCode',
      },
      {
        name: '공항 코드',
        path: '/commonCode/airportCode',
      },
    ],
  },
  {
    name: '커뮤니티',
    iconOn: '/icons/admin/community-on.svg',
    iconOff: '/icons/admin/community-off.svg',
    path: '/community',
    alt: 'community',
    subMenus: [
      {
        name: '라운지 관리',
        path: '/community/lounge',
      },
      {
        name: '오픈채팅 관리',
        path: '/community/chat',
      },
      {
        name: '여행팁 관리',
        path: '/community/tip',
      },
      {
        name: '이벤트 관리',
        path: '/community/event',
      },
    ],
  },
  {
    name: '모빌리티',
    iconOn: '/icons/admin/mobility-on.svg',
    iconOff: '/icons/admin/mobility-off.svg',
    path: '/mobility',
    alt: 'mobility',
    subMenus: [
      {
        name: '스탬프러리 관리',
        path: '/mobility/stamp',
      },
      {
        name: '항공권 인증',
        path: '/mobility/ticket',
      },
    ],
  },
  {
    name: '공지사항',
    iconOn: '/icons/admin/notice-on.svg',
    iconOff: '/icons/admin/notice-off.svg',
    path: '/notice',
    alt: 'notice',
  },
  {
    name: '푸쉬알림 관리',
    iconOn: '/icons/admin/alarm-on.svg',
    iconOff: '/icons/admin/alarm-off.svg',
    path: '/push',
    alt: 'push',
    subMenus: [
      {
        name: '푸쉬 알림 관리',
        path: '/push/manage',
      },
    ],
  },
  {
    name: '1:1 문의',
    iconOn: '/icons/admin/ask-on.svg',
    iconOff: '/icons/admin/ask-off.svg',
    path: '/oneQuestion',
    alt: 'ask',
  },
  {
    name: '앱 관리',
    iconOn: '/icons/admin/setting-on.svg',
    iconOff: '/icons/admin/setting-off.svg',
    path: '/app',
    alt: 'setting',
    subMenus: [
      {
        name: '앱 버전 관리',
        path: '/app/version',
      },
    ],
  },
];
