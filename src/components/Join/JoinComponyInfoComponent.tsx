import { JoinBody } from '@/apis/join/JoinApi.type';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import AddressModal from '../common/Modal/AddressModal';
import GoogleMapModal from '../common/Modal/GoogleMapModal';
interface Props {
  joinInfo: JoinBody;
  setJoinInfo: React.Dispatch<React.SetStateAction<JoinBody>>;
}
function JoinComponyInfoComponent({ joinInfo, setJoinInfo }: Props) {
  const [addressModal, setAddressModal] = useState(false);
  const [googleModal, setGoogleModal] = useState(false);

  const handleAddress = (location: { address: string }) => {
    if (location.address !== '') {
      setJoinInfo({
        ...joinInfo,
        address: location.address,
      });
    }
  };

  return (
    <>
      {googleModal && (
        <GoogleMapModal
          isOpen={googleModal}
          onClose={() => setGoogleModal(false)}
          onComplete={handleAddress}
        />
      )}

      {addressModal && (
        <AddressModal
          isOpen={addressModal}
          onClose={() => setAddressModal(false)}
          onComplete={handleAddress}
        />
      )}

      <Flex
        pb={'6px'}
        pt={'30px'}
        mt={'30px'}
        borderTopWidth={1}
        borderTopColor={ColorGray400}
      >
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          상호(법인)명
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="사업자등록증에 기재된 회사명 입력"
          value={joinInfo.nameOfCompany}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              nameOfCompany: e.target.value,
            })
          }
        />
      </Flex>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          사업자등록번호
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="사업자번호"
          value={joinInfo.businessRegistrationNumber}
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              businessRegistrationNumber: e.target.value.replace(/[^0-9]/g, ''),
            });
          }}
          maxLength={10}
        />
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        (- 없이 숫자로만 입력해주세요)
      </Text>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          업태/업종
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex
        flexDirection={'row'}
        // justifyContent={'space-between'}
        alignItems={'center'}
        gap={'5px'}
      >
        <InputBox
          placeholder="업태"
          width={'48%'}
          value={joinInfo.businessType}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              businessType: e.target.value,
            })
          }
        />
        <Text color={ColorGray400} fontWeight={400} fontSize={'15px'}>
          /
        </Text>
        <InputBox
          placeholder="업종"
          width={'48%'}
          value={joinInfo.businessItem}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              businessItem: e.target.value,
            })
          }
        />
      </Flex>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          통신판매업신고번호
        </Text>
        {/* <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text> */}
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="통신판매업신고번호"
          value={joinInfo.mailOrderSalesRegistrationNo}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              mailOrderSalesRegistrationNo: e.target.value.replace(
                /[^0-9]/g,
                '',
              ),
            })
          }
        />
      </Flex>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          대표자
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="대표자명 입력"
          value={joinInfo.nameOfRepresentative}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              nameOfRepresentative: e.target.value,
            })
          }
        />
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        실명으로 정확히 입력해주세요
      </Text>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          대표 전화번호
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="회사 대표 전화번호 입력"
          value={joinInfo.businessTel}
          maxLength={11}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              businessTel: e.target.value.replace(/[^0-9]/g, ''),
            })
          }
        />
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        (- 없이 숫자로만 입력해주세요)
      </Text>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          사업장 주소
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex gap={'10px'} flexDirection={'row'} justifyContent={'space-between'}>
        {/* <InputBox
          placeholder="주소입력"
          // value={request.loginId}
          // onChange={(e) => handleChangeInput('loginId', e.target.value)}
          // mb={'10px'}
          w={'70%'}
        /> */}
        <Box
          w={'73%'}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={ColorInputBorder}
          px={'15px'}
          py={'11px'}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={joinInfo.address == '' ? ColorGray700 : ColorBlack}
          >
            {joinInfo.address == '' ? '주소 입력' : joinInfo.address}
          </Text>
        </Box>
        <CustomButton
          bgColor={ColorBlack}
          color={ColorWhite}
          fontSize="15px"
          text="주소검색"
          px="29px"
          py="13px"
          borderColor={ColorBlack}
          onClick={() => {
            if (joinInfo.type == 2) setGoogleModal(true);
            else setAddressModal(true);
          }}
        />
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'} mt={'10px'}>
        <InputBox
          placeholder="상세주소"
          value={joinInfo.addressDetail}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              addressDetail: e.target.value,
            })
          }
        />
      </Flex>
    </>
  );
}

export default JoinComponyInfoComponent;
