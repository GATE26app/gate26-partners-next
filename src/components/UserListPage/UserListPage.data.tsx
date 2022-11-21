import { Image } from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type UserColumnType =
  | 'id'
  | 'profile'
  | 'name'
  | 'nickname'
  | 'enName'
  | 'gender'
  | 'email'
  | 'phoneNumber'
  | 'birthday'
  | 'signupPath'
  | 'createdAt'
  | 'lastedAt';

class UserColumns {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly LIST_COLUMNS: DataTableColumnType<UserColumnType>[] = [
    {
      key: 'profile',
      name: '프로필 이미지',
      width: '7.08%',
      render: (value: DataTableRowType<UserColumnType>) => (
        <Image
          src={value.profile as string}
          w="40px"
          h="40px"
          borderRadius="50%"
          margin="0 auto"
        />
      ),
    },
    {
      key: 'name',
      name: '이름',
      width: '6.67%',
    },
    {
      key: 'nickname',
      name: '닉네임',
      width: '10%',
    },

    {
      key: 'enName',
      name: '영문명',
      width: '10%',
    },
    {
      key: 'gender',
      name: '성별',
      width: '4.17%',
    },
    {
      key: 'email',
      name: '이메일',
      width: '17.08%',
    },
    {
      key: 'phoneNumber',
      name: '핸드폰 번호',
      width: '10%',
    },
    {
      key: 'birthday',
      name: '생년월일',
      width: '8.33%',
    },
    {
      key: 'signupPath',
      name: '가입경로',
      width: '8.33%',
    },
    {
      key: 'createdAt',
      name: '생성일자',
      width: '8.33%',
    },
    {
      key: 'lastedAt',
      name: '최종접속일자',
      width: '8.33%',
    },
  ];
}

export { UserColumns };
