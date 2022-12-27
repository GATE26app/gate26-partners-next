import { Flex, Highlight, Text } from '@chakra-ui/react';

import CustomSelect from '@components/common/CustomSelect';
import IconButton from '@components/common/IconButton';
import SearchInput from '@components/common/SearchInput';

import styled from '@emotion/styled';
import { Light } from '@theme/foundations/colors';

interface SearchTypeProps {
  value: number;
  label: string;
}
interface SearchProps {
  searchTypes: SearchTypeProps[];
  keyword?: string;
  onChangeLimit: (value: number) => void;
  onChangeSearchType: (type: string) => void;
  onChangeKeyword: (keyword: string) => void;
  onClickSearch: () => void;
}
interface ButtonProps {
  title: string;
  width?: string;
  onClickCreate?: () => void;
}
interface TableTopProps {
  total: number;
  search: SearchProps;
  createButton?: ButtonProps;
}
const TableTop = ({ total, search, createButton }: TableTopProps) => {
  const {
    searchTypes,
    keyword,
    onChangeLimit,
    onChangeSearchType,
    onChangeKeyword,
    onClickSearch,
  } = search;
  const buttonWidth = createButton?.width;
  const buttonTitle = createButton?.title;
  const onClickCreate = createButton?.onClickCreate;
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      marginBottom={'10px'}
    >
      <Flex alignItems={'center'} columnGap={'10px'}>
        <EmphasisText>
          총 <span>{total}</span>건
        </EmphasisText>
        <CustomSelect
          width={'110px'}
          size="sm"
          items={[
            { value: 10, label: '10개씩 보기' },
            { value: 25, label: '25개씩 보기' },
            { value: 50, label: '50개씩 보기' },
            { value: 100, label: '100개씩 보기' },
          ]}
          onChange={(value) => onChangeLimit(value as number)}
        />
        {createButton && (
          <IconButton
            type={'add'}
            size="sm"
            width={buttonWidth ? buttonWidth : undefined}
            text={buttonTitle ? buttonTitle : ''}
            onClick={onClickCreate}
          />
        )}
      </Flex>
      <Flex alignItems={'center'} columnGap={'5px'}>
        <Text fontSize={'12px'} width={'47px'}>
          {'검색구분:'}
        </Text>
        <CustomSelect
          width={'100px'}
          size="sm"
          items={searchTypes}
          onChange={(value) => onChangeSearchType(value as number)}
        />
        <SearchInput
          placeholder={'Search'}
          text={keyword || ''}
          onChange={onChangeKeyword}
          onSearch={onClickSearch}
        />
      </Flex>
    </Flex>
  );
};

export default TableTop;

const EmphasisText = styled(Text)`
  color: ${() => Light.black};
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.02em;
  max-width: 100px;
  span {
    color: ${() => Light.primary[500]};
  }
`;
