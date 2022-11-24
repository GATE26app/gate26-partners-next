import { InputGroup, InputRightElement } from '@chakra-ui/react';

import CalendarIcon from '@components/common/@Icons/Admin/Calendar';
import InputBox from '@components/common/Input';

import { Light } from '@theme/foundations/colors';

interface PickerInputProps {
  placeholder?: string;
  text: string;
  disabled?: boolean;
}
const PickerInput = ({ placeholder, text, disabled }: PickerInputProps) => {
  return (
    <InputGroup h={'40px'} position="relative">
      <InputBox
        isDisabled={disabled}
        h={'100%'}
        variant={'outline'}
        placeholder={placeholder || ''}
        value={text}
        autoComplete="off"
        fontSize={'15px'}
        isReadOnly
      />
      <InputRightElement h={'100%'}>
        <CalendarIcon strokeColor={disabled ? Light.gray[500] : 'black'} />
      </InputRightElement>
    </InputGroup>
  );
};

export default PickerInput;
