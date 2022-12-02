import { Input, InputProps } from '@chakra-ui/react';

const InputBox = ({ ...props }: InputProps) => {
  return (
    <Input
      h="50px"
      {...props}
      errorBorderColor="warning.500"
      variant="outline"
      borderColor="gray.300"
      backgroundColor="background.primary"
      color="black"
      _disabled={{ backgroundColor: 'gray.100', color: 'gray.500' }}
      _placeholder={{ color: 'gray.500' }}
    />
  );
};

export default InputBox;
