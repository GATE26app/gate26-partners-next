import {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';

export type UserReportColumnType =
  | 'id'
  | 'category'
  | 'reason'
  | 'reporterEmail'
  | 'reporterName'
  | 'targetEmail'
  | 'targetName'
  | 'reportedAt';

class UserReportColumns {
  onChange?: (key: string, value: string | number) => void;

  constructor(event: (key: string, value: string | number) => void) {
    if (event) {
      this.onChange = event;
    }
  }

  readonly LIST_COLUMNS: DataTableColumnType<UserReportColumnType>[] = [
    {
      key: 'category',
      name: '신고 항목',
      width: '11.67%',
    },
    {
      key: 'reason',
      name: '신고 사유',
      width: '20.83%',
      align: 'left',
    },
    {
      key: 'reporterEmail',
      name: '신고자 메일',
      width: '19.17%',
    },
    {
      key: 'reporterName',
      name: '신고자 성함',
      width: '8.33%',
    },
    {
      key: 'targetEmail',
      name: '대상자 메일',
      width: '19.17%',
    },
    {
      key: 'targetName',
      name: '대상자 성함',
      width: '8.33%',
    },

    {
      key: 'reportedAt',
      name: '신고일자',
      width: '10.83%',
    },
  ];
}

export { UserReportColumns };
