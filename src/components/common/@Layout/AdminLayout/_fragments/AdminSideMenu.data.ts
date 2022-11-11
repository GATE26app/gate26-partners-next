export type MenuType = {
  name: string;
  iconOn: string;
  iconOff: string;
  path: string;
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
    path: '/user',
  },
  {
    name: '어드민',
    iconOn: '/icons/admin/admin-on.svg',
    iconOff: '/icons/admin/admin-off.svg',
    path: '/admin',
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
    name: '1:1 문의',
    iconOn: '/icons/admin/question-on.svg',
    iconOff: '/icons/admin/question-off.svg',
    path: '/oneQuestion/index',
  },
];
