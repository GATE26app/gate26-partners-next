import { Router, useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { FileMessage, UserMessage } from 'sendbird';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';

import { ColorGray100 } from '@/utils/_Palette';
import { imgPath } from '@/utils/format';
import { getUserId } from '@/utils/localStorage/token/index';

type CarouselItem = {
  title: string;
  imageUrl: string;
  url: string;
  option?: string;
  orderdata?: string;
  orderNum?: string;
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
        console.log(parsedData);
        setCarouselData(parsedData.data);
      } catch (error) {
        console.error('Failed to parse carousel data:', error);
      }
    }
  }, [message]);

  return (
    <>
      <Message {...props} />

      <Flex justifyContent={'flex-end'} mb="20px">
        {/* 캐로셀 UI 추가 */}
        {carouselData && (
          <Flex>
            {carouselData.map((item, index) => (
              <Flex
                key={index}
                flexDir="column"
                padding={'12px'}
                width={'280px'}
                align={'center'}
                borderWidth="1px"
                borderColor={'#E5E7EC'}
                borderRadius={'20px'}
              >
                <Flex width={'100%'}>
                  <Flex mr="12px" width={'35%'}>
                    <Image
                      src={`${imgPath()}${item?.imageUrl}`} // 이미지 경로 변환 함수 사용
                      alt={item.title}
                      w="84px"
                      h="84px"
                      borderRadius={'10px'}
                    />
                  </Flex>
                  <Flex flexDir="column" width={'65%'}>
                    <Text
                      overflow="hidden" // 한줄넘는건 숨겨줘
                      textOverflow={'ellipsis'} // 글자수 넘는건 ...처리
                      display="-webkit-box"
                      fontWeight={700}
                      fontSize={'15px'}
                      style={{
                        WebkitLineClamp: 2, // 한줄만 볼래
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.title}
                    </Text>
                    {item.orderdata ? (
                      <Text
                        overflow="hidden" // 한줄넘는건 숨겨줘
                        textOverflow={'ellipsis'} // 글자수 넘는건 ...처리
                        display="-webkit-box"
                        color={'#757983'}
                        fontWeight={400}
                        fontSize={'13px'}
                        mt="4px"
                        style={{
                          WebkitLineClamp: 2, // 한줄만 볼래
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.option}
                      </Text>
                    ) : (
                      <></>
                      // <Button
                      //   backgroundColor={'#F2F3F4'}
                      //   color={'#757983'}
                      //   fontSize="12px"
                      //   fontWeight={700}
                      //   height="26px"
                      //   mt="14px"
                      //   position={'relative'}
                      //   bottom="0px"
                      // >
                      //   상품보기
                      // </Button>
                    )}
                  </Flex>
                </Flex>

                {item.orderdata && (
                  <>
                    <Box
                      bgColor={ColorGray100}
                      w={'100%'}
                      h={'1px'}
                      my="14px"
                    ></Box>
                    <Flex flexDir="column" w={'100%'}>
                      <Flex>
                        <Text
                          fontWeight={700}
                          fontSize={'13px'}
                          color={'#757983'}
                          mr="16px"
                        >
                          주문일시
                        </Text>
                        <Text
                          overflow="hidden" // 한줄넘는건 숨겨줘
                          textOverflow={'ellipsis'} // 글자수 넘는건 ...처리
                          display="-webkit-box"
                          fontWeight={400}
                          color={'#757983'}
                          fontSize={'13px'}
                        >
                          {item.orderdata}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight={700}
                          fontSize={'13px'}
                          color={'#757983'}
                          mr="16px"
                        >
                          주문번호
                        </Text>
                        <Text
                          overflow="hidden" // 한줄넘는건 숨겨줘
                          textOverflow={'ellipsis'} // 글자수 넘는건 ...처리
                          display="-webkit-box"
                          fontWeight={400}
                          color={'#757983'}
                          fontSize={'13px'}
                        >
                          {item.orderNum}
                        </Text>
                      </Flex>
                    </Flex>
                  </>
                )}
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default CustomCarouselMessage;
