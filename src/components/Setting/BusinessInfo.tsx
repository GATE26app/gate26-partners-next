import { ProfileBodyType } from '@/apis/setting/SettingApi.type';
import {
  ColoLineGray,
  ColorBlack,
  ColorGray200,
  ColorGray700,
  ColorRed,
  ColorRed50,
} from '@/utils/_Palette';
import { filePath, imgPath } from '@/utils/format';
import { getToken } from '@/utils/localStorage/token';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface Props {
  info: ProfileBodyType | undefined;
}
function BusinessInfo({ info }: Props) {
  // 사업자 등록증
  const imgAxios = async () => {
    const res = await axios.get(
      filePath() +
        info?.files.filter((item) => item.type == 1)[0].thumbnailImagePath,
      {
        responseType: 'blob',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      },
    );
    const imageURL = window.URL.createObjectURL(res.data);
    document.getElementById('target-img-1').src = imageURL;
  };
  // 통신판매업신고증
  const img1Axios = async () => {
    const res = await axios.get(
      filePath() +
        info?.files.filter((item) => item.type == 2)[0].thumbnailImagePath,
      {
        responseType: 'blob',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      },
    );
    const imageURL = window.URL.createObjectURL(res.data);
    document.getElementById('target-img-2').src = imageURL;
  };
  // 통장사본
  const img2Axios = async () => {
    const res = await axios.get(
      filePath() +
        info?.files.filter((item) => item.type == 3)[0].thumbnailImagePath,
      {
        responseType: 'blob',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      },
    );
    const imageURL = window.URL.createObjectURL(res.data);
    document.getElementById('target-img-3').src = imageURL;
  };
  // 체류증명서
  const img3Axios = async () => {
    const res = await axios.get(
      filePath() +
        info?.files.filter((item) => item.type == 4)[0].thumbnailImagePath,
      {
        responseType: 'blob',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      },
    );
    const imageURL = window.URL.createObjectURL(res.data);
    document.getElementById('target-img-4').src = imageURL;
  };

  useEffect(() => {
    if (info) {
      imgAxios();
      img1Axios();
      img2Axios();
      img3Axios();
    }
  }, [info]);

  const downloadFile = async (url: string) => {
    // const url = 'https://example.com/path/to/your/file'; // 파일을 다운로드할 URL

    try {
      const response = await fetch(filePath() + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = '첨부파일';

      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/"/g, '');
      }

      a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <Box
      borderRadius={'12px'}
      borderColor={ColoLineGray}
      borderWidth={1}
      w={'100%'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex pb={'33px'}>
        <Flex
          bgColor={ColorRed50}
          borderRadius={'5px'}
          px={'6px'}
          py={'4px'}
          flexDirection={'row'}
        >
          <Text color={ColorRed} fontWeight={600} fontSize={'14px'}>
            사업자 정보변경을 원할 시 고객센터 [이메일]로 문의주세요.
          </Text>
        </Flex>
      </Flex>
      <Flex gap={'60px'}>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            {info?.type == 1 ? '연락처' : '이메일'}
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.type == 1 ? info?.hp : info?.authEmail}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            업태/업종
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'190px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.businessType}
            </Text>
          </Flex>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            px={'10px'}
          >
            /
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'190px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.businessItem}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap={'60px'}>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            사업자번호
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.businessRegistrationNumber}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            통신판매신고번호
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.mailOrderSalesRegistrationNo}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap={'60px'}>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            대표자
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.nameOfRepresentative}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            대표전화번호
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.businessTel}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap={'60px'}>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            상점명
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.title}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            상점전화번호
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'400px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
              {info?.tel}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap={'60px'}>
        <Flex flexDirection={'row'} pb={'30px'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            사업장주소
          </Text>
          <Flex flexDirection={'column'}>
            <Flex
              px={'15px'}
              py={'13px'}
              bgColor={ColorGray200}
              borderRadius={'10px'}
              w={'400px'}
              mb={'10px'}
            >
              <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
                {info?.address}
              </Text>
            </Flex>
            <Flex
              px={'15px'}
              py={'13px'}
              bgColor={ColorGray200}
              borderRadius={'10px'}
              w={'400px'}
            >
              <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
                {info?.addressDetail}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Box w={'100%'} h={'1px'} bgColor={ColoLineGray}></Box>
      <Flex flexDirection={'row'} mt={'30px'} gap={'80px'}>
        {/* {info?.files?.filter((item) => item.type == 1).length > 0} */}
        <Flex flexDirection={'column'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            pb={'10px'}
          >
            사업자등록증 파일첨부
          </Text>
          <Box
            w={'182px'}
            h={'182px'}
            borderRadius={'10px'}
            overflow={'hidden'}
          >
            {info?.files.filter((item) => item.type == 1)[0]?.filePath && (
              <img
                id="target-img-1"
                style={{ width: '182px', height: '182px', objectFit: 'cover' }}
                onClick={() =>
                  downloadFile(
                    info?.files.filter((item) => item.type == 1)[0].filePath,
                  )
                }
              />
            )}
          </Box>
        </Flex>
        <Flex flexDirection={'column'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            pb={'10px'}
          >
            통신판매업신고증 파일첨부
          </Text>
          <Box
            w={'182px'}
            h={'182px'}
            borderRadius={'10px'}
            overflow={'hidden'}
          >
            {info?.files.filter((item) => item.type == 2)[0]?.filePath && (
              <img
                id="target-img-2"
                style={{ width: '182px', height: '182px', objectFit: 'cover' }}
                onClick={() =>
                  downloadFile(
                    info?.files.filter((item) => item.type == 2)[0].filePath,
                  )
                }
              />
            )}
            {/* <Image
              w={'182px'}
              h={'182px'}
              src="/images/Page/ex_image_2.jpg"
              objectFit={'cover'}
            /> */}
          </Box>
        </Flex>
        <Flex flexDirection={'column'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            pb={'10px'}
          >
            통장사본 파일첨부
          </Text>
          <Box
            w={'182px'}
            h={'182px'}
            borderRadius={'10px'}
            overflow={'hidden'}
          >
            {info?.files.filter((item) => item.type == 3)[0]?.filePath && (
              <img
                id="target-img-3"
                style={{ width: '182px', height: '182px', objectFit: 'cover' }}
                onClick={() =>
                  downloadFile(
                    info?.files.filter((item) => item.type == 3)[0].filePath,
                  )
                }
              />
            )}
            {/* <Image
              w={'182px'}
              h={'182px'}
              src="/images/Page/ex_image_2.jpg"
              objectFit={'cover'}
            /> */}
          </Box>
        </Flex>
        <Flex flexDirection={'column'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            pb={'10px'}
          >
            체류증명서 파일첨부
          </Text>
          <Box
            w={'182px'}
            h={'182px'}
            borderRadius={'10px'}
            overflow={'hidden'}
          >
            {info?.files.filter((item) => item.type == 4)[0]?.filePath && (
              <img
                id="target-img-4"
                style={{ width: '182px', height: '182px', objectFit: 'cover' }}
                onClick={() =>
                  downloadFile(
                    info?.files.filter((item) => item.type == 4)[0].filePath,
                  )
                }
              />
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BusinessInfo;
