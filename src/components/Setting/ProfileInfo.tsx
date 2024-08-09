import {
  useProfileChangeMutation,
  useProfileImgeMutation,
} from '@/apis/setting/SettingApi.mutation';
import {
  ProfileBodyType,
  ProfileChangeReqType,
} from '@/apis/setting/SettingApi.type';
import {
  ColoLineGray,
  ColorBlack,
  ColorBlue,
  ColorGray200,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@/utils/_Palette';
import { imgPath } from '@/utils/format';
import {
  Box,
  CircularProgress,
  Flex,
  Image,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CustomButton from '../common/CustomButton';
interface Props {
  info: ProfileBodyType | undefined;
}
function ProfileInfo({ info }: Props) {
  const toast = useToast();
  const [profileInfo, setProfileInfo] = useState({
    info: '',
    images: [
      {
        imagePath: '',
        thumbnailImagePath: '',
      },
    ],
  });

  useEffect(() => {
    if (info) {
      setProfileInfo({
        images: info?.images,
        info: info?.info,
      });
    }
  }, [info]);

  //이미지 업로드
  const { mutate: ItemCodeMutate, isLoading } = useProfileImgeMutation({
    options: {
      onSuccess: (resImg) => {
        if (resImg.success == true) {
          setProfileInfo({
            ...profileInfo,
            images: [
              {
                imagePath: resImg.data?.imagePath,
                thumbnailImagePath: resImg.data?.thumbnailImagePath,
              },
            ],
          });
          // handleImageSave(
          //   resImg.data?.imagePath,
          //   resImg.data?.thumbnailImagePath,
          // );
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'이미지 용량이 초과되어 업로드가 불가능합니다.'}
              </Box>
            ),
          });
          console.log('error 코드 생성 에러', resImg.code);
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
        // setImagePath(reader.result as string);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        ItemCodeMutate(formData);
      };
    }
  };

  const onDeleteImg = () => {
    setProfileInfo({
      ...profileInfo,
      images: [],
    });
  };

  //프로필 수정
  const { mutate: ProflieChangeMutate } = useProfileChangeMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'수정되었습니다.'}
              </Box>
            ),
          });
          window.location.reload();
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          console.log('error 코드 생성 에러', res.code);
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'에러가 발생했습니다.'}
            </Box>
          ),
        });
      },
    },
  });

  const handleSubmitProfile = () => {
    if (profileInfo.info == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'소개글을 작성해주세요.'}
          </Box>
        ),
      });
    } else if (profileInfo.images.length == 0) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'이미지를 선택해주세요.'}
          </Box>
        ),
      });
    } else {
      let obj = {
        info: profileInfo.info,
        images: profileInfo.images,
      };
      ProflieChangeMutate(obj);
    }
  };

  console.log('vvv', profileInfo?.images[0]?.thumbnailImagePath);
  return (
    <Flex flexDirection={'column'}>
      <Box
        borderRadius={'12px'}
        borderColor={ColoLineGray}
        borderWidth={1}
        w={'100%'}
        p={'40px'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'column'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            pb={'10px'}
            color={ColorBlack}
            w={'110px'}
          >
            프로필 사진
          </Text>

          <Flex flexDirection={'column'} position={'relative'} w={'182px'}>
            {profileInfo?.images[0]?.thumbnailImagePath !== '' &&
              profileInfo?.images[0]?.thumbnailImagePath !== undefined && (
                <>
                  <Flex
                    position={'absolute'}
                    top={'10px'}
                    right={'10px'}
                    onClick={() => {
                      onDeleteImg();
                      // setOpenAlertModal(true);
                      // setModalState({
                      //   ...ModalState,
                      //   title: '이미지 삭제',
                      //   message: '이미지를 삭제하시곘습니까?',
                      //   type: 'alert',
                      //   okButtonName: '확인',
                      //   cbOk: () => {
                      //     onDeleteImg(1);
                      //     // window.history.back();
                      //   },
                      // });
                    }}
                  >
                    <Image
                      src={'/images/Page/icon_delete_img.png'}
                      alt="이미지 삭제"
                      width={'32px'}
                      height={'32px'}
                    />
                  </Flex>
                </>
              )}
            {isLoading ? (
              <Flex
                w={'182px'}
                h={'182px'}
                borderWidth={1}
                borderStyle={'dashed'}
                borderColor={ColorInputBorder}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'10px'}
                overflow={'hidden'}
              >
                <CircularProgress isIndeterminate color={ColorBlue} />
              </Flex>
            ) : (
              <>
                {profileInfo?.images[0]?.thumbnailImagePath !== '' &&
                profileInfo?.images[0]?.thumbnailImagePath !== undefined ? (
                  <>
                    <Flex
                      w={'182px'}
                      h={'182px'}
                      borderWidth={1}
                      borderStyle={'dashed'}
                      borderColor={ColorInputBorder}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={'10px'}
                      overflow={'hidden'}
                    >
                      <img
                        src={
                          imgPath() + profileInfo?.images[0]?.thumbnailImagePath
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                        alt="이미지 업로드"
                      />
                    </Flex>
                  </>
                ) : (
                  <label htmlFor="pdf">
                    <Flex
                      w={'182px'}
                      h={'182px'}
                      borderWidth={1}
                      borderStyle={'dashed'}
                      borderColor={ColorInputBorder}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={'10px'}
                    >
                      <Image
                        src={'/images/Page/ico_plus.png'}
                        width={'28px'}
                        height={'28px'}
                        alt="이미지 추가"
                      />
                    </Flex>
                  </label>
                )}
              </>
            )}

            <input
              type="file"
              id="pdf"
              onChange={handleUploadImage}
              style={{ display: 'none' }}
            ></input>
          </Flex>
          <Text
            pt={'10px'}
            fontWeight={400}
            fontSize={'14px'}
            color={ColorGray700}
          >
            * 1000px*1000px 사이즈
          </Text>
          <Text fontWeight={400} fontSize={'14px'} color={ColorGray700}>
            * 이미지는 최대 1장 등록 가능합니다
          </Text>
          <Flex flexDirection={'row'} pt={'30px'} alignItems={'flex-start'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              pb={'10px'}
              color={ColorBlack}
              w={'110px'}
              flexShrink={0}
            >
              소개글
            </Text>
            <Flex w={'100%'} flexDirection={'column'}>
              <Textarea
                value={profileInfo.info}
                placeholder="파트너사 소개글에 표시될 내용을 입력해주세요."
                _placeholder={{ color: ColorGray700 }}
                color={ColorBlack}
                borderColor={ColorGrayBorder}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    info: e.target.value,
                  })
                }
                maxLength={500}
                w={'100%'}
                height={'168px'}
                borderRadius={'10px'}
                bgColor={ColorWhite}
              />
              <Text
                fontWeight={400}
                textAlign={'end'}
                fontSize={'15px'}
                color={ColorGray700}
                pt={'5px'}
              >
                ({profileInfo?.info.length}/500)
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        gap={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={'40px'}
      >
        <CustomButton
          text="취소"
          borderColor={ColorGray400}
          fontWeight={400}
          borderRadius="10px"
          bgColor={ColorWhite}
          px="67px"
          py="13px"
          color={ColorBlack}
          fontSize="15px"
        />
        <CustomButton
          text="저장"
          borderColor={ColorRed}
          fontWeight={400}
          borderRadius="10px"
          bgColor={ColorRed}
          px="67px"
          py="13px"
          color={ColorWhite}
          fontSize="15px"
          onClick={() => handleSubmitProfile()}
        />
      </Flex>
    </Flex>
  );
}

export default ProfileInfo;
