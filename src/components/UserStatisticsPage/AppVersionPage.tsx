import Head from 'next/head';

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Flex } from '@chakra-ui/react';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import DataTable, { DataTableRowType } from '@components/common/DataTable';
import PageTitle from '@components/common/PageTitle';
import TableTop from '@components/common/TableTop';

const data = [
  {
    name: 'Page A',
    전체: 4000,
    남자: 2400,
    여자: 2400,
  },
  {
    name: 'Page B',
    전체: 3000,
    남자: 1398,
    여자: 2210,
  },
  {
    name: 'Page C',
    전체: 2000,
    남자: 9800,
    여자: 2290,
  },
  {
    name: 'Page D',
    전체: 2780,
    남자: 3908,
    여자: 2000,
  },
  {
    name: 'Page E',
    전체: 1890,
    남자: 4800,
    여자: 2181,
  },
  {
    name: 'Page F',
    전체: 2390,
    남자: 3800,
    여자: 2500,
  },
  {
    name: 'Page G',
    전체: 3490,
    남자: 4300,
    여자: 2100,
  },
];

function Example() {
  return (
    <>
      <Head>
        <title>메뉴 관리</title>
      </Head>
      <Flex
        className="community-lounge-wrapper"
        direction="column"
        width="100%"
        padding="20px"
      >
        <BreadCrumb depth={['이용자', '앱 회원 통계']} />
        <PageTitle title="앱 회원 통계" />
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="여자" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="남자"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="전체" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="여자" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Flex>
    </>
  );
}

export default withAdminLayout(Example);
