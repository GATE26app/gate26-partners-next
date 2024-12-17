'use client';
import CheckBox from '@/components/common/CheckBox';
import TermModal from '@/components/common/Modal/TermModal';
import {
  ColorBlack,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
function page() {
  const router = useRouter();
  const toast = useToast();
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [privetebox, setPrivetebox] = useState<boolean>(false);
  const [servicebox, setservicebox] = useState<boolean>(false);
  const [termbox, setTermbox] = useState<boolean>(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [privateModal, setPrivateModal] = useState(false);
  const [termModal, setTermModal] = useState(false);

  const toggleCheckbox = () => {
    if (checkbox === false) {
      setCheckbox(true);
      setPrivetebox(true);
      setservicebox(true);
      setTermbox(true);
    } else {
      setCheckbox(false);
      setPrivetebox(false);
      setservicebox(false);
      setTermbox(false);
    }
  };

  useEffect(() => {
    if (privetebox && servicebox && termbox) {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
  }, [privetebox, servicebox, termbox]);

  const handleClickNext = () => {
    if (privetebox && servicebox && termbox) {
      router.push('/join/select');
    } else {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            필수 약관에 동의해주세요.
          </Box>
        ),
      });
    }
  };
  return (
    <>
      {serviceModal && <TermModal isOpen={serviceModal} onClose={() => setServiceModal(false)} contentSrc='https://gate26.co.kr/PartnerService.html' title={'서비스 약관동의'}/>}
      {privateModal && <TermModal isOpen={privateModal} onClose={() => setPrivateModal(false)} contentSrc='https://gate26.co.kr/PartnerPrivacy.html' title={'개인정보 처리방침'}/>}
      <Box width="100vw" backgroundColor={ColorGray50}>
        <Flex
          pt={'150px'}
          // height={'100%'}
          pb={'170px'}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            w={'568px'}
            bgColor={ColorWhite}
            borderRadius={'16px'}
            px={'74px'}
            py={'70px'}
            borderColor={ColorGray400}
            borderWidth={1}
            boxShadow={'3px 6px 20px #3737370D'}
          >
            <Text fontWeight={700} fontSize={'22px'} color={ColorBlack}>
              회원가입을 위해
            </Text>
            <Flex>
              <Text fontWeight={700} fontSize={'22px'} color={ColorRed}>
                약관에 동의
              </Text>
              <Text fontWeight={700} fontSize={'22px'} color={ColorBlack}>
                해 주세요.
              </Text>
            </Flex>
            <Box
              mt={'35px'}
              pb={'20px'}
              mb={'20px'}
              borderBottomWidth={1}
              borderBottomColor={ColorGray400}
            >
              <CheckBox
                children={'전체 동의합니다.'}
                onClick={() => toggleCheckbox()}
                checked={checkbox}
              />
            </Box>
            <Flex justifyContent={'space-between'} pb={'15px'}>
              <CheckBox
                children={'[필수] 서비스 약관동의'}
                onClick={() => setservicebox(!servicebox)}
                checked={servicebox}
              />
              <Text
                fontWeight={400}
                fontSize={'15px'}
                color={ColorGray700}
                textDecoration={'underline'}
                cursor={'pointer'}
                onClick={() => setServiceModal(true)}
              >
                자세히보기
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} pb={'15px'}>
              <CheckBox
                children={'[필수] 개인정보 처리방침'}
                onClick={() => setPrivetebox(!privetebox)}
                checked={privetebox}
              />
              <Text
                fontWeight={400}
                fontSize={'15px'}
                color={ColorGray700}
                textDecoration={'underline'}
                cursor={'pointer'}
                onClick={() => setPrivateModal(true)}
              >
                자세히보기
              </Text>
            </Flex>
            <Flex
              w={'100%'}
              bgColor={ColorRed}
              borderRadius={'10px'}
              h={'50px'}
              justifyContent={'center'}
              alignItems={'center'}
              mt={'30px'}
              mb={'15px'}
              cursor={'pointer'}
              onClick={handleClickNext}
            >
              <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
                다음
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default page;
