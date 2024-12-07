import React, { useEffect, useState } from 'react';

import { Flex, Text, useToast, Box } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray200,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import CustomButton from '@/components/common/CustomButton';
import { useRouter } from 'next/navigation';
import InputBox from '@/components/common/Input';
import { intComma } from '@/utils/format';

function ServiceInfo({ info }: { info: any}) {
  const toast = useToast();
  const router = useRouter();
  const [error, setError] = useState('');
  const [service, setService] = useState<any>({
    partnerId: '',
    serviceChargePercent: null,
  });

  useEffect(() => {
    if (info) {
      setService({
        partnerId: info.partnerId,
        serviceChargePercent: info.serviceChargePercent,
      });
    }
  }, [info]);

  return (
    <Flex mt={'30px'} flexDirection={'column'}>
      <Text fontWeight={'semibold'} fontSize={'18px'} color={ColorBlack}>
        서비스수수료
      </Text>
      <Flex
        w={'100%'}
        h={'2px'}
        bgColor={ColorDataTableBorderTop}
        mt={'10px'}
        mb={'30px'}
      ></Flex>
      <Flex>
        <Flex alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'165px'}
          >
            수수료(%)
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'288px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.serviceChargePercent}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDirection={'row'}
        alignItems={'center'}
        gap={'10px'}
        justifyContent={'center'}
        mt={'40px'}
      >
        <CustomButton
          text="목록"
          borderColor={ColorGray400}
          color={ColorGray700}
          px="67px"
          py="14px"
          bgColor={ColorWhite}
          fontSize="15px"
          onClick={() => router.back()}
        />
      </Flex>
    </Flex>
  );
}

export default ServiceInfo;
