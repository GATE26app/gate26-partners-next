import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';
import SmallButton from '@components/common/SmallButton';

export type EventColumnType =
  | 'eventId'
  | 'title'
  | 'content'
  | 'contentType'
  | 'bannerImgPath'
  | 'imgPath'
  | 'seq'
  | 'loungeId'
  | 'loungeName'
  | 'startDate'
  | 'endDate'
  | 'createdDate'
  | 'modifiedDate'
  | 'maxSeq';

class CommunityEvent {
  onClick?: (row: DataTableRowType<EventColumnType>) => void;
  onChange?: (key: string, value: string | number, id?: string) => void;
  onChangeSeq?: (id: string, seq: number) => void;
  constructor(
    onClick: (row: DataTableRowType<EventColumnType>) => void,
    onChange: (key: string, value: string | number, id?: string) => void,
  ) {
    this.onClick = onClick;
    this.onChange = onChange;
  }

  readonly EVENT_COLUMNS: DataTableColumnType<EventColumnType>[] = [
    {
      key: 'title',
      name: '제목',
      width: '9.1%',
      align: 'left',
    },
    {
      key: 'content',
      name: '이벤트 내용',
      width: '20%',
      align: 'left',
      render: (value: DataTableRowType<EventColumnType>) => {
        if (value.contentType === 'URL' || value.contentType === 'TEXT') {
          return (
            <span style={{ whiteSpace: 'break-spaces' }}>{value.content}</span>
          );
        } else {
          return (
            <RoundImage
              src={value.content as string}
              width={'124px'}
              height="100px"
            />
          );
        }
      },
    },
    {
      key: 'contentType',
      name: '타입',
      width: '5%',
    },

    {
      key: 'startDate',
      name: '시작일자',
      width: '7.5%',
    },
    {
      key: 'endDate',
      name: '종료일자',
      width: '7.5%',
    },
    {
      key: 'bannerImgPath',
      name: '배너 이미지',
      width: '15%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <RoundImage
          src={value.bannerImgPath as string}
          // src={`${imgPath()}${value.bannerImgPath as string}`}
          width={'158px'}
          height="100px"
        />
      ),
    },
    {
      key: 'imgPath',
      name: '메인 이미지',
      width: '12.5%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <RoundImage
          src={value.imgPath as string}
          width={'124px'}
          height="100px"
        />
      ),
    },
    {
      key: 'loungeName',
      name: '표시 장소',
      width: '6.6%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <span>{value.loungeId ? value.loungeName : '홈'}</span>
      ),
    },
    {
      key: 'seq',
      name: '노출순서',
      width: '5.4%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <CustomSelect
          width={'65px'}
          size="sm"
          defaultValue={value.seq}
          items={
            value.maxSeq > 0
              ? Array.from({ length: value.maxSeq as number }, (_, idx) => {
                  return { value: idx + 1, label: String(idx + 1) };
                })
              : []
          }
          noBorder
          onChange={(seq) =>
            this.onChange
              ? this.onChange('seq', seq as number, value.eventId as string)
              : undefined
          }
        />
      ),
    },
    {
      key: 'eventId',
      name: '참가자 목록',
      width: '7%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <SmallButton
          text="참가자 목록"
          width="64px"
          onClick={() => (this.onClick ? this.onClick(value) : undefined)}
          color={'normal'}
        />
      ),
    },
  ];
}

export { CommunityEvent };
