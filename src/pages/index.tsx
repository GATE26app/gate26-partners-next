import { useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  useTheme,
} from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import BreadCrumb from '@components/common/BreadCrumb';
import Button from '@components/common/Button';
import ButtonInput from '@components/common/ButtonInput';
import CheckBox from '@components/common/CheckBox';
import RadioButton from '@components/common/CustomRadioButton/RadioButton';
import CustomSelect from '@components/common/CustomSelect';
import DataTable, {
  DataTableColumnType,
  DataTableRowType,
} from '@components/common/DataTable';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import FormHelper from '@components/common/FormHelper';
import IconButton from '@components/common/IconButton';
import InputBox from '@components/common/Input';
import PageTitle from '@components/common/PageTitle';
import Pagination from '@components/common/Pagination';
import RoundImage from '@components/common/RoundImage';
import SearchInput from '@components/common/SearchInput';
import SmallButton from '@components/common/SmallButton';
import TableTop from '@components/common/TableTop';
import TextareaBox from '@components/common/Textarea';
import Toggle, { ToggleOption } from '@components/common/Toggle';
import ColorSection from '@components/common/TokDocsDevTool/_fragments/TokDocsModal/_fragments/AppStyleViewerSection/_fragments/ColorSection';
import TextStyleSection from '@components/common/TokDocsDevTool/_fragments/TokDocsModal/_fragments/AppStyleViewerSection/_fragments/TextStyleSection';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface AccodianProps {
  title: string;
  Pannel: JSX.Element;
}

function AccoianWrap({ title, Pannel }: AccodianProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel style={{ backgroundColor: '#ffffff' }} pb={4}>
        {Pannel}
      </AccordionPanel>
    </AccordionItem>
  );
}

const TOGGLE_OPTIONS: ToggleOption[] = [
  {
    value: '1',
    text: '챌린지',
  },
  {
    value: '2',
    text: '국가',
  },
  {
    value: '3',
    text: '항공사',
  },
];

const TOGGLE_OPTIONS2: ToggleOption[] = [
  {
    value: '1',
    text: '챌린지',
  },
  {
    value: '2',
    text: '국가',
  },
];

