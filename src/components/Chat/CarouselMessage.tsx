import React from 'react';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import { imgPath } from '@/utils/format';

type CarouselItem = {
  title: string;
  subtitle: string;
  imageUrl: string;
  url: string;
};

const CustomCarouselMessage = (props) => {
  const { message } = props;
  const [carouselData, setCarouselData] = React.useState<CarouselItem[] | null>(
    null,
  );

  // 캐로셀 데이터 파싱 및 상태 설정
  React.useEffect(() => {
    if (message.customType === 'carousel' && message.data) {
      try {
        const parsedData = JSON.parse(message.data);
        setCarouselData(parsedData.data || []);
      } catch (error) {
        console.error('Failed to parse carousel data:', error);
      }
    }
  }, [message]);

  return (
    <>
      <Message {...props} />
      <Flex justifyContent={'flex-start'} mb="10px" ml="40px">
        {/* 캐로셀 UI 추가 */}
        {carouselData && (
          <Flex>
            {carouselData.map((item, index) => (
              <Flex
                maxWidth={'200px'}
                key={index}
                align={'center'}
                flexDir="column"
                backgroundColor={'#D9D9D9'}
                borderRadius={'20px'}
              >
                <Image
                  src={`${imgPath()}${item.imageUrl}`} // 이미지 경로 변환 함수 사용
                  alt={item.title}
                  w="200px"
                  h="200px"
                  borderTopRadius={'20px'}
                />
                <Text
                  overflow="hidden" // 한줄넘는건 숨겨줘
                  textOverflow={'ellipsis'} // 글자수 넘는건 ...처리
                  display="-webkit-box"
                  fontWeight={700}
                  fontSize={'15px'}
                  mx="12px"
                  style={{
                    WebkitLineClamp: 2, // 한줄만 볼래
                    WebkitBoxOrient: 'vertical',
                  }}
                  my="2"
                  padding={'3px'}
                >
                  {item.title}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default CustomCarouselMessage;
