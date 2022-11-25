import { Textarea, TextareaProps } from '@chakra-ui/react';

const TextareaBox = ({ ...props }: TextareaProps) => {
  return (
    <Textarea
      {...props}
      errorBorderColor="warning.500"
      variant="outline"
      borderColor="gray.300"
      backgroundColor="background.primary"
      color="black"
      fontSize={'15px'}
      _disabled={{ backgroundColor: 'gray.100' }}
      _placeholder={{ color: 'gray.500' }}
      resize={'none'}
    />
  );
};

export default TextareaBox;
