import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type AirLineCol =
  | 'id'
  | 'nameKr'
  | 'nameEng'
  | 'iata'
  | 'icao'
  | 'imageUrl'
  | 'pageUrl'
  | 'selfUrl'
  | 'dutyUrl'
  | 'repNum'
  | 'korYn'
  | 'answer';

class AirLineCode {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }
  readonly TIP_COLUMNS: DataTableColumnType<AirLineCol>[] = [
    {
      key: 'nameKr',
      name: '항공사명 (국문)',
      width: '10%',
    },
    {
      key: 'nameEng',
      name: '항공사명 (영문)',
      width: '10%',
    },
    {
      key: 'iata',
      name: 'IATA',
      width: '4.1%',
    },

    {
      key: 'icao',
      name: 'ICAO',
      width: '4.1%',
    },
    {
      key: 'imageUrl',
      name: '항공사 이미지 URL',
      width: '11.25%',
    },
    {
      key: 'pageUrl',
      name: '홈페이지 URL',
      width: '11.25%',
    },
    {
      key: 'selfUrl',
      name: '셀프체크인 URL',
      width: '11.25%',
    },
    {
      key: 'dutyUrl',
      name: '면세점 URL',
      width: '11.25%',
    },
    {
      key: 'repNum',
      name: '대표번호',
      width: '8.3%',
    },
    {
      key: 'korYn',
      name: '국내외여부',
      width: '6.6%',
    },
    {
      key: 'answer',
      name: '사용여부',
      width: '5.8%',
    },
  ];
}
export { AirLineCode };
