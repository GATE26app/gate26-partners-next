import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export const CHAT_COLUMNS: DataTableColumnType[] = [
  {
    key: 'title',
    name: '채팅명',
    width: '28.3%',
  },
  {
    key: 'thumbnail',
    name: '썸네일 사진',
    width: '34.1%',
    render: (value: DataTableRowType) => (
      <RoundImage
        src={value.thumbnail}
        width={'50px'}
        height={'50px'}
        isCircle
      />
    ),
  },
  {
    key: 'location',
    name: '라운지 위치',
    width: '31.6%',
  },
];
