'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import { usePutCreateItemMutation } from '@/apis/goods/GoodsApi.mutation';
import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsListItemImageProps,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  LocationResProps,
  OptionProps,
  optionInputsProps,
} from '@/apis/goods/GoodsApi.type';
import { customModalSliceAction } from '@/features/customModal/customModalSlice';

import {
  ColorBlack00,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import ButtonModal from '@/components/common/ModalContainer/_fragments/ButtonModal';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import CustomButton from '@/components/common/CustomButton';
import CatagoryComponent from '@/components/Goods/CatagoryComponent';
import CountryComponent from '@/components/Goods/CountryComponent';
import GoodNameComponent from '@/components/Goods/GoodNameComponent';
import PriceComponent from '@/components/Goods/PriceComponent';
import ImageComponent from '@/components/Goods/ImageComponent';
import DivisionComponent from '@/components/Goods/DivisionComponent';
import InfoComponent from '@/components/Goods/InfoComponent';
import DetailComponent from '@/components/Goods/DetailComponent';
import PlanComponent from '@/components/Goods/PlanComponent';
import BookingCheckComponent from '@/components/Goods/BookingCheckComponent';
import CancelComponent from '@/components/Goods/CancelComponent';
import EditorDetailComponent from '@/components/Goods/EditorDetailComponent';
import StatusComponent from '@/components/Goods/StatusComponent';
import OptionComponent from '@/components/Goods/Option/OptionComponent';
import ShippingComponent from '../ShippingComponent';
import { usePartnerZuInfo } from '@/_store/PartnerInfo';
import PreviewDrawerComponent from '../Preview/PreviewDrawerComponent';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}
export type { CategoryListProps, LocationListProps };

