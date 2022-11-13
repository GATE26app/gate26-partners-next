import withAdminLayout from '@components/common/@Layout/AdminLayout';
import DataTable, {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import RoundImage from '@components/common/RoundImage';

function AccountManagement({ Component, pageProps }: any) {
  const columns: DataTableColumnType[] = [
    {
      key: 'title',
      name: '제목',
      width: '340px',
    },
    {
      key: 'event_content',
      name: '이벤트내용',
    },
    {
      key: 'type',
      name: '타입',
    },
    {
      key: 'start',
      name: '시작일자',
    },
    {
      key: 'end',
      name: '종료일자',
    },
    {
      key: 'banner',
      name: '배너이미지',
      render: (value) => (
        <RoundImage src={value.banner} width={'187px'} height="100px" />
      ),
    },
    {
      key: 'main',
      name: '메인이미지',
      width: '200px',
      render: (value) => (
        <RoundImage src={value.banner} width={'94px'} height="100px" />
      ),
    },
  ];

  const rows: DataTableRowType[] = [
    {
      title: '123',
      event_content: '232323',
      type: 123,
      start: '2022-10-10',
      end: '2022-10-10',
      banner:
        'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      main: 'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: '111111111111111111111111111',
      event_content: '232323',
      type: 123,
      start: '2022-10-10',
      end: '2022-10-10',
      banner:
        'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      main: 'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const handleEdit = (row: DataTableRowType) => {
    console.log('edit: ', row);
  };

  const handleDelete = (row: DataTableRowType) => {
    console.log('delete: ', row);
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '20px',
      }}
    >
      어드민 : 관리자관리
      <DataTable
        columns={columns}
        rows={rows}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isMenu
        paginationProps={{
          currentPage: 0,
          limit: 0,
          total: 0,
          onPageNumberClicked: (page: number) => {},
          onPreviousPageClicked: (page: number) => {},
          onNextPageClicked: (page: number) => {},
        }}
      />
    </div>
  );
}

export default withAdminLayout(AccountManagement);
