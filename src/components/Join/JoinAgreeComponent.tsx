import React, { useEffect, useState } from 'react';
import CheckBox from '@/components/common/CheckBox';
import { JoinBody } from '@/apis/join/JoinApi.type';
import TermModal from '@/components/common/Modal/TermModal';
import {
    ColorBlack,
    ColorGray400,
    ColorGray700,
    ColorRed,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast, Image } from '@chakra-ui/react';


interface Props {
    joinInfo: JoinBody;
    setJoinInfo: React.Dispatch<React.SetStateAction<JoinBody>>;
}
function JoinAgreeComponent({ joinInfo, setJoinInfo }: Props) {

    const [checkbox, setCheckbox] = useState<boolean>(false);
    const [serviceModal, setServiceModal] = useState(false);
    const [privateModal, setPrivateModal] = useState(false);

    const toggleCheckbox = () => {
        if (checkbox === false) {
            setCheckbox(true);
        } else {
            setCheckbox(false);
        }
    };

    useEffect(() => {
        console.log("isTermsAgreed: ", joinInfo.isTermsAgreed);
        console.log("isPrivacyPolicyAgreed: ", joinInfo.isPrivacyPolicyAgreed);
        if (joinInfo.isTermsAgreed && joinInfo.isPrivacyPolicyAgreed) {
            setCheckbox(true);
        } else {
            setCheckbox(false);
        }
    }, [joinInfo.isTermsAgreed, joinInfo.isPrivacyPolicyAgreed]);

    useEffect(() => {
        if (checkbox) {
            setCheckbox(true);
            setJoinInfo({
                ...joinInfo,
                isTermsAgreed: true,
                isPrivacyPolicyAgreed: true
            });
        } else {
            setCheckbox(false);
            setJoinInfo({
                ...joinInfo,
                isTermsAgreed: false,
                isPrivacyPolicyAgreed: false
            });
        }
    }, [checkbox]);

    const clickTermsAgree = () => {
        setJoinInfo({
            ...joinInfo,
            isTermsAgreed: !joinInfo.isTermsAgreed,
          });
    };

    const clickPrivacyAgree = () => {
        setJoinInfo({
            ...joinInfo,
            isPrivacyPolicyAgreed: !joinInfo.isPrivacyPolicyAgreed,
          });
    };
    
    return (
        <>
            {serviceModal && <TermModal isOpen={serviceModal} onClose={() => setServiceModal(false)} contentSrc='https://gate26.co.kr/PartnerService.html' title={'서비스 약관동의'} />}
            {privateModal && <TermModal isOpen={privateModal} onClose={() => setPrivateModal(false)} contentSrc='https://gate26.co.kr/PartnerPrivacy.html' title={'개인정보 처리방침'} />}
            <Flex
                pb={'6px'}
                pt={'30px'}
                mt={'30px'}
                borderTopWidth={1}
                borderTopColor={ColorGray400} />
            <Flex flexDirection={'row'}>
                <Text fontWeight={600} fontSize={'20px'}>
                    <span style={{ color: ColorBlack }}>회원가입을 위해 </span>
                    <span style={{ color: ColorRed }}>약관에 동의</span>
                    <span style={{ color: ColorBlack }}>해 주세요</span>
                </Text>
            </Flex>
            <Flex pt={'6px'} pb={'6px'}>
                <CheckBox
                    fontWeight={600}
                    children={'전체 동의합니다.'}
                    onClick={() => toggleCheckbox()}
                    checked={checkbox}
                />
            </Flex>

            <Flex pt={'6px'} justifyContent={'space-between'} pb={'15px'} >

                <Flex 
                    onClick={() => {
                        clickTermsAgree();
                    }}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        src={
                            joinInfo.isTermsAgreed
                            ? '/images/icon/check_on.png'
                            : '/images/icon/check_off.png'
                        }
                    />
                    <Text fontSize={'15px'} ml="10px" color={ColorBlack}>
                    {"[필수] 서비스 약관동의"}
                    </Text>
                </Flex>
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
                <Flex onClick={() => {clickPrivacyAgree();}}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        src={
                            joinInfo.isPrivacyPolicyAgreed
                            ? '/images/icon/check_on.png'
                            : '/images/icon/check_off.png'
                        }
                        />
                    <Text fontSize={'15px'} ml="10px" color={ColorBlack}>
                    {"[필수] 개인정보 처리방침"}
                    </Text>
                </Flex>
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
        </>
    );
}

export default JoinAgreeComponent;