function CreateGoodsComponentPage() {
  const dispatch = useDispatch();

  const { partnerInfo } = usePartnerZuInfo((state) => state);
  const router = useRouter();
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [disableBtn, setDiableBtn] = useState(false); //버튼 중복 막기
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => { },
    cbCancel: () => { },
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
    type: Number(getType), //상품 유형
    orderSameDay: 0, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
    level: 1, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
    viewStartDate: '', //노출 시작일시
    viewEndDate: '', //노출 종료일시
    status: 0, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
    forSale: 1, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
    priceNet: 0, //상품 판매금액, 기본할인전
    priceDcPer: 0, //상품 기본할인율
    priceDc: 0, //상품 기본할인금액
    price: 0, //상품 판매금액, 기본할인후
    optionType: Number(getType) == 3 ? 2 : 1, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
    // optionType: router.query.type == '3' || router.query.type == '2' ? 2 : 1, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
    optionInputType: 0, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
    optionInputStartDate: '', //상품 옵션입력 이용일시 생성구간 시작일
    optionInputEndDate: '', //상품 옵션입력 이용일시 생성구간 종료일
    autoConfirm: getType !== '3' ? 1 : 0, //자동예약확정: 활성화 비활성화
    requiredPartnerCancelConfirm: 0, //0=>미해당, 1=>해당
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
  const [CateGetList, setCateGetList] = useState<CategoryResProps[]>([]);
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
      lat: '',
      lng: '',
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    },
  ]);
  const [locationPreList, setLocationPreList] = useState<LocationResProps[]>(
    [],
  );
  const [CatePreList, setCatePreList] = useState<CategoryResProps[]>([]);

  useEffect(() => {
    const preventGoBack = () => {
      if (confirm('페이지를 나가시겠습니까?')) {
        history.go(-1);
      } else {
        history.pushState(null, '', location.href);
      }
    };
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

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
        setDiableBtn(false);
        if (res.success == true) {
          setOpenAlertModal(true);
          setModalState({
            ...ModalState,
            title: `상품 ${BasicInfo.status == 0 ? '임시저장' : '승인요청'}`,
            message: `상품 ${BasicInfo.status == 0 ? '임시저장' : '승인요청'
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
    setDiableBtn(true);
    const PostData = {
      sort: 1,
      status: status,
      title: BasicInfo.title,
      basicInfo: BasicInfo.basicInfo,
      detailInfo: BasicInfo.detailInfo,
      reservationInfo: BasicInfo.reservationInfo,
      content: BasicInfo.content,
      orderSameDay: BasicInfo.orderSameDay,
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
      requiredPartnerCancelConfirm: BasicInfo.requiredPartnerCancelConfirm,
    };

    if (status == 2) {
      if (partnerInfo.shippingType == 0) {
        ToastComponent('배송비 정책을 확인해주세요.');
      } else if (categoryList.length == 0) {
        ToastComponent('카테고리를 선택해주세요.');
        setDiableBtn(false);
      } else if (
        locationList.length == 0 &&
        (getType == '3' || getType == '2')
      ) {
        setDiableBtn(false);
        ToastComponent('지역을 선택해주세요.');
      } else if (BasicInfo.title == '') {
        setDiableBtn(false);
        ToastComponent('제목을 입력해주세요.');
      } else if (BasicInfo.price == 0) {
        setDiableBtn(false);
        ToastComponent('판매가를 입력해주세요.');
      } else if (
        imageList.length == 0 ||
        (imageList.length > 0 && imageList[0].sort > 1)
      ) {
        setDiableBtn(false);
        ToastComponent('대표 상품 이미지를 선택해주세요.');
      } else if (imageList.length == 1) {
        setDiableBtn(false);
        ToastComponent('상품 이미지를 선택해주세요.');
      } else if (imageList.length == 1) {
        setDiableBtn(false);
        ToastComponent('상품 이미지를 선택해주세요.');
      } else if (policyList.length == 0 && getType == '3') {
        setDiableBtn(false);
        ToastComponent('취소/환불 규정을 입력해주세요.');
      } else if (
        policyList.filter((item) => item.type == 1).length == 0 &&
        getType == '3'
      ) {
        setDiableBtn(false);
        ToastComponent('취소/환불 기본 규정을 입력해주세요.');
      } else if (optionList.length == 0) {
        setDiableBtn(false);
        ToastComponent('옵션을 선택해 입력해주세요.');
      } else if (optionList.length >= 10000) {
        setDiableBtn(false);
        ToastComponent('옵션은 10000개까지 등록 가능합니다.');
      } else {
        CreateItemMutate(PostData);
      }
    } else {
      if (partnerInfo.shippingType == 0) {
        ToastComponent('배송비 정책을 확인해주세요.');
      } else {
        CreateItemMutate(PostData);
      }
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

  const previewData = {
    type: getType,
    title: BasicInfo.title,
    basicInfo: BasicInfo.basicInfo,
    detailInfo: BasicInfo.detailInfo,
    reservationInfo: BasicInfo.reservationInfo,
    content: BasicInfo.content,
    orderSameDay: BasicInfo.orderSameDay,
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
    categories: CatePreList,
    locations: locationPreList,
    optionInputType: BasicInfo.optionInputType,
    optionInputStartDate: BasicInfo.optionInputStartDate,
    optionInputEndDate: BasicInfo.optionInputEndDate,
    images: imageList,
    schedules: planList,
    policies: policyList,
    optionInputs: optionInputList,
    options: optionList,
    autoConfirm: BasicInfo.autoConfirm,
    requiredPartnerCancelConfirm: BasicInfo.requiredPartnerCancelConfirm,
  };

  return (
    <>
      <PreviewDrawerComponent
        data={previewData}
        isOpen={isPreviewModal}
        onClose={() => setIsPreviewModal(false)}
      />
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
              text="미리보기"
              borderColor={ColorGray400}
              color={ColorGray700}
              px="44px"
              py="13px"
              bgColor={ColorWhite}
              fontSize="15px"
              onClick={() => {
                setIsPreviewModal(true);
              }}
            />
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
              disabled={disableBtn}
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
              disabled={disableBtn}
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
                    setDiableBtn(true);
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
          <CatagoryComponent
            list={categoryList}
            setList={setCategoryList}
            getList={CateGetList}
            setGetList={setCateGetList}
            CatePreList={CatePreList}
            setCatePreList={setCatePreList}
          />
          {(getType == '3' || getType == '2') && (
            <>
              <CountryComponent
                list={locationList}
                setList={setLocationList}
                locationPreList={locationPreList}
                setLocationPreList={setLocationPreList}
              />
            </>
          )}
          <GoodNameComponent list={BasicInfo} setList={setBasicInfo} />
          <PriceComponent list={BasicInfo} setList={setBasicInfo} />
          {getType == '1' && <ShippingComponent />}
          <ImageComponent list={imageList} setList={setImageList} />
          {getType == '3' && (
            <DivisionComponent
              list={attributeList}
              setList={setAttributeList}
            />
          )}
          <InfoComponent list={BasicInfo} setList={setBasicInfo} />
          <DetailComponent list={BasicInfo} setList={setBasicInfo} />
          {getType == '3' && (
            <>
              <PlanComponent list={planList} setList={setPlanList} />
              <BookingCheckComponent list={BasicInfo} setList={setBasicInfo} />
            </>
          )}
          <CancelComponent
            list={policyList}
            setList={setPolicyList}
            type={getType}
            BasicInfo={BasicInfo}
            setBasicInfo={setBasicInfo}
          />
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

export default CreateGoodsComponentPage;
