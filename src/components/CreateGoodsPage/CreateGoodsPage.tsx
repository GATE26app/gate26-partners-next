import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { useStore } from 'zustand';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import goodsApi from '@apis/goods/GoodsApi';
import {
  usePostItemCodeMutation,
  usePutCreateItemMutation,
} from '@apis/goods/GoodsApi.mutation';
import { useGetCategoryQuery } from '@apis/goods/GoodsApi.query';
import {
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsListItemImageProps,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  OptionProps,
  StatusProps,
  optionInputsProps,
} from '@apis/goods/GoodsApi.type';
// import { customModalSliceAction } from '@features/customModal/customModalSlice';
import useCustomBack from '@hooks/useCustomBack';

import BookingCheckComponent from '@components/Goods/_fragments/BookingCheckComponent';
import CancleComponent from '@components/Goods/_fragments/CancleComponent';
import CatagoryComponent from '@components/Goods/_fragments/CatagoryComponent';
import CountryComponent from '@components/Goods/_fragments/CountryComponent';
import DetailComponent from '@components/Goods/_fragments/DetailComponent';
import DivisionComponent from '@components/Goods/_fragments/DivisionComponent';
import EditorDetailComponent from '@components/Goods/_fragments/EditorDetailComponent';
import GoodNameComponent from '@components/Goods/_fragments/GoodNameComponent';
import ImageComponent from '@components/Goods/_fragments/ImageComponent';
import InfoComponent from '@components/Goods/_fragments/InfoComponent';
import OptionComponent from '@components/Goods/_fragments/Option/OptionComponent';
import PlanComponent from '@components/Goods/_fragments/PlanComponent';
import PriceComponent from '@components/Goods/_fragments/PriceComponent';
import StatusComponent from '@components/Goods/_fragments/StatusComponent';
import CustomButton from '@components/common/CustomButton';
import AlertModal from '@components/common/ModalContainer/_fragments/AlertModal';
import ButtonModal from '@components/common/ModalContainer/_fragments/ButtonModal';
import LoadingModal from '@components/common/ModalContainer/_fragments/LoadingModal';

import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';

import OrderLayout from 'layout/GoodsLayout';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}
export type { CategoryListProps, LocationListProps };

