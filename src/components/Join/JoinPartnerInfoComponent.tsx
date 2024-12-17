import { JoinBody } from '@/apis/join/JoinApi.type';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorBlue,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { getImagePath, imgPath } from '@/utils/format';
import {
  Box,
  CircularProgress,
  Flex,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ButtonModal from '../common/ModalContainer/_fragments/ButtonModal';
import { usePostJoinImageMutation } from '@/apis/join/JoinApi.mutation';
import Image from 'next/image';
interface Props {
  joinInfo: JoinBody;
  setJoinInfo: React.Dispatch<React.SetStateAction<JoinBody>>;
}
function JoinPartnerInfoComponent({ joinInfo, setJoinInfo }: Props) {
  const toast = useToast();
  const [imageLoading, setImageLoading] = useState(false);

  const [imagePath, setImagePath] = useState('');
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  const handleUploadImage = (e: any) => {
    //이미지 미리보기 기능
    const reader = new FileReader();
    if (
      e.target.files[0].name.split('.')[1] !== 'jpg' &&
      e.target.files[0].name.split('.')[1] !== 'JPG' &&
      e.target.files[0].name.split('.')[1] !== 'jpeg' &&
      e.target.files[0].name.split('.')[1] !== 'JPEG' &&
      e.target.files[0].name.split('.')[1] !== 'png' &&
      e.target.files[0].name.split('.')[1] !== 'PNG' &&
      e.target.files[0].name.split('.')[1] !== 'gif' &&
      e.target.files[0].name.split('.')[1] !== 'GIF' &&
      e.target.files[0].name.split('.')[1] !== 'bmp' &&
      e.target.files[0].name.split('.')[1] !== 'BMP'
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'jpg, jpeg, png, gif, bmp 확장자만 등록 가능합니다.'}
          </Box>
        ),
      });
    } else {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImagePath(reader.result as string);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        ImageMutate(formData);
      };
    }
  };

  const { mutate: ImageMutate, isLoading } = usePostJoinImageMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setJoinInfo({
            ...joinInfo,
            images: [
              {
                imagePath: res.data.imagePath,
                thumbnailImagePath: res.data.thumbnailImagePath,
              },
            ],
          });
        } else {
          console.log('error 코드 생성 에러', res.code);
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'이미지 용량이 초과되어 업로드가 불가능합니다.'}
            </Box>
          ),
        });
      },
    },
  });

  const onDeleteImg = () => {
    setJoinInfo({
      ...joinInfo,
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    });
  };
  return (
    <>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <Flex
        pb={'6px'}
        pt={'30px'}
        borderTopWidth={1}
        borderTopColor={ColorGray400}
        mt={'30px'}
      >
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          파트너사명
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="파트너사명 입력"
          value={joinInfo.title}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              title: e.target.value,
            })
          }
        />
      </Flex>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          상점 전화번호
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="상점 전화번호 입력"
          value={joinInfo.tel}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              tel: e.target.value.replace(/[^0-9]/g, ''),
            })
          }
        />
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        (- 없이 숫자로만 입력해주세요)
      </Text>

      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          카카오톡 아이디
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="카카오톡 아이디 입력"
          value={joinInfo.kakaoId}
          onChange={(e) =>
            setJoinInfo({
              ...joinInfo,
              kakaoId: e.target.value,
            })
          }
        />
      </Flex>

      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          브랜드로고(프로필사진)
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'column'} position={'relative'} w={'100px'}>
        {joinInfo?.images[0]?.thumbnailImagePath !== '' && (
          <Flex
            position={'absolute'}
            top={'10px'}
            right={'10px'}
            onClick={() => {
              setOpenAlertModal(true);
              setModalState({
                ...ModalState,
                title: '이미지 삭제',
                message: '이미지를 삭제하시겠습니까?',
                type: 'alert',
                okButtonName: '확인',
                cbOk: () => {
                  onDeleteImg();
                  // window.history.back();
                },
              });
            }}
          >
            <Image
              src={'/images/Page/icon_delete_img.png'}
              alt="이미지 삭제"
              width={18}
              height={18}
              // onClick={() => onDeleteImg(index)}
            />
          </Flex>
        )}
        {isLoading ? (
          <Flex
            w={100}
            h={100}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={'10px'}
            overflow={'hidden'}
            borderWidth={1}
            borderStyle={'dashed'}
            borderColor={ColorInputBorder}
          >
            <CircularProgress isIndeterminate color={ColorBlue} />
          </Flex>
        ) : (
          <>
            {joinInfo?.images[0].thumbnailImagePath !== '' ? (
              <>
                <Flex
                  w={100}
                  h={100}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                  overflow={'hidden'}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderColor={ColorInputBorder}
                >
                  <img
                    // src={imagePath[index]?.imagePath}
                    // src={imagePath[]}
                    src={getImagePath(joinInfo?.images[0].thumbnailImagePath)}
                    alt="이미지 업로드"
                  />
                </Flex>
              </>
            ) : (
              <label htmlFor="profileImg">
                <Flex
                  w={100}
                  h={100}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderColor={ColorInputBorder}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                >
                  <Image
                    src={'/images/Page/ico_plus.png'}
                    width={22}
                    height={22}
                    alt="이미지 추가"
                  />
                </Flex>
              </label>
            )}
          </>
        )}
        <input
          type="file"
          id="profileImg"
          onChange={handleUploadImage}
          style={{ display: 'none' }}
        ></input>
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        브랜드로고 및 소개글은 판매자 프로필을 통해 사용자에게 노출됩니다.
      </Text>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        권장크기(1000*1000) 및 용량(10MB) 이하, 파일형식 (JPG,PNG,GIF,BMP)
      </Text>

      <Flex pb={'6px'} pt={'30px'} justifyContent={'space-between'}>
        <Flex>
          <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
            소개글
          </Text>
          <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
            *
          </Text>
        </Flex>
        <Text fontWeight={400} fontSize={'15px'} color={ColorGray700}>
          ({joinInfo.info.length}/500)
        </Text>
      </Flex>
      <Textarea
        // value={memo}
        value={joinInfo.info}
        onChange={(e) =>
          setJoinInfo({
            ...joinInfo,
            info: e.target.value,
          })
        }
        placeholder="파트너사 소개글에 표시될 내용을 입력해주세요."
        _placeholder={{ color: ColorGray700 }}
        color={ColorBlack}
        borderColor={ColorGrayBorder}
        // onChange={(e) => setMemo(e.target.value)}
        maxLength={500}
        height={'168px'}
        borderRadius={'10px'}
        bgColor={ColorWhite}
      />
    </>
  );
}

export default JoinPartnerInfoComponent;
