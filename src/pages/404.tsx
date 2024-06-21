import { Box, Flex, Image, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <>
      <Flex
        flexDir="column"
        pos="absolute"
        top="30%"
        alignItems="center"
        w="100%"
        textAlign={'center'}
      >
        <Image
          src="/icons/error/errorPageIcon.png"
          w="80px"
          h="80px"
          mb="16px"
        />
        <Text fontWeight={800} fontSize="20px" mb="8px">
          서비스 안내
        </Text>
        <Text fontWeight={400} fontSize="16px" textColor={'#4A4D55'} mb="4px">
          서비스 연결에 문제가 발생하여 <br />
          정상적인 이용이 어려습니다.
          <Flex mb="8px" />
          잠시 후 다시 시도하거나 반복되면 <br />
          <Box as="span" color="#4A4D55" fontWeight={700}>
            1:1 문의
          </Box>
          로 연락해 주세요.
        </Text>
        <Text fontWeight={700} fontSize="12px" textColor={'#B8BCC8'}>
          운영시간 : 평일 09:00 - 18:00
        </Text>
      </Flex>
    </>
  );
};

export default NotFound;
