import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

import { imgPath } from '@utils/format';

import axios from 'apis/_axios/instance';

export type LoungeColumnType =
  | 'tgId'
  | 'loungeName'
  | 'coverImg'
  | 'imagePath'
  | 'displayOrder'
  | 'isOpen';

export const LOUNGE_COLUMNS: DataTableColumnType<LoungeColumnType>[] = [
  {
    key: 'loungeName',
    name: '라운지명',
    width: '25.8%',
  },
  {
    key: 'coverImg',
    name: '배너 이미지',
    width: '28.3%',
    render: (value: DataTableRowType<LoungeColumnType>) => (
      <RoundImage
        src={`${imgPath()}${value.coverImg as string}`}
        // src={`${axios.defaults.baseURL}${value.coverImg as string}`}
        width={'187px'}
        height="100px"
      />
    ),
  },
  {
    key: 'imagePath',
    name: '홈 이미지',
    width: '26.6%',
    render: (value: DataTableRowType<LoungeColumnType>) => (
      <RoundImage
        src={`${imgPath()}${value.imagePath as string}`}
        width={'94px'}
        height="100px"
      />
    ),
  },
  {
    key: 'displayOrder',
    name: '라운지 노출 순서',
    width: '12.5%',
  },
  {
    key: 'isOpen',
    name: '활성화 여부',
    width: '12.5%',
    render: (value: DataTableRowType<LoungeColumnType>) => (
      <span>{value.isOpen === 'T' ? '활성화' : '비활성화'}</span>
    ),
  },
];
