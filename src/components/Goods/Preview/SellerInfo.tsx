import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ColorBlack, ColorTextBlack } from '@/utils/_Palette';
import { getImagePath } from '@/utils/format';
import { usePartnerZuInfo } from '@/_store/PartnerInfo';

function SellerInfo() {
  const { partnerInfo } = usePartnerZuInfo((state) => state);
  const [onImage, setOnImage] = useState(false);

  console.log('partnerInfo', partnerInfo);
  return (
    <Box mx={'16px'} my={'20px'}>
      <Text color={ColorBlack} fontSize={'18px'} fontWeight={700}>
        판매자 정보
      </Text>
      <Box pt={'20px'}>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={'15px'}
        >
          <Flex alignItems={'center'} cursor={'pointer'}>
            <Box borderRadius={'50%'} overflow={'hidden'}>
              <Image
                src={
                  partnerInfo?.images.length > 0 &&
                  partnerInfo?.images[0].imagePath !== '' &&
                  partnerInfo?.images[0].imagePath !== null
                    ? `${getImagePath(partnerInfo?.images[0].imagePath)}`
                    : '/images/commerce/no_image.png'
                }
                w={'55px'}
                h={'55px'}
                onError={() => setOnImage(true)}
              />
            </Box>
            <Text
              fontSize={'16px'}
              color={ColorBlack}
              fontWeight={600}
              ml={'12px'}
            >
              {partnerInfo?.title}
            </Text>
          </Flex>
          {/* <Flex
            bgColor={ColorGrayBgBtn}
            borderRadius={'18px'}
            px={'15px'}
            py={'9px'}
            cursor={'pointer'}
            onClick={() => {
              console.log('파트너 ID => ', info.partnerId);
            }}
          >
            <Image src="/images/commerce/ico_send.png" w={'15px'} h={'15px'} />
            <Text fontSize={'13px'} color={ColorGray700} fontWeight={600}>
              문의하기
            </Text>
          </Flex> */}
        </Flex>
        {/* {partnerInfo?.info != null && (
          <Text fontSize={'14px'} color={ColorTextBlack} fontWeight={400}>
            {partnerInfo?.}
          </Text>
        )} */}
      </Box>
    </Box>
  );
}

export default SellerInfo;
