import { Image } from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

import { crypto } from '@utils/crypto';
import { imgPath } from '@utils/format';

export type UserColumnType =
  | 'userId'
  | 'profileImagePath'
  | 'nickName'
  | 'name'
  | 'enLastName'
  | 'enFirstName'
  | 'gender'
  | 'birthDate'
  | 'phone'
  | 'emailAddress'
  | 'recommendeeNickname'
  | 'createdDate'
  | 'lastAccessDate';

class UserColumns {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly LIST_COLUMNS: DataTableColumnType<UserColumnType>[] = [
    {
      key: 'profileImagePath',
      name: '프로필 이미지',
      width: '7.08%',
      render: (value: DataTableRowType<UserColumnType>) => (
        <Image
          // src={value.profileImagePath as string}
          src={`${imgPath()}${value.profileImagePath}`}
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
      key: 'nickName',
      name: '닉네임',
      width: '10%',
    },
    {
      key: 'enLastName',
      name: '영문명',
      width: '10%',
      render: (value: DataTableRowType<UserColumnType>) => {
        let lastName = '';
        let firstName = '';
        if (value.enLastName != undefined)
          lastName = value.enLastName as string;
        if (value.enFirstName != undefined)
          firstName = value.enFirstName as string;
        return lastName + ' ' + firstName;
      },
    },
    {
      key: 'gender',
      name: '성별',
      width: '4.17%',
      render: (value: DataTableRowType<UserColumnType>) => {
        return value.gender === 'F' ? '여' : '남';
      },
    },
    {
      key: 'emailAddress',
      name: '이메일',
      width: '17.08%',
    },
    {
      key: 'phone',
      name: '핸드폰 번호',
      width: '10%',
    },
    {
      key: 'birthDate',
      name: '생년월일',
      width: '8.33%',
    },
    {
      key: 'signupPath',
      name: '가입경로',
      width: '8.33%',
    },
    {
      key: 'recommendeeNickname',
      name: '추천인',
      width: '10%',
    },
    {
      key: 'createdDate',
      name: '생성일자',
      width: '8.33%',
    },
    {
      key: 'lastAccessDate',
      name: '최종접속일자',
      width: '8.33%',
    },
  ];
}

export { UserColumns };
