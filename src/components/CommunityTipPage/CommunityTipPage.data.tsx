import { Text } from '@chakra-ui/react';

import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

import { imgPath } from '@utils/format';

interface ICategoty {
  [key: string]: string; // index signature 추가, key는 정해진 키워드가 아니며 변경 가능하다.
}

const categoryLabel: ICategoty = {
  HOTPLACE: '핫플레이스',
  FOOD: '로컬맛집',
  TOUR: '투어/액티비티',
  FLIGHT: '항공',
  SHOPPING: '쇼핑템',
  HOTEL: '숙소뷰',
  OOTD: '여행룩',
};

export type TipColumnType =
  | 'tipId'
  | 'tipTitle'
  | 'homeImage'
  | 'bannerImage'
  | 'category'
  | 'isOpen';

class CommunityTip {
  onChange?: (tipId: string, isOpen: string) => void;

  constructor(event: (tipId: string, isOpen: string) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly TIP_COLUMNS: DataTableColumnType<TipColumnType>[] = [
    {
      key: 'tipTitle',
      name: '제목',
      width: '29.1%',
    },
    {
      key: 'homeImage',
      name: '홈 이미지',
      width: '25.4%',
      render: (value: DataTableRowType<TipColumnType>) => (
        <RoundImage
          src={`${imgPath()}${value.homeImage as string}`}
          width={'264px'}
          height="100px"
        />
      ),
    },
    {
      key: 'bannerImage',
      name: '배너 이미지',
      width: '15%',
      render: (value: DataTableRowType<TipColumnType>) => (
        <RoundImage
          src={`${imgPath()}${value.bannerImage as string}`}
          width={'98px'}
          height="100px"
        />
      ),
    },

    {
      key: 'category',
      name: '카테고리',
      width: '15%',
      render: (value: DataTableRowType<TipColumnType>) => (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <Text>{categoryLabel[value.category! as string]}</Text>
      ),
    },
    {
      key: 'isOpen',
      name: '노출여부',
      width: '9.4%',
      render: (value: DataTableRowType<TipColumnType>) => (
        <CustomSelect
          width={'65px'}
          size="sm"
          items={[
            { value: 'T', label: '노출' },
            { value: 'F', label: '비활성' },
          ]}
          defaultValue={value.isOpen}
          noBorder
          onChange={(isOpen) =>
            this.onChange
              ? this.onChange(value.tipId as string, isOpen as string)
              : undefined
          }
        />
      ),
    },
  ];
}

export { CommunityTip };
