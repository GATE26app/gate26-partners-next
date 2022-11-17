import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import CalendarIcon from '@components/common/@Icons/Admin/Calendar';

interface PickerInputProps {
  placeholder?: string;
  text: string;
}
const PickerInput = ({ placeholder, text }: PickerInputProps) => {
  return (
    <InputGroup h={'40px'} position="relative">
      <Input
        h={'100%'}
        variant={'outline'}
        placeholder={placeholder ? placeholder : ''}
        value={text}
        autoComplete="off"
      />
      <InputRightElement h={'100%'}>
        <CalendarIcon strokeColor={'black'} />
      </InputRightElement>
    </InputGroup>
  );
};

export default PickerInput;
