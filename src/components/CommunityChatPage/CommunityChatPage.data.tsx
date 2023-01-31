import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

import { imgPath } from '@utils/format';

export type ChatColumnType =
  | 'roomId'
  | 'roomName'
  | 'thumbnail'
  | 'loungeName'
  | 'loungeId';
export const CHAT_COLUMNS: DataTableColumnType<ChatColumnType>[] = [
  {
    key: 'roomName',
    name: '채팅명',
    width: '28.3%',
  },
  {
    key: 'thumbnail',
    name: '썸네일 사진',
    width: '34.1%',
    render: (value: DataTableRowType<ChatColumnType>) =>
      value.thumbnail ? (
        <RoundImage
          src={`${imgPath()}${value.thumbnail as string}`}
          width={'50px'}
          height={'50px'}
          isCircle
        />
      ) : (
        <></>
      ),
  },
  {
    key: 'loungeName',
    name: '라운지 위치',
    width: '31.6%',
  },
];
