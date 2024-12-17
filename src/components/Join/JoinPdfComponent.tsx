import { usePostJoinPdfMutation } from '@/apis/join/JoinApi.mutation';
import { JoinBody, JoinFilesArray } from '@/apis/join/JoinApi.type';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorBlue,
  ColorInputBorder,
  ColorRed,
} from '@/utils/_Palette';
import { imgPath } from '@/utils/format';
import {
  Box,
  CircularProgress,
  Flex,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ButtonModal from '../common/ModalContainer/_fragments/ButtonModal';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface Props {
  joinInfo: JoinBody;
  setJoinInfo: React.Dispatch<React.SetStateAction<JoinBody>>;
}
type ImgPath = {
  type: number;
  img: string;
};
function JoinPdfComponent({ joinInfo, setJoinInfo }: Props) {
  const toast = useToast();
  const [imgIndex, setImgIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pdfList, setPdfList] = useState<Array<JoinFilesArray>>([]);
  const [filePathList, setFilePathList] = useState<Array<ImgPath>>([]);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  const { mutate: PdfMutate, isLoading } = usePostJoinPdfMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          handleImageSave(res.data?.filePath, res.data?.thumbnailImagePath);
          // setJoinInfo({
          //   ...joinInfo,
          //   images: [
          //     {
          //       imagePath: res.data.imagePath,
          //       thumbnailImagePath: res.data.thumbnailImagePath,
          //     },
          //   ],
          // });
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

  const handleImageSave = (filePath: string, thumbnailImagePath: string) => {
    const obj = {
      type: imgIndex,
      filePath: filePath,
      thumbnailImagePath: thumbnailImagePath,
    };
    setPdfList([...pdfList, obj]);
    // setImagePath('');
  };

  useEffect(() => {
    if (pdfList.length > 0) {
      setJoinInfo({
        ...joinInfo,
        files: pdfList,
      });
    } else {
      setJoinInfo({
        ...joinInfo,
        files: [
          {
            filePath: '',
            thumbnailImagePath: '',
            type: 0,
          },
        ],
      });
    }
  }, [pdfList]);

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  //pdf
  // useEffect(() => {
  //   pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  // }, []);
  const handleUploadPdf = async (e: any) => {
    //이미지 미리보기 기능
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (filePathList.some((arr) => arr.type === imgIndex) === true) {
          setFilePathList(
            filePathList.filter((item) => imgIndex !== item.type),
          );
        } else {
          setFilePathList([
            ...filePathList,
            {
              type: imgIndex,
              img: reader.result as string,
            },
          ]);
        }
      };
    } else {
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    PdfMutate(formData);
  };

  const onDeleteImg = (type: number) => {
    const deleteImage = pdfList.filter((item) => item.type !== type);
    const deleteImg = filePathList.filter((item) => item.type !== type);
    setPdfList(deleteImage);
    setFilePathList(deleteImg);

    setJoinInfo({
      ...joinInfo,
      files: [
        {
          filePath: '',
          thumbnailImagePath: '',
          type: 0,
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
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          사업자등록증 파일첨부
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'column'} position={'relative'} w={'100px'}>
        {joinInfo?.files.filter((item) => item.type == 1).length > 0 &&
          joinInfo?.files.filter((item) => item.type == 1)[0]
            ?.thumbnailImagePath !== '' && (
            <Flex
              position={'absolute'}
              top={'10px'}
              right={'10px'}
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '파일 삭제',
                  message: '파일을 삭제하시곘습니까?',
                  type: 'alert',
                  okButtonName: '확인',
                  cbOk: () => {
                    onDeleteImg(1);
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
                // onClick={() => onDeleteImg(1)}
              />
            </Flex>
          )}
        {imgIndex == 1 && isLoading ? (
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
            {joinInfo?.files.filter((item) => item.type == 1).length > 0 &&
            joinInfo?.files.filter((item) => item.type == 1)[0]
              ?.thumbnailImagePath !== '' ? (
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
                  {joinInfo?.files
                    .filter((item) => item.type == 1)[0]
                    ?.filePath.includes('pdf') ? (
                    <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                      PDF
                    </Text>
                  ) : (
                    <img
                      // src={imagePath[index]?.imagePath}
                      // src={imagePath[]}
                      src={`${filePathList?.filter((item) => item.type == 1)[0]?.img}`}
                      alt="이미지 업로드"
                    />
                  )}
                </Flex>
              </>
            ) : (
              <label htmlFor="pdffirst">
                <Flex
                  w={100}
                  h={100}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderColor={ColorInputBorder}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                  onClick={() => setImgIndex(1)}
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
          accept="image/jpeg, image/png, image/gif, image/jpg"
          id="pdffirst"
          onChange={handleUploadPdf}
          style={{ display: 'none' }}
        ></input>
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        권장크기(1000*1000) 및 용량(10MB) 이하, 파일형식 (JPG,PNG,GIF,BMP)
      </Text>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          통신판매업신고증 파일첨부
        </Text>
        {/* <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text> */}
      </Flex>
      <Flex flexDirection={'column'} position={'relative'} w={'100px'}>
        {joinInfo?.files.filter((item) => item.type == 2).length > 0 &&
          joinInfo?.files.filter((item) => item.type == 2)[0]
            ?.thumbnailImagePath !== '' && (
            <Flex
              position={'absolute'}
              top={'10px'}
              right={'10px'}
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '파일 삭제',
                  message: '파일을 삭제하시곘습니까?',
                  type: 'alert',
                  okButtonName: '확인',
                  cbOk: () => {
                    onDeleteImg(2);
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
                // onClick={() => onDeleteImg(2)}
              />
            </Flex>
          )}
        {imgIndex == 2 && isLoading ? (
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
            {joinInfo?.files.filter((item) => item.type == 2).length > 0 &&
            joinInfo?.files.filter((item) => item.type == 2)[0]
              ?.thumbnailImagePath !== '' ? (
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
                  {joinInfo?.files
                    .filter((item) => item.type == 2)[0]
                    ?.filePath.includes('pdf') ? (
                    <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                      PDF
                    </Text>
                  ) : (
                    <img
                      // src={imagePath[index]?.imagePath}
                      // src={imagePath[]}
                      src={`${filePathList?.filter((item) => item.type == 2)[0]?.img}`}
                      alt="이미지 업로드"
                    />
                  )}
                  {/* <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                    PDF
                  </Text> */}
                  {/* <img
                    // src={imagePath[index]?.imagePath}
                    // src={imagePath[]}
                    src={`${imgPath()}${joinInfo?.files.filter((item) => item.type == 2)[0]?.thumbnailImagePath}`}
                    alt="이미지 업로드"
                  /> */}
                </Flex>
              </>
            ) : (
              <label htmlFor="pdf2">
                <Flex
                  w={100}
                  h={100}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderColor={ColorInputBorder}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                  onClick={() => setImgIndex(2)}
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
          id="pdf2"
          onChange={handleUploadPdf}
          style={{ display: 'none' }}
        ></input>
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        권장크기(1000*1000) 및 용량(10MB) 이하, 파일형식 (JPG,PNG,GIF,BMP)
      </Text>
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          정산 계좌
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'space-between'} pb={'10px'}>
        <InputBox
          placeholder="은행명"
          w={'30%'}
          value={joinInfo.bank}
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              bank: e.target.value,
            });
          }}
        />
        <InputBox
          placeholder="계좌번호"
          w={'67%'}
          value={joinInfo.accountNumber}
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              accountNumber: e.target.value.replace(/[^0-9]/g, ''),
            });
          }}
        />
      </Flex>
      <InputBox
        placeholder="예금주"
        value={joinInfo.accountHolder}
        onChange={(e) => {
          setJoinInfo({
            ...joinInfo,
            accountHolder: e.target.value,
          });
        }}
      />
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          통장사본 파일첨부
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'column'} position={'relative'} w={'100px'}>
        {joinInfo?.files.filter((item) => item.type == 3).length > 0 &&
          joinInfo?.files.filter((item) => item.type == 3)[0]
            ?.thumbnailImagePath !== '' && (
            <Flex
              position={'absolute'}
              top={'10px'}
              right={'10px'}
              // onClick={() => {
              //   setOpenAlertModal(true);
              //   setModalState({
              //     ...ModalState,
              //     title: '이미지 삭제',
              //     message: '이미지를 삭제하시겠습니까?',
              //     type: 'alert',
              //     okButtonName: '확인',
              //     cbOk: () => {
              //       // onDeleteImg(index);
              //       // window.history.back();
              //     },
              //   });
              // }}
            >
              <Image
                src={'/images/Page/icon_delete_img.png'}
                alt="이미지 삭제"
                width={18}
                height={18}
                onClick={() => onDeleteImg(3)}
              />
            </Flex>
          )}
        {imgIndex == 3 && isLoading ? (
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
            {joinInfo?.files.filter((item) => item.type == 3).length > 0 &&
            joinInfo?.files.filter((item) => item.type == 3)[0]
              ?.thumbnailImagePath !== '' ? (
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
                  {joinInfo?.files
                    .filter((item) => item.type == 3)[0]
                    ?.filePath.includes('pdf') ? (
                    <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                      PDF
                    </Text>
                  ) : (
                    <img
                      // src={imagePath[index]?.imagePath}
                      // src={imagePath[]}
                      src={`${filePathList?.filter((item) => item.type == 3)[0]?.img}`}
                      alt="이미지 업로드"
                    />
                  )}
                </Flex>
              </>
            ) : (
              <label htmlFor="pdf3">
                <Flex
                  w={100}
                  h={100}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderColor={ColorInputBorder}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                  onClick={() => setImgIndex(3)}
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
          id="pdf3"
          onChange={handleUploadPdf}
          style={{ display: 'none' }}
        ></input>
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        권장크기(1000*1000) 및 용량(10MB) 이하, 파일형식 (JPG,PNG,GIF,BMP)
      </Text>

      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          체류증명서 파일첨부
        </Text>
      </Flex>
      <Flex flexDirection={'column'} position={'relative'} w={'100px'}>
        {joinInfo?.files.filter((item) => item.type == 4).length > 0 &&
          joinInfo?.files.filter((item) => item.type == 4)[0]
            ?.thumbnailImagePath !== '' && (
            <Flex position={'absolute'} top={'10px'} right={'10px'}>
              <Image
                src={'/images/Page/icon_delete_img.png'}
                alt="이미지 삭제"
                width={18}
                height={18}
                onClick={() => onDeleteImg(4)}
              />
            </Flex>
          )}
        {imgIndex == 4 && isLoading ? (
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
            {joinInfo?.files.filter((item) => item.type == 4).length > 0 &&
            joinInfo?.files.filter((item) => item.type == 4)[0]
              ?.thumbnailImagePath !== '' ? (
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
                  {joinInfo?.files
                    .filter((item) => item.type == 4)[0]
                    ?.filePath.includes('pdf') ? (
                    <Text fontWeight={600} fontSize={'16px'} color={ColorBlack}>
                      PDF
                    </Text>
                  ) : (
                    <img
                      src={`${filePathList?.filter((item) => item.type == 4)[0]?.img}`}
                      alt="이미지 업로드"
                    />
                  )}
                </Flex>
              </>
            ) : (
              <label htmlFor="pdf3">
                <Flex
                  w={100}
                  h={100}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderColor={ColorInputBorder}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                  onClick={() => setImgIndex(4)}
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
          id="pdf3"
          onChange={handleUploadPdf}
          style={{ display: 'none' }}
        ></input>
      </Flex>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        해외상품 판매 시 필요
      </Text>
      <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
        권장크기(1000*1000) 및 용량(10MB) 이하, 파일형식 (JPG,PNG,GIF,BMP)
      </Text>
    </>
  );
}

export default JoinPdfComponent;
