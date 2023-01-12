import { Text } from '@chakra-ui/react';

import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

import { imgPath } from '@utils/format';

import axios from 'apis/_axios/instance';

export type StampCol =
  | 'stampId'
  | 'stampType'
  | 'stampName'
  | 'descText'
  | 'imagePath'
  | 'useYn';

const renderStmapType = (type?: string) => {
  if (type === 'COUNTRY') return '국가';
  else if (type === 'CHALLENGE') return '챌린지';
  else return '항공사';
};

class Stamp {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }
  readonly STAMP_COLUMNS: DataTableColumnType<StampCol>[] = [
    {
      key: 'stampType',
      name: '스탬프러리 유형',
      width: '15%',
      render: (value: DataTableRowType<StampCol>) => (
        <Text textStyle="textSm">
          {renderStmapType(value?.stampType as string)}
        </Text>
      ),
    },
    {
      key: 'stampName',
      name: '스탬프러리명',
      width: '21.6%',
    },
    {
      key: 'descText',
      name: '스탬프러리 설명',
      width: '31.6%',
    },

    {
      key: 'imagePath',
      name: '이미지',
      width: '18.3%',
      render: (value: DataTableRowType<StampCol>) => (
        <RoundImage
          src={`${imgPath()}${value.imagePath as string}`}
          width={'90px'}
          height="90px"
        />
      ),
    },
    {
      key: 'useYn',
      name: '사용여부',
      width: '6.6%',
      render: (value: DataTableRowType<StampCol>) => (
        <Text textStyle="textSm">{value.useYn === 'T' ? '사용' : '-'}</Text>
      ),
    },
  ];
}
export { Stamp };
