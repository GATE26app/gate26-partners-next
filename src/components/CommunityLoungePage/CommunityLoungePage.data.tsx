import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export const LOUNGE_COLUMNS: DataTableColumnType[] = [
  {
    key: 'title',
    name: '라운지명',
    width: '25.8%',
  },
  {
    key: 'banner',
    name: '배너 이미지',
    width: '28.3%',
    render: (value: DataTableRowType) => (
      <RoundImage src={value.banner} width={'187px'} height="100px" />
    ),
  },
  {
    key: 'home',
    name: '홈 이미지',
    width: '26.6%',
    render: (value: DataTableRowType) => (
      <RoundImage src={value.home} width={'94px'} height="100px" />
    ),
  },
  {
    key: 'order',
    name: '라운지 노출 순서',
    width: '12.5%',
  },
  {
    key: 'enable',
    name: '활성화 여부',
    width: '12.5%',
    render: (value: DataTableRowType) => (
      <span>{value.enable ? '활성화' : '비활성화'}</span>
    ),
  },
];
