import { Input, InputGroup, InputProps } from '@chakra-ui/react';

const InputBox = ({ ...props }: InputProps) => {
  return (
    <InputGroup h={'50px'}>
      <Input
        {...props}
        errorBorderColor="warning.500"
        h="100%"
        variant="outline"
        borderColor="gray.300"
        backgroundColor="background.primary"
        color="black"
        _disabled={{ backgroundColor: 'gray.100' }}
        _placeholder={{ color: 'gray.500' }}
      />
    </InputGroup>
  );
};

export default InputBox;