function CreateGoodsPage() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  const toast = useToast();
  const [BasicInfo, setBasicInfo] = useState<GoodsBasicProps>({
    itemId: '',
    title: '', //상품 명
    basicInfo: '', //상품 기본정보
    detailInfo: '', //상품 상세설명
    content: '', //상품 상세설명(에디터)
    reservationInfo: '', //상품 예약전 확인사항
    sort: 1, //상품 정렬
    type: Number(router.query.type), //상품 유형
    orderSameDay: 0, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
    orderCloseBefore: 0, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
    level: 1, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
    viewStartDate: '', //노출 시작일시
    viewEndDate: '', //노출 종료일시
    status: 0, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
    forSale: 1, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
    priceNet: 0, //상품 판매금액, 기본할인전
    priceDcPer: 0, //상품 기본할인율
    priceDc: 0, //상품 기본할인금액
    price: 0, //상품 판매금액, 기본할인후
    optionType: Number(router.query.type) == 3 ? 2 : 1, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
    // optionType: router.query.type == '3' || router.query.type == '2' ? 2 : 1, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
    optionInputType: 0, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
    optionInputStartDate: '', //상품 옵션입력 이용일시 생성구간 시작일
    optionInputEndDate: '', //상품 옵션입력 이용일시 생성구간 종료일
    autoConfirm: router.query.type !== '3' ? 1 : 0, //자동예약확정: 활성화 비활성화
  });
  const [attributeList, setAttributeList] = useState<GoodsAttributeListProps[]>(
    [],
  );
  const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]);
  const [locationList, setLocationList] = useState<LocationListProps[]>([]);
  const [optionList, setOptionList] = useState<OptionProps[]>([]);
  const [optionInputList, setOptionInputList] = useState<optionInputsProps[]>([
    {
      sort: 1,
      inputKey: '',
      inputValue: '',
    },
  ]);
  const [imageList, setImageList] = useState<GoodsListItemImageProps[]>([]);
  const [policyList, setPolicyList] = useState<GoodsPoliciesListProps[]>([]);
  const [planList, setPlanList] = useState<GoodsSchedulesListProps[]>([
    {
      sort: 1,
      startDay: '',
      startTime: '',
      durationTime: '',
      location: '',
      info: '',
      lat: 0,
      lng: 0,
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    },
  ]);

  const ToastComponent = (message: string) => {
    return toast({
      position: 'top',
      duration: 2000,
      render: () => (
        <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
          {`${message}`}
        </Box>
      ),
    });
  };

  const { mutate: CreateItemMutate, isLoading } = usePutCreateItemMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: `상품 ${BasicInfo.status == 0 ? '임시저장' : '승인요청'}`,
            message: `상품 ${
              BasicInfo.status == 0 ? '임시저장' : '승인요청'
            } 되었습니다.`,
            type: 'alert',
            okButtonName: '확인',
            cbOk: () => {
              router.back();
              // window.history.back();
            },
          });
          // dispatch(
          //   customModalSliceAction.setMessage({
          //     title: `상품 ${BasicInfo.status == 0 ? '임시저장' : '승인요청'}`,
          //     message: `상품 ${
          //       BasicInfo.status == 0 ? '임시저장' : '승인요청'
          //     } 되었습니다.`,
          //     type: 'alert',
          //     okButtonName: '확인',
          //     cbOk: () => {
          //       router.back();
          //       // setSelectState(type);
          //       // removeAdminInfo(row.userId as string);
          //     },
          //   }),
          // );
          // openCustomModal();
          // router.back();
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {`${res.message}`}
              </Box>
            ),
          });
        }
      },
    },
  });

  useEffect(() => {
    setLoadingModal(isLoading);
  }, [isLoading]);
  const handleOnSave = (status: number) => {
    const PostData = {
      sort: 1,
      status: status,
      title: BasicInfo.title,
      basicInfo: BasicInfo.basicInfo,
      detailInfo: BasicInfo.detailInfo,
      reservationInfo: BasicInfo.reservationInfo,
      content: BasicInfo.content,
      orderSameDay: BasicInfo.orderSameDay,
      orderCloseBefore: BasicInfo.orderCloseBefore,
      type: BasicInfo.type,
      level: BasicInfo.level,
      forSale: BasicInfo.forSale,
      priceNet: BasicInfo.priceNet,
      priceDcPer: BasicInfo.priceDcPer,
      priceDc: BasicInfo.priceDc,
      price: BasicInfo.price,
      optionType: BasicInfo.optionType,
      viewStartDate: BasicInfo.viewStartDate,
      viewEndDate: BasicInfo.viewEndDate,
      attributes: attributeList,
      categories: categoryList,
      locations: locationList,
      optionInputType: BasicInfo.optionInputType,
      optionInputStartDate: BasicInfo.optionInputStartDate,
      optionInputEndDate: BasicInfo.optionInputEndDate,
      images: imageList,
      schedules: planList,
      policies: policyList,
      optionInputs: optionInputList,
      options: optionList,
      autoConfirm: BasicInfo.autoConfirm,
    };

    if (status == 2) {
      if (categoryList.length == 0) {
        ToastComponent('카테고리를 선택해주세요.');
      } else if (
        locationList.length == 0 &&
        (router.query.type == '3' || router.query.type == '2')
      ) {
        ToastComponent('지역을 선택해주세요.');
      } else if (BasicInfo.title == '') {
        ToastComponent('제목을 입력해주세요.');
      } else if (BasicInfo.price == 0) {
        ToastComponent('판매가를 입력해주세요.');
      } else if (imageList.length == 0) {
        ToastComponent('대표 상품 이미지를 선택해주세요.');
      } else if (imageList.length == 1) {
        ToastComponent('상품 이미지를 선택해주세요.');
      } else if (imageList.length == 1) {
        ToastComponent('상품 이미지를 선택해주세요.');
      } else if (policyList.length == 0 && router.query.type == '3') {
        ToastComponent('취소/환불 규정을 입력해주세요.');
      } else if (
        policyList.filter((item) => item.type == 1).length == 0 &&
        router.query.type == '3'
      ) {
        ToastComponent('취소/환불 기본 규정을 입력해주세요.');
      } else if (optionList.length == 0) {
        ToastComponent('옵션을 선택해 입력해주세요.');
      } else if (optionList.length >= 1000) {
        ToastComponent('옵션은 1000개까지 등록 가능합니다.');
      } else {
        CreateItemMutate(PostData);
      }
    } else {
      CreateItemMutate(PostData);
    }
  };
  const handleBack = () => {
    // 커스텀
    // dispatch(
    //   customModalSliceAction.setMessage({
    //     title: '상품 등록',
    //     message: `작성중인 내용을 취소하시겠습니까?`,
    //     type: 'confirm',
    //     okButtonName: '확인',
    //     cbOk: () => {
    //       router.back();
    //     },
    //   }),
    // );
    // openCustomModal();
  };
  // useCustomBack(handleBack);
  // useEffect(() => {
  //   router.beforePopState((state) => {
  //     window.history.pushState(null, '', router.asPath);
  //     handleBack();
  //     // OpenModal().then(({ isConfirmed }) => {
  //     //   if (isConfirmed) {
  //     //     router.beforePopState(() => true);
  //     //     router.back();
  //     //   }
  //     // });

  //     return false;
  //   });
  // }, []);
  // useEffect(() => {
  //   // 페이지 전환시 발생하는 이벤트
  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener('popstate', handleBack);

  //   return () => {
  //     window.removeEventListener('popstate', handleBack);
  //   };
  // }, []);

  return (
    <>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />

      <LoadingModal
        children={isLoadingModal}
        isOpen={isLoadingModal}
        onClose={() => setLoadingModal(false)}
      />
      <Flex
        w={'100%'}
        flexDirection={'column'}
        position={'relative'}
        borderRadius={'16px'}
      >
        <Flex
          justifyContent={'space-between'}
          pt={'60px'}
          pb={'15px'}
          px={'60px'}
          position={'sticky'}
          top={'88.9px'}
          bgColor={ColorWhite}
          zIndex={10}
          borderTopRadius={'10px'}
        >
          <Flex alignItems={'center'}>
            <Image
              src={'/images/Page/ico_goods.png'}
              width={'20px'}
              height={'20px'}
              alt="상품관리"
            />
            <Text
              fontWeight={800}
              fontSize={'22px'}
              color={ColorBlack00}
              pl={'10px'}
            >
              상품등록
            </Text>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <CustomButton
              text="취소"
              borderColor={ColorGray400}
              color={ColorGray700}
              px="44px"
              py="13px"
              bgColor={ColorWhite}
              fontSize="15px"
              onClick={() => {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '상품 등록',
                  message: `작성중인 내용을 취소하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    router.back();
                    // window.history.back();
                  },
                });
              }}
            />
            <CustomButton
              text="승인요청"
              borderColor={ColorRed}
              color={ColorRed}
              px="31px"
              py="13px"
              bgColor={ColorWhite}
              fontSize="15px"
              onClick={() => {
                setBasicInfo({
                  ...BasicInfo,
                  status: 2,
                });
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '상품 등록',
                  message: `상품을 승인요청 하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    handleOnSave(2);
                    // window.history.back();
                  },
                });
                // dispatch(
                //   customModalSliceAction.setMessage({
                //     title: '상품 등록',
                //     message: `상품을 승인요청 하시겠습니까?`,
                //     type: 'confirm',
                //     okButtonName: '확인',
                //     cbOk: () => {
                //       handleOnSave(2);
                //     },
                //   }),
                // );
                // openCustomModal();
              }}
            />
            <CustomButton
              text="임시저장"
              borderColor={ColorRed}
              color={ColorWhite}
              px="31px"
              py="13px"
              bgColor={ColorRed}
              fontSize="15px"
              onClick={() => {
                setBasicInfo({
                  ...BasicInfo,
                  status: 0,
                });
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '상품 등록',
                  message: `상품을 임시저장 하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    handleOnSave(0);
                    // window.history.back();
                  },
                });
                // dispatch(
                //   customModalSliceAction.setMessage({
                //     title: '상품 등록',
                //     message: `상품을 임시저장 하시겠습니까?`,
                //     type: 'confirm',
                //     okButtonName: '확인',
                //     cbOk: () => {
                //       handleOnSave(0);
                //     },
                //   }),
                // );
                // openCustomModal();
              }}
            />
          </Flex>
        </Flex>

        <Box
          px={'60px'}
          pb={'60px'}
          bgColor={ColorWhite}
          borderBottomRadius={'16px'}
        >
          <CatagoryComponent list={categoryList} setList={setCategoryList} />
          {(router.query.type == '3' || router.query.type == '2') && (
            <>
              <CountryComponent list={locationList} setList={setLocationList} />
            </>
          )}
          <GoodNameComponent list={BasicInfo} setList={setBasicInfo} />
          <PriceComponent list={BasicInfo} setList={setBasicInfo} />
          <ImageComponent list={imageList} setList={setImageList} />
          {router.query.type == '3' && (
            <DivisionComponent
              list={attributeList}
              setList={setAttributeList}
            />
          )}
          <InfoComponent list={BasicInfo} setList={setBasicInfo} />
          <DetailComponent list={BasicInfo} setList={setBasicInfo} />
          {router.query.type == '3' && (
            <>
              <PlanComponent list={planList} setList={setPlanList} />
              <BookingCheckComponent list={BasicInfo} setList={setBasicInfo} />
              <CancleComponent list={policyList} setList={setPolicyList} />
            </>
          )}
          <EditorDetailComponent list={BasicInfo} setList={setBasicInfo} />
          <OptionComponent
            list={BasicInfo}
            setList={setBasicInfo}
            optionList={optionList}
            setOptionList={setOptionList}
            optionInputList={optionInputList}
            setOptionInputList={setOptionInputList}
          />
          <StatusComponent list={BasicInfo} setList={setBasicInfo} />
          <Flex justifyContent={'flex-end'}>
            {/* <CustomButton
            text="삭제하기"
            borderColor={ColorGray900}
            bgColor={ColorWhite}
            color={ColorGray900}
            fontSize="15px"
            px="31px"
            py="13px"
          /> */}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

CreateGoodsPage.getLayout = function getLayout(page: ReactElement) {
  return <OrderLayout>{page}</OrderLayout>;
};
export default CreateGoodsPage;