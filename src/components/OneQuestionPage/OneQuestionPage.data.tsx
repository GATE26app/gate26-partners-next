import { Text } from '@chakra-ui/react';

import CustomSelect from '@components/common/CustomSelect';
import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';
import SmallButton from '@components/common/SmallButton';

export type QuestionColumnType =
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
      width: '15.25%',
    },
    {
      key: 'title',
      name: '문의 제목',
      width: '23.73%',
    },
    {
      key: 'content',
      name: '문의내용',
      width: '30.51%',
    },
    {
      key: 'thumbnail',
      name: '이미지',
      width: '12.71%',
      align: 'center',
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
      width: '8.47%',
      align: 'center',
      render: (value: DataTableRowType<QuestionColumnType>) => (
        <Text color={value.answer === 0 ? 'warning.500' : 'success.500'}>
          {value.answer === 1 ? '답변완료' : '답변대기'}
        </Text>
      ),
    },
    {
      key: 'answer',
      name: '답변하기',
      width: '8.47%',
      align: 'center',
      render: (value: DataTableRowType<QuestionColumnType>) => (
        <SmallButton
          text={value.answerYn === 1 ? '답변확인' : '답변하기'}
          color={value.answerYn === 0 ? 'normal' : 'blue'}
        />
      ),
    },
  ];
}

export { Question };
