import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { Light } from '@theme/foundations/colors';

import SearchIcon from './@Icons/Admin/Search';

interface SearchInputProps {
  placeholder?: string;
  text: string;
  onChange: (text: string) => void;
  onSearch: () => void;
}
const SearchInput = ({
  placeholder,
  text,
  onChange,
  onSearch,
}: SearchInputProps) => {
  const handleChangeInput = (e: { target: { value: string } }) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <InputGroup h={'40px'}>
      <Input
        h={'100%'}
        variant={'outline'}
        placeholder={placeholder ? placeholder : ''}
        onChange={handleChangeInput}
        value={text}
        autoComplete="off"
      />
      <InputRightElement h={'100%'} onClick={onSearch}>
        <SearchIcon strokeColor={Light.gray[500]} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