function Test({ Component, pageProps }: any) {
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const theme = useTheme();
  const { colors, textStyles } = theme;
  const [radioIdx, setRadioIdx] = useState<string | boolean>();
  const [currentPage, setCurretPage] = useState<number>(0);

  type DataColumnType =
    | 'title'
    | 'event_content'
    | 'type'
    | 'start'
    | 'end'
    | 'banner'
    | 'main';
  const columns: DataTableColumnType<DataColumnType>[] = [
    {
      key: 'title',
      name: '제목',
      width: '100px',
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
      render: (value: DataTableRowType<DataColumnType>) => (
        <RoundImage
          src={value.banner as string}
          width={'187px'}
          height="100px"
        />
      ),
    },
    {
      key: 'main',
      name: '메인이미지',
      width: '200px',
      render: (value: DataTableRowType<DataColumnType>) => (
        <RoundImage
          src={value.banner as string}
          width={'94px'}
          height="100px"
        />
      ),
    },
  ];

  const rows: DataTableRowType<DataColumnType>[] = [
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

  const handleClick = () => {
    dispatch(
      customModalSliceAction.setMessage({
        message: '아이디, 비밀번호, 이름, 이메일은\n필수 입력 항목입니다.',
        type: 'confirm',
        okButtonName: '로그아웃',
        cbOk: () => {
          console.log('asdasdasdsdasdas');
        },
      }),
    );
    openCustomModal();
  };

  const [checkbox, setCheckbox] = useState<boolean>(false);
  const toggleCheckbox = () => setCheckbox(!checkbox);

  const [keyword, setKeyword] = useState<string>('');
  const [curDay, setCurDay] = useState<dayjs.Dayjs>(() => dayjs('2022-10-20'));

  return (
    <div style={{ width: '100%' }}>
      <Flex>
        <Accordion style={{ width: '100%' }} defaultIndex={[]} allowMultiple>
          <AccoianWrap
            title="파일업로드"
            Pannel={
              <>
                <Flex rowGap={'10px'} flexDirection="column">
                  <FileUpload />
                </Flex>
              </>
            }
          />
          <AccoianWrap
            title="Button"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
                <Flex columnGap={'10px'} alignItems="center">
                  <Button width="69px" size="md" text="로그인" />
                  <Button width="61px" size="sm" text="로그인" />
                  <Button width="61px" size="xs" text="로그인" />
                </Flex>
                <Flex columnGap={'10px'} alignItems="center">
                  <Button
                    width="69px"
                    size="md"
                    type="square-outline"
                    text="로그인"
                  />
                  <Button
                    width="61px"
                    size="sm"
                    type="square-outline"
                    text="로그인"
                  />
                  <Button
                    width="61px"
                    size="xs"
                    type="square-outline"
                    text="로그인"
                  />
                </Flex>
                <Flex columnGap={'10px'} alignItems="center">
                  <Button
                    width="69px"
                    size="md"
                    type="square-grayscale"
                    text="로그인"
                  />
                  <Button
                    width="61px"
                    size="sm"
                    type="square-grayscale"
                    text="로그인"
                  />
                  <Button
                    width="61px"
                    size="xs"
                    type="square-grayscale"
                    text="로그인"
                  />
                </Flex>
                <Flex columnGap={'10px'} alignItems="center">
                  <Button width="69px" size="md" type="round" text="로그인" />
                  <Button width="61px" size="sm" type="round" text="로그인" />
                  <Button width="61px" size="xs" type="round" text="로그인" />
                </Flex>
                <Flex columnGap={'10px'} alignItems="center">
                  <Button
                    width="69px"
                    size="md"
                    type="round-outline"
                    text="로그인"
                  />
                  <Button
                    width="61px"
                    size="sm"
                    type="round-outline"
                    text="로그인"
                  />
                  <Button
                    width="61px"
                    size="xs"
                    type="round-outline"
                    text="로그인"
                  />
                </Flex>
                <Flex columnGap={'10px'} alignItems="center">
                  <SmallButton text="답변하기" color="blue" />
                  <SmallButton text="답변하기" color="normal" />
                </Flex>
              </Flex>
            }
          />
          <AccoianWrap
            title="Icon Button"
            Pannel={
              <Flex flexDirection="column" rowGap={'10px'}>
                <Flex columnGap={'10px'} alignItems="center">
                  <IconButton
                    type="download"
                    width="110px"
                    size="md"
                    text="내보내기"
                  />
                  <IconButton
                    type="download"
                    width="94px"
                    size="sm"
                    text="내보내기"
                  />
                  <IconButton
                    type="download"
                    width="94px"
                    size="xs"
                    text="내보내기"
                  />
                </Flex>
                <Flex columnGap={'10px'} alignItems="center">
                  <IconButton
                    type="add"
                    width="110px"
                    size="md"
                    text="메뉴추가"
                  />
                  <IconButton
                    type="add"
                    width="94px"
                    size="sm"
                    text="메뉴추가"
                  />
                  <IconButton
                    type="add"
                    width="94px"
                    size="xs"
                    text="메뉴추가"
                  />
                </Flex>
              </Flex>
            }
          />
          <AccoianWrap
            title="Modal"
            Pannel={
              <Flex alignItems="center" columnGap={'10px'}>
                <Button
                  width="120px"
                  size="sm"
                  onClick={handleClick}
                  text="모달 테스트"
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="Pagination"
            Pannel={
              <Flex alignItems="center" columnGap={'10px'}>
                <Pagination
                  currentPage={currentPage}
                  limit={2}
                  total={10}
                  onNextPageClicked={(page: number) => setCurretPage(page)}
                  onPreviousPageClicked={(page: number) => setCurretPage(page)}
                  onPageNumberClicked={(page: number) => setCurretPage(page)}
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="Colors"
            Pannel={<ColorSection colors={colors} />}
          />
          <AccoianWrap
            title="Typography"
            Pannel={<TextStyleSection textStyles={textStyles} />}
          />
          <AccoianWrap
            title="DataTable"
            Pannel={
              <Flex alignItems="center" columnGap={'10px'}>
                <DataTable
                  columns={columns}
                  rows={rows}
                  onEdit={(row: DataTableRowType<DataColumnType>) =>
                    console.log('edit: ', row)
                  }
                  onDelete={(row: DataTableRowType<DataColumnType>) =>
                    console.log('delete: ', row)
                  }
                  isMenu
                  paginationProps={{
                    currentPage: 0,
                    limit: 0,
                    total: 0,
                    onPageNumberClicked: (page: number) => console.log('a'),
                    onPreviousPageClicked: (page: number) => console.log('a'),
                    onNextPageClicked: (page: number) => console.log('a'),
                  }}
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="Select"
            Pannel={
              <Flex alignItems="flex-start" columnGap={'10px'} height={'250px'}>
                <CustomSelect
                  width={'100px'}
                  placeholder={'Type'}
                  items={[
                    { value: 1, label: 'Option1' },
                    { value: 2, label: 'Option2' },
                    { value: 3, label: 'Option3' },
                    { value: 4, label: 'Option4' },
                  ]}
                />
                <CustomSelect
                  disabled
                  width={'100px'}
                  placeholder={'Type'}
                  items={[
                    { value: 1, label: 'Option1' },
                    { value: 2, label: 'Option2' },
                    { value: 3, label: 'Option3' },
                    { value: 4, label: 'Option4' },
                  ]}
                />
                <CustomSelect
                  width={'100px'}
                  placeholder={'Type'}
                  items={[
                    { value: 1, label: 'Option1' },
                    { value: 2, label: 'Option2' },
                    { value: 3, label: 'Option3' },
                    { value: 4, label: 'Option4' },
                  ]}
                  noBorder
                />
                <CustomSelect
                  width={'100px'}
                  size={'xs'}
                  placeholder={'Type'}
                  items={[
                    { value: 1, label: 'Option1' },
                    { value: 2, label: 'Option2' },
                    { value: 3, label: 'Option3' },
                    { value: 4, label: 'Option4' },
                  ]}
                  noBorder
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="Radio button"
            Pannel={
              <>
                <Flex alignItems="center" columnGap={'10px'}>
                  <RadioButton />
                  <RadioButton disabled />
                  <RadioButton checked />
                </Flex>
                <Flex alignItems="center" columnGap={'10px'}>
                  <RadioButton group groupLabel={['data', 'data', 'data']} />
                </Flex>
              </>
            }
          />
          <AccoianWrap
            title="Round Image"
            Pannel={
              <Flex alignItems="center" columnGap={'10px'}>
                <RoundImage
                  src={
                    'https://images.pexels.com/photos/1303090/pexels-photo-1303090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  }
                  width={'187px'}
                  height="100px"
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="SearchInput"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
                <SearchInput
                  placeholder="Search"
                  text={keyword}
                  onChange={(text: string) => setKeyword(text)}
                  onSearch={() => console.log('검색')}
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="CheckBox"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
                <CheckBox disabled onClick={toggleCheckbox} />
                <CheckBox checked={checkbox} onClick={toggleCheckbox}>
                  {'체크박스'}
                </CheckBox>
              </Flex>
            }
          />
          <AccoianWrap
            title="InputBox"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
                <InputBox placeholder="Nomal input" />
                <InputBox isInvalid={true} placeholder="Error" />
                <InputBox placeholder="Disabled" isDisabled={true} />
                <FormHelper errorText="아이디를 입력해주세요">
                  <InputBox placeholder="아이디" isInvalid={true} />
                </FormHelper>
                <ButtonInput
                  InputProps={{
                    placeholder: 'Placeholder',
                  }}
                  ButtonProps={{
                    text: 'Button',
                    size: 'md',
                  }}
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="TextareaBox"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
                <TextareaBox />
              </Flex>
            }
          />
          <AccoianWrap
            title="Toggle"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
                <Toggle
                  // text1="챌린지"
                  // text2="국가"
                  // text3="항공사"
                  toggleOptions={TOGGLE_OPTIONS}
                />
                <Toggle toggleOptions={TOGGLE_OPTIONS2} />
              </Flex>
            }
          />
          <AccoianWrap
            title="DatePicker"
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column" height={'1200px'}>
                <DatePicker
                  type={'date'}
                  width={'250px'}
                  curDate={curDay}
                  onApply={(date) => {
                    setCurDay(date);
                    console.log(date);
                  }}
                />
                <DatePicker
                  disabled
                  type={'date'}
                  width={'250px'}
                  curDate={curDay}
                  onApply={(date) => {
                    setCurDay(date);
                    console.log(date);
                  }}
                />
                <DatePicker
                  type={'datetime'}
                  curDate={curDay}
                  onApply={(date) => {
                    setCurDay(date);
                    console.log(date);
                  }}
                />
              </Flex>
            }
          />
          <AccoianWrap
            title="페이지 공통 컴포넌트"
            Pannel={
              <>
                <Flex rowGap={'10px'} flexDirection="column">
                  <BreadCrumb depth={['커뮤니티', '라운지 관리']} />
                </Flex>
                <Flex rowGap={'10px'} flexDirection="column">
                  {/* <PageTitle title="~~~ 관리" /> */}
                  <PageTitle
                    title="라운지 관리"
                    onClickDownload={() => console.log('다운로드 클릭')}
                    isDownload
                  />
                </Flex>
                <Flex rowGap={'10px'} flexDirection="column">
                  <TableTop
                    total={100}
                    search={{
                      searchTypes: [
                        { value: 0, label: '전체' },
                        { value: 1, label: '조건1' },
                      ],
                      keyword: '',
                      onChangeLimit: (value: number) =>
                        console.log(value + '씩 보기'),
                      onChangeSearchType: (type: number) =>
                        console.log('검색조건: ', type),
                      onChangeKeyword: (keyword: string) =>
                        console.log('키워드: ' + keyword),
                      onClickSearch: () => console.log('검색'),
                    }}
                  />
                </Flex>
              </>
            }
          />
        </Accordion>
      </Flex>
    </div>
  );
}

export default withAdminLayout(Test);
