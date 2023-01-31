import { InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';

import InputBox from '@components/common/Input';

import { Light } from '@theme/foundations/colors';

import SearchIcon from './@Icons/Admin/Search';

interface SearchInputProps {
  placeholder?: string;
  text: string;
  onChange: (text: string) => void;
  onSearch?: () => void;
  InputProps?: InputProps;
}
const SearchInput = ({
  placeholder,
  text,
  onChange,
  onSearch,
  InputProps,
}: SearchInputProps) => {
  const handleChangeInput = (e: { target: { value: string } }) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <InputGroup w={'315px'} h={'40px'}>
      <InputBox
        h={'100%'}
        placeholder={placeholder || ''}
        onChange={handleChangeInput}
        value={text}
        autoComplete="off"
        {...InputProps}
      />
      <InputRightElement h={'100%'} onClick={onSearch} cursor="pointer">
        <SearchIcon strokeColor={Light.gray[500]} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
