import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';
import SmallButton from '@components/common/SmallButton';

export type EventColumnType =
  | 'id'
  | 'title'
  | 'event_content'
  | 'type'
  | 'start'
  | 'end'
  | 'main_img'
  | 'banner'
  | 'location'
  | 'order'
  | 'location';

class CommunityEvent {
  onClick?: (row: DataTableRowType<EventColumnType>) => void;
  onChange?: (key: string, value: string | number) => void;

  constructor(
    onClick: (row: DataTableRowType<EventColumnType>) => void,
    onChange: (key: string, value: string | number) => void,
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
      key: 'event_content',
      name: '이벤트 내용',
      width: '20%',
      align: 'left',
      render: (value: DataTableRowType<EventColumnType>) => {
        if (value.type === 'URL' || value.type === 'TEXT') {
          return (
            <span style={{ whiteSpace: 'break-spaces' }}>
              {value.event_content}
            </span>
          );
        } else {
          return (
            <RoundImage
              src={value.event_content as string}
              width={'124px'}
              height="100px"
            />
          );
        }
      },
    },
    {
      key: 'type',
      name: '타입',
      width: '5%',
    },

    {
      key: 'start',
      name: '시작일자',
      width: '7.5%',
    },
    {
      key: 'end',
      name: '종료일자',
      width: '7.5%',
    },
    {
      key: 'banner',
      name: '배너 이미지',
      width: '15%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <RoundImage
          src={value.banner as string}
          width={'158px'}
          height="100px"
        />
      ),
    },
    {
      key: 'main_img',
      name: '메인 이미지',
      width: '12.5%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <RoundImage
          src={value.main_img as string}
          width={'124px'}
          height="100px"
        />
      ),
    },
    {
      key: 'location',
      name: '표시 장소',
      width: '6.6%',
    },
    {
      key: 'order',
      name: '노출순서',
      width: '5.4%',
      render: (value: DataTableRowType<EventColumnType>) => (
        <CustomSelect
          width={'65px'}
          size="sm"
          items={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
          ]}
          defaultValue={value.order}
          noBorder
          onChange={(value) =>
            this.onChange ? this.onChange('order', value as number) : undefined
          }
        />
      ),
    },
    {
      key: 'list_btn',
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
