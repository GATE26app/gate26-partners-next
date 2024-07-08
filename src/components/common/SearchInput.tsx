import { Box, Flex, Image, InputProps } from '@chakra-ui/react';

import { ColorGray700, ColorInputBorder, ColorWhite } from '@/utils/_Palette';

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
    <Flex
      borderRadius={'10px'}
      borderWidth={1}
      borderColor={ColorInputBorder}
      bgColor={ColorWhite}
      alignItems={'center'}
      width={'100%'}
    >
      <Box px={'15px'}>
        <Image
          src={'/images/Page/input_search.png'}
          width={'18px'}
          height={'18px'}
          alt="select arrow"
          // px={'15px'}
        />
      </Box>
      <input
        value={text}
        style={{
          marginRight: '15px',
          outline: 'none',
          color: ColorGray700,
          fontSize: '15px',
          lineHeight: '15px',
        }}
        placeholder={placeholder !== '' ? placeholder : ''}
        onChange={handleChangeInput}
      />
    </Flex>
    // <InputGroup h={'45px'}>
    //   <InputLeftElement>
    //     <Image
    //       src={'/images/Page/input_search.png'}
    //       width={'18px'}
    //       height={'18px'}
    //       alt="select arrow"
    //     />
    //   </InputLeftElement>
    //   <input
    //     // _active={{ height: '45px' }}
    //     value={text}
    //     onChange={handleChangeInput}
    //     placeholder={placeholder || ''}
    //   />
    //   {/* <InputBox
    //     // h={'100%'}
    //     placeholder={placeholder || ''}
    //     onChange={handleChangeInput}
    //     value={text}
    //     autoComplete="off"
    //   /> */}
    // </InputGroup>
  );
};

export default SearchInput;
