import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useToast,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import styled from '@emotion/styled';
import {
  ColoLineGray,
  ColorBlack,
  ColorGray700,
  ColorGray900,
  ColorInputBorder,
  ColorWhite,
} from '@/utils/_Palette';
import ReviewGoodsInfo from './review/ReviewGoodsInfo';
import ButtonModal from '../ModalContainer/_fragments/ButtonModal';
import { useQuery } from 'react-query';
import reviewApi from '@/apis/review/ReviewApi';
import {
  PaymentMethod,
  formatDateDash,
  getImagePath,
  imgPath,
} from '@/utils/format';
import {
  useDeleteReviewCommentMutation,
  usePutReviewCommentMutation,
} from '@/apis/review/ReviewApi.mutation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  reviewId: string;
}

function ReviewModal({
  onClose,
  reviewId,
  // onSubmit,
  ...props
}: AlertModalProps) {
  const toast = useToast();
  const [reload, setReload] = useState(false);
  const [comment, setComment] = useState('');
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'confirm',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  //리뷰 상세
  const {
    data: ReviewData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['orderItem', String(reviewId)],
    () => reviewApi.getReviewDetail(String(reviewId)),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!reviewId,
    },
  );

  //댓글 작성
  const onCommentSubmit = () => {
    const obj = {
      reviewId: reviewId,
      data: {
        replyContent: comment,
      },
    };
    if (comment == '') {
      toast({
        position: 'top',
        duration: 1000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            댓글을 입력해주세요.
          </Box>
        ),
      });
    } else {
      commentList(obj);
    }
  };

  //리뷰 댓글 작성
  const { mutate: commentList } = usePutReviewCommentMutation({
    options: {
      onSuccess: (res) => {
        setReload(true);
        setComment('');
        // setList(res.data);
        // setGoodsInfo({
        //   reviewState: false,
        // });
      },
    },
  });

  //리뷰 댓글 삭제
  const { mutate: deleteMutate } = useDeleteReviewCommentMutation({
    options: {
      onSuccess: (res) => {
        console.log('댓글 삭제 res', res);
        setReload(true);
        setComment('');
        // setList(res.data);
        // setGoodsInfo({
        //   reviewState: false,
        // });
      },
    },
  });

  useEffect(() => {
    //reload 가 true일때 (댓글 작성시) 재시작
    if (reload) {
      refetch();
      setTimeout(() => {
        //1초후 false처리
        setReload(false);
      }, 1000);
    }
  }, [reload]);

  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <ModalOverlay />
      <Content maxW={1024} h={760} overflowX={'auto'}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
            mt={'30px'}
          >
            <Text>리뷰 답글</Text>
            <Image
              src={'/images/Page/ico_modal_close.png'}
              width={'20px'}
              height={'20px'}
              alt="모달 close"
              onClick={onClose}
            />
          </Flex>
        </Header>
        <ModalBody>
          <ReviewGoodsInfo data={ReviewData?.data} />

          {/* 리뷰 내역 */}

          <Flex flexDirection={'column'} pt={'30px'} pb={'20px'}>
            <Flex pb={'10px'}>
              <Text
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                w={'150px'}
              >
                작성일
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {ReviewData?.data?.review.writeDate !== null
                  ? formatDateDash(ReviewData?.data.review.writeDate)
                  : '-'}
              </Text>
            </Flex>
            <Flex pb={'10px'}>
              <Text
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                w={'150px'}
              >
                작성자
              </Text>
              <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                {ReviewData?.data.user.nickName}
              </Text>
            </Flex>
            <Flex>
              <Text
                color={ColorBlack}
                fontWeight={600}
                fontSize={'15px'}
                w={'150px'}
              >
                별점
              </Text>
              <Flex alignItems={'center'} gap={'5px'}>
                <Image
                  width={'14px'}
                  height={'14px'}
                  src={'/images/Page/ico_star_on.png'}
                  alt="데이터 없음"
                />
                <Text color={ColorBlack} fontWeight={400} fontSize={'14px'}>
                  {ReviewData?.data.review.star}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex pb={'30px'}>
            <Swiper
              pagination={true}
              // pagination={pagination}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* {ReviewData?.data?.review?.images !== undefined &&
            ReviewData?.data?.review?.images.length > 0 && (
              <Flex borderRadius={'12px'} overflow={'hidden'} pb={'30px'}>
                <Image
                  width={'100%'}
                  src={
                    imgPath() + ReviewData?.data?.review?.images[0].imagePath
                  }
                />
              </Flex>
            )} */}
              {ReviewData?.data?.review?.images !== undefined &&
                ReviewData?.data?.review?.images.length > 0 &&
                ReviewData?.data?.review?.images.map((item) => {
                  return (
                    <SwiperSlide>
                      <Box borderRadius={'12px'} overflow={'hidden'}>
                        <Image
                          width={'100%'}
                          src={getImagePath(item.imagePath)}
                        />
                      </Box>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </Flex>

          <Flex>
            <Text>{ReviewData?.data.review.content}</Text>
          </Flex>
          {/* 답변 */}
          <Flex flexDirection={'column'}>
            <Flex
              mt={'25px'}
              pt={'20px'}
              flexDirection={'column'}
              pb={'25px'}
              borderTopColor={ColoLineGray}
              borderTopWidth={1}
            >
              {!ReviewData?.data?.review?.replyContent && (
                <InputGroup>
                  <InputBox
                    pr={'40px'}
                    placeholder="답글 내용을 입력해주세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    // value={data.shippingInvoice}
                    // onChange={(e) =>
                    //   setData({ ...data, shippingInvoice: e.target.value })
                    // }
                  />
                  <InputRightElement>
                    <Flex pr={'5px'} onClick={() => onCommentSubmit()}>
                      <Image
                        src="/images/Page/ico_review_submit.png"
                        w={'24px'}
                        h={'24px'}
                      />
                    </Flex>
                  </InputRightElement>
                </InputGroup>
              )}
            </Flex>

            {ReviewData?.data?.review?.replyDate !== null && (
              <Flex flexDirection={'column'}>
                <Flex
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Text color={ColorGray700} fontWeight={400} fontSize={'12px'}>
                    {ReviewData?.data?.review?.replyDate !== null
                      ? formatDateDash(ReviewData?.data?.review?.replyDate)
                      : ''}
                  </Text>
                  <Box
                    borderWidth={1}
                    borderColor={ColorInputBorder}
                    px={'20px'}
                    py={'5px'}
                    borderRadius={'6px'}
                    onClick={() => {
                      setOpenAlertModal(true);
                      setModalState({
                        ...ModalState,
                        title: '댓글 삭제',
                        message: '댓글을 삭제하시곘습니까?',
                        type: 'confirm',
                        okButtonName: '확인',
                        cbOk: () => {
                          deleteMutate(reviewId);
                          // onDeleteImg(1);
                          // window.history.back();
                        },
                      });
                    }}
                  >
                    <Text
                      color={ColorGray700}
                      fontWeight={400}
                      fontSize={'12px'}
                    >
                      삭제
                    </Text>
                  </Box>
                </Flex>
                <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
                  {ReviewData?.data?.review?.replyContent}
                </Text>
              </Flex>
            )}
          </Flex>
        </ModalBody>
        <Flex
          // mx={'30px'}
          pb={'40px'}
          pt={'20px'}
          alignItems={'center'}
          justifyContent={'center'}
          // flexDirection={'column'}
          position={'sticky'}
          bottom={0}
          backgroundColor={ColorWhite}
        >
          <CustomButton
            text="닫기"
            px="116px"
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={onClose}
          />
        </Flex>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 0px 30px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 30px;
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }
      &__body {
        /* padding: 10px 20px 20px 20px; */
        /* text-align: center; */
        /* white-space: break-spaces; */
        /* color: #757983; */

        /* font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em; */
      }
      &__footer {
        padding: 0;
        display: flex;
        background-color: '#292A2E';
        /* justify-content: space-between; */
        .button {
          cursor: pointer;

          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: '10px';
          color: #292a2e;
          border: 1px solid '#292A2E';
          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
  /* padding-top: 30px; */
  /* height: 95px; */
`;
export default ReviewModal;
