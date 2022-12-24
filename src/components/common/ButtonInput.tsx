import React from 'react';

import { Flex, InputProps } from '@chakra-ui/react';

import Button, { ButtonProps } from '@components/common/Button';
import InputBox from '@components/common/Input';

interface ButtonInputProps {
  InputProps?: InputProps;
  ButtonProps: ButtonProps;
}
const ButtonInput = ({ InputProps, ButtonProps }: ButtonInputProps) => {
  return (
    <Flex gap="10px">
      <InputBox {...InputProps} />
      <Button {...ButtonProps} />
    </Flex>
  );
};

export default ButtonInput;
