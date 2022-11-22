import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

export type QuestionColumnType =
  | 'id'
  | 'type'
  | 'title'
  | 'content'
  | 'thumbnail'
  | 'answerYn'
  | 'answer';

class Question {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly TIP_COLUMNS: DataTableColumnType<QuestionColumnType>[] = [
    {
      key: 'type',
      name: '문의유형',
      width: '29.1%',
    },
    {
      key: 'title',
      name: '문의 제목',
      width: '25.4%',
    },
    {
      key: 'content',
      name: '문의내용-',
      width: '15%',
    },
    {
      key: 'thumbnail',
      name: '이미지',
      width: '15%',
      render: (value: DataTableRowType<QuestionColumnType>) => (
        <RoundImage
          src={value.thumbnail as string}
          width={'98px'}
          height="100px"
        />
      ),
    },
    {
      key: 'answerYn',
      name: '답변여부',
      width: '9.4%',
      render: (value: DataTableRowType<QuestionColumnType>) => (
        <CustomSelect
          width={'65px'}
          size={'xs'}
          items={[
            { value: 1, label: '답변완료' },
            { value: 0, label: '답변대기' },
          ]}
          defaultValue={value.answerYn}
          noBorder
          onChange={(value) =>
            this.onChange ? this.onChange('show', value as number) : undefined
          }
        />
      ),
    },
    {
      key: 'answer',
      name: '답변하기',
      width: '9.4%',
      render: (value: DataTableRowType<QuestionColumnType>) => (
        <CustomSelect
          width={'65px'}
          size={'xs'}
          items={[
            { value: 1, label: '답변하기' },
            { value: 0, label: '답변하기' },
          ]}
          defaultValue={value.answerYn}
          noBorder
          onChange={(value) =>
            this.onChange ? this.onChange('show', value as number) : undefined
          }
        />
      ),
    },
  ];
}

export { Question };
