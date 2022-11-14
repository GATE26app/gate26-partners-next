import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { Light } from '@theme/foundations/colors';

import SearchIcon from './@Icons/Admin/Search';

const SearchInput = () => {
  return (
    <InputGroup h={'40px'}>
      <Input h={'100%'} variant={'outline'} placeholder="Enter amount" />
      <InputRightElement
        h={'100%'}
        children={<SearchIcon strokeColor={Light.gray[500]} />}
      />
    </InputGroup>
  );
};

export default SearchInput;
