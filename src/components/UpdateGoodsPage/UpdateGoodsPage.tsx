import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import goodsApi from '@apis/goods/GoodsApi';
import {
  useLogItemutation,
  usePatchGoodsStatusMutation,
  usePatchOptionModifyMutation,
  usePatchUpdateGoodsStatusMutation,
} from '@apis/goods/GoodsApi.mutation';
import { useGetItemLogQuery } from '@apis/goods/GoodsApi.query';
import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsItemProps,
  GoodsListItemImageProps,
  GoodsOptionStockModifyType,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  LocationResProps,
  OptionItemProps,
  PatchGoodsStatusParmaType,
  PatchOptionStockType,
  PatchUpdateGoodsStatusParmaType,
  StatusProps,
  optionInputsProps,
} from '@apis/goods/GoodsApi.type';

// import { customModalSliceAction } from '@features/customModal/customModalSlice';
import OptionComponent from '@components/Goods/_fragments/Option/OptionComponent';
import { Option } from '@components/Goods/_fragments/Option/OptionPlus';
import StatusComponent from '@components/Goods/_fragments/StatusComponent';
import CustomButton from '@components/common/CustomButton';
import LogSelectBox from '@components/common/LogSelectBox';
import AlertModal from '@components/common/ModalContainer/_fragments/AlertModal';
import LoadingModal from '@components/common/ModalContainer/_fragments/LoadingModal';
import SelectBox from '@components/common/SelectBox';

import {
  ColorBlack,
  ColorBlack00,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@utils/_Palette';
import { DashDate } from '@utils/format';

import GoodsModify from './_fragments/GoodsModify';
import ModifyOptionComponent from './_fragments/ModifyOptionComponent';

import { useGoodsStateZuInfo } from '_store/StateZuInfo';
import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import GoodsLayout from 'layout/GoodsLayout';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}

function UpdateGoodsPage() {
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
  const router = useRouter();
  const toast = useToast();
  const { goodsInfo, setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [selectMenu, setSelectMenu] = useState(1);
  const [select, setSelect] = useState(''); //로그 상세 선택
  // const selectlist = ['2024.05.07'];
  const [logList, setLogList] = useState([]);
  const [optionList, setOptionList] = useState<OptionItemProps[]>([]);
  const [CateGetList, setCateGetList] = useState<CategoryResProps[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]); //수정시 전달한 리스트
  const [locationGetList, setLocationGetList] = useState<LocationResProps[]>(
    [],
  );
  const [goodsItemList, setGoodsItemList] = useState<GoodsItemProps[]>([]);
  const [locationList, setLocationList] = useState<LocationListProps[]>([]); //수정시 전달한 리스트
  const [statusList, setStatusList] = useState<StatusProps>({
    forSale: 0,
    level: 0,
    viewStartDate: '',
    viewEndDate: '',
  });
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    type: '',
    title: '',
    okButtonName: '',
    message: '',
    cbOk: () => {},
    cbCancel: () => {},
  });

  const [attributeList, setAttributeList] = useState<GoodsAttributeListProps[]>(
    [],
  );
  // const [optionList, setOptionList] = useState<OptionProps[]>([]);
  const [optionInputList, setOptionInputList] = useState<optionInputsProps[]>(
    [],
  );
  const [BasicInfo, setBasicInfo] = useState<GoodsBasicProps>({
    itemId: '',
    title: '', //상품 명
    basicInfo: '', //상품 기본정보
    detailInfo: '', //상품 상세설명
    content: '', //상품 상세설명(에디터)
    reservationInfo: '', //상품 예약전 확인사항
    sort: 1, //상품 정렬
    type: Number(router.query.type), //상품 유형 (미사용)
    orderSameDay: 0, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
    orderCloseBefore: 0, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
    level: 1, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
    viewStartDate: '', //노출 시작일시
    viewEndDate: '', //노출 종료일시
    status: 2, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
    forSale: 1, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
    priceNet: 0, //상품 판매금액, 기본할인전
    priceDcPer: 0, //상품 기본할인율
    priceDc: 0, //상품 기본할인금액
    price: 0, //상품 판매금액, 기본할인후
    optionType: 1, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
    optionInputType: 0, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
    optionInputStartDate: '', //상품 옵션입력 이용일시 생성구간 시작일
    optionInputEndDate: '', //상품 옵션입력 이용일시 생성구간 종료일,
    autoConfirm: 0, //자동예약확정: 활성화 비활성화
  });
  const [isLoadingModal, setLoadingModal] = useState(false);
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
      lng: 0,
      lat: 0,
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    },
  ]);
  const [optionModifyList, setOptionModifyList] = useState<
    GoodsOptionStockModifyType[]
  >([]);
  const itemCode = router.query.itemcode as string;
  const [logDisable, setLogDisable] = useState(false);

  //상품상세
  const { data: detailData } = useQuery(
    ['GET_GOODSDETAIL', itemCode],
    () => goodsApi.getGoodsDetail(itemCode),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!itemCode,
      onSuccess: ({ data }) => {},
    },
  );

  useEffect(() => {
    if (detailData?.success == true) {
      setLogDisable(false);
      setOptionList(detailData.data.options);
      setStatusList({
        forSale: detailData.data.forSale,
        level: detailData.data.level,
        viewStartDate: detailData.data.viewStartDate,
        viewEndDate: detailData.data.viewEndDate,
      });
      setCateGetList(detailData.data.categories);
      setLocationGetList(detailData.data.locations);
      setGoodsItemList(detailData.data);
      setAttributeList(detailData.data.attributes);
      setBasicInfo({
        itemId: detailData.data.itemId,
        title: detailData.data.title, //상품 명
        basicInfo: detailData.data.basicInfo, //상품 기본정보
        detailInfo: detailData.data.detailInfo, //상품 상세설명
        content: detailData.data.content, //상품 상세설명(에디터)
        reservationInfo: detailData.data.reservationInfo, //상품 예약전 확인사항
        sort: detailData.data.sort, //상품 정렬
        type: detailData.data.type, //상품 유형 (미사용)
        orderSameDay: detailData.data.orderSameDay, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
        orderCloseBefore: detailData.data.orderCloseBefore, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
        level: detailData.data.level, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
        viewStartDate: detailData.data.viewStartDate, //노출 시작일시
        viewEndDate: detailData.data.viewEndDate, //노출 종료일시
        status: detailData.data.status, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
        forSale: detailData.data.forSale, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
        priceNet: detailData.data.priceNet, //상품 판매금액, 기본할인전
        priceDcPer: detailData.data.priceDcPer, //상품 기본할인율
        priceDc: detailData.data.priceDc, //상품 기본할인금액
        price: detailData.data.price, //상품 판매금액, 기본할인후
        optionType: detailData.data.optionType, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
        optionInputType: detailData.data.optionInputType, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
        optionInputStartDate: detailData.data.optionInputStartDate, //상품 옵션입력 이용일시 생성구간 시작일
        optionInputEndDate: detailData.data.optionInputEndDate, //상품 옵션입력 이용일시 생성구간 종료일
        autoConfirm: detailData.data.autoConfirm,
      });
      setPlanList(detailData.data.schedules);
      setPolicyList(detailData.data.policies);
      setOptionInputList(detailData.data.optionInputs);
      setImageList(detailData.data.images);
    }
  }, [detailData]);

  useEffect(() => {
    if (
      goodsInfo.LogItemDisable == true &&
      detailData?.data?.itemId == BasicInfo.itemId
    ) {
      setGoodsInfo({
        LogItemDisable: false,
      });
    }
  }, [BasicInfo]);
  //상품 수정[버전변경]
  const { mutate: PatchUpdateGoodsMutate, isLoading } =
    usePatchUpdateGoodsStatusMutation({
      options: {
        onSuccess: (res) => {
          if (res.success == true) {
            router.back();
          } else {
            toast({
              position: 'top',
              duration: 3000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //노출여부, 노출기간, 판매여부
  const { mutate: PatchStstusMutate } = usePatchGoodsStatusMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          router.back();
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

  //수정
  const { mutate: optionModifyMutate } = usePatchOptionModifyMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          router.back();
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

  //로그목록
  const { data: LogListData, error } = useQuery(
    ['goodsLogList', itemCode],
    () => goodsApi.getGoodsLogList(itemCode),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!itemCode,
    },
  );

  //로그 상세
  const { mutate: LogItemMutate } = useLogItemutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          // setLogDisable(true);
          setGoodsInfo({
            LogItemDisable: true,
          });
          setOptionList(res.data.options);
          setStatusList({
            forSale: res.data.forSale,
            level: res.data.level,
            viewStartDate: res.data.viewStartDate,
            viewEndDate: res.data.viewEndDate,
          });
          setCateGetList(res.data.categories);
          setLocationGetList(res.data.locations);
          setGoodsItemList(res.data);
          setAttributeList(res.data.attributes);
          setBasicInfo({
            itemId: res.data.itemId,
            title: res.data.title, //상품 명
            basicInfo: res.data.basicInfo, //상품 기본정보
            detailInfo: res.data.detailInfo, //상품 상세설명
            content: res.data.content, //상품 상세설명(에디터)
            reservationInfo: res.data.reservationInfo, //상품 예약전 확인사항
            sort: res.data.sort, //상품 정렬
            type: res.data.type, //상품 유형 (미사용)
            orderSameDay: res.data.orderSameDay, //상품 이용일시 당일판매, 0=>가능, 1=>불가능
            orderCloseBefore: res.data.orderCloseBefore, //상품 판매마감처리, 0=>해당없음, N시간전 판매마감
            level: res.data.level, //상품 레벨, 1=>노출, 2=>미노출, 10=>삭제
            viewStartDate: res.data.viewStartDate, //노출 시작일시
            viewEndDate: res.data.viewEndDate, //노출 종료일시
            status: res.data.status, //상품 상태, 0=>임시저장, 2=>저장(승인요청, 승인대기)
            forSale: res.data.forSale, //판매 상태, 1=>판매중, 2=>판매안함, 10=>품절
            priceNet: res.data.priceNet, //상품 판매금액, 기본할인전
            priceDcPer: res.data.priceDcPer, //상품 기본할인율
            priceDc: res.data.priceDc, //상품 기본할인금액
            price: res.data.price, //상품 판매금액, 기본할인후
            optionType: res.data.optionType, //상품 옵션유형, 1=>일반형, 2=>날짜지정형
            optionInputType: res.data.optionInputType, //상품 옵션입력 유형, 0=>단독형, 1=>조합형
            optionInputStartDate: res.data.optionInputStartDate, //상품 옵션입력 이용일시 생성구간 시작일
            optionInputEndDate: res.data.optionInputEndDate, //상품 옵션입력 이용일시 생성구간 종료일
            autoConfirm: res.data.autoConfirm,
          });
          setPlanList(res.data.schedules);
          setPolicyList(res.data.policies);
          setOptionInputList(res.data.optionInputs);
          setImageList(res.data.images);
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
    if (LogListData?.success) {
      setLogList(LogListData.data);
    }
  }, [LogListData]);

  const onSubmit = (selectMenu: number, status?: number) => {
    if (selectMenu == 1) {
      const body: PatchUpdateGoodsStatusParmaType = {
        itemCode: itemCode,
        itemId: detailData?.data.itemId,
        data: {
          sort: BasicInfo.sort,
          status: BasicInfo.status,
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
        },
      };

      PatchUpdateGoodsMutate(body);
    } else if (selectMenu == 2) {
      const body: PatchGoodsStatusParmaType = {
        itemCode: itemCode,
        itemId: detailData?.data.itemId,
        data: {
          autoConfirm: BasicInfo.autoConfirm,
          orderSameDay: BasicInfo.orderSameDay,
          level: BasicInfo.level,
          forSale: BasicInfo.forSale,
          viewStartDate: BasicInfo.viewStartDate,
          viewEndDate: BasicInfo.viewEndDate,
        },
      };
      PatchStstusMutate(body);
    } else if (selectMenu == 3) {
      const body: PatchOptionStockType = {
        itemCode: itemCode,
        itemId: detailData?.data.itemId,
        data: { options: optionModifyList },
      };
      optionModifyMutate(body);
    }
  };
  useEffect(() => {
    setLoadingModal(isLoading);
  }, [isLoading]);
  return (
    <>
      <LoadingModal
        children={isLoadingModal}
        isOpen={isLoadingModal}
        onClose={() => setLoadingModal(false)}
      />
      <AlertModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      {detailData?.success == true ? (
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
            top={'95px'}
            bgColor={ColorWhite}
            zIndex={10}
            borderTopRadius={'10px'}
            flexDirection={'column'}
          >
            <Flex alignItems={'center'} justifyContent={'space-between'}>
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
                  pr={'15px'}
                >
                  상품수정
                </Text>
                <Text color={ColorGray700} fontSize={'15px'} fontWeight={400}>
                  상품코드
                </Text>
                <Text
                  color={ColorBlack}
                  fontSize={'15px'}
                  fontWeight={700}
                  pl={'10px'}
                >
                  {detailData?.data.itemCode}
                </Text>
              </Flex>
              <Flex flexDirection={'row'} alignItems={'center'} gap={'10px'}>
                {selectMenu == 1 && (
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
                        title: '상품 수정',
                        message: `작성중인 내용을 취소하시겠습니까?`,
                        type: 'confirm',
                        okButtonName: '확인',
                        cbOk: () => {
                          router.back();
                          // window.history.back();
                        },
                      });
                      // dispatch(
                      //   customModalSliceAction.setMessage({
                      //     title: '상품 수정',
                      //     message: `작성중인 내용을 취소하시겠습니까?`,
                      //     type: 'confirm',
                      //     okButtonName: '확인',
                      //     cbOk: () => {
                      //       router.back();
                      //       // window.history.back();
                      //     },
                      //   }),
                      // );
                      // openCustomModal();
                    }}
                  />
                )}

                <CustomButton
                  text={selectMenu == 1 ? '저장' : '업데이트'}
                  borderColor={ColorRed}
                  color={ColorWhite}
                  px={selectMenu == 1 ? '44px' : '31.5px'}
                  py="13px"
                  bgColor={ColorRed}
                  fontSize="15px"
                  onClick={() => {
                    setOpenAlertModal(true);
                    setModalState({
                      ...ModalState,
                      title: '상품 수정',
                      message: `상품을 ${
                        selectMenu == 1 ? '저장' : '업데이트'
                      }하시겠습니까?`,
                      type: 'confirm',
                      okButtonName: '확인',
                      cbOk: () => {
                        onSubmit(selectMenu);
                        // window.history.back();
                      },
                    });
                    // dispatch(
                    //   customModalSliceAction.setMessage({
                    //     title: '상품 수정',
                    //     message: `상품을 ${
                    //       selectMenu == 1 ? '저장' : '업데이트'
                    //     }하시겠습니까?`,
                    //     type: 'confirm',
                    //     okButtonName: '확인',
                    //     cbOk: () => {
                    //       onSubmit(selectMenu);
                    //       // window.history.back();
                    //     },
                    //   }),
                    // );
                    // openCustomModal();
                  }}
                />
              </Flex>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Flex
                borderRadius={'12px'}
                py={'10px'}
                px={'11px'}
                bgColor={ColorGray50}
              >
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={selectMenu == 1 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setSelectMenu(1)}
                  cursor={'pointer'}
                >
                  <Text
                    color={selectMenu == 1 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    상품수정
                  </Text>
                </Flex>
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={selectMenu == 2 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setSelectMenu(2)}
                  cursor={'pointer'}
                >
                  <Text
                    color={selectMenu == 2 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    판매상태변경
                  </Text>
                </Flex>
                {/* {BasicInfo.type == 3 && ( */}
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={selectMenu == 3 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setSelectMenu(3)}
                  cursor={'pointer'}
                >
                  <Text
                    color={selectMenu == 3 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    재고수정
                  </Text>
                </Flex>
                {/* )} */}
              </Flex>
              {selectMenu == 1 && (
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  // mt={'27px'}
                >
                  <Flex>
                    <LogSelectBox
                      width="337px"
                      select={select}
                      setSelect={setSelect}
                      list={logList}
                      placeholder="로그목록"
                      onClick={(e) => {
                        const obj = {
                          itemCode: itemCode,
                          itemId: e,
                        };
                        LogItemMutate(obj);
                      }}
                    />
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Box
            px={'60px'}
            pb={'60px'}
            bgColor={ColorWhite}
            borderBottomRadius={'16px'}
          >
            {selectMenu == 1 && (
              <Flex
                flexDirection={'row'}
                mb={'15px'}
                justifyContent={'flex-end'}
              >
                <Text
                  fontSize={'13px'}
                  fontWeight={600}
                  color={ColorGray700}
                  mr={'10px'}
                >
                  승인요청일시
                </Text>
                <Text
                  fontSize={'13px'}
                  fontWeight={600}
                  color={ColorBlack}
                  mr={'20px'}
                >
                  {DashDate(detailData?.data.approvalDate)}
                </Text>
                {detailData?.data.deniedDate !== null && (
                  <>
                    <Text
                      fontSize={'13px'}
                      fontWeight={600}
                      color={ColorGray700}
                      mr={'10px'}
                    >
                      반려일시
                    </Text>
                    <Text
                      fontSize={'13px'}
                      fontWeight={600}
                      color={ColorBlack}
                      mr={'10px'}
                    >
                      {DashDate(detailData?.data.deniedDate)}
                    </Text>
                    <Text fontSize={'13px'} fontWeight={600} color={ColorBlack}>
                      ({detailData?.data.deniedReason})
                    </Text>
                  </>
                )}
              </Flex>
            )}
            {selectMenu == 1 && (
              <GoodsModify
                // watch={watch}
                CateGetList={CateGetList}
                setCateGetList={setCateGetList}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                locationList={locationList}
                setLocationList={setLocationList}
                BasicInfo={BasicInfo}
                setBasicInfo={setBasicInfo}
                imageList={imageList}
                setImageList={setImageList}
                attributeList={attributeList}
                setAttributeList={setAttributeList}
                planList={planList}
                setPlanList={setPlanList}
                policyList={policyList}
                setPolicyList={setPolicyList}
                locationGetList={locationGetList}
                setLocationGetList={setLocationGetList}
                optionList={optionList}
                setOptionList={setOptionList}
                optionInputList={optionInputList}
                setOptionInputList={setOptionInputList}
                // goodsItemList={goodsItemList}
                // setGoodsItemList={setGoodsItemList}
              />
            )}
            {selectMenu == 2 && (
              <StatusComponent list={BasicInfo} setList={setBasicInfo} />
            )}
            {selectMenu == 3 && (
              <ModifyOptionComponent
                list={BasicInfo}
                optionList={optionList}
                setOptionList={setOptionList}
                optionModifyList={optionModifyList}
                setOptionModifyList={setOptionModifyList}
              />
            )}
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
}

UpdateGoodsPage.getLayout = function getLayout(page: ReactElement) {
  return <GoodsLayout>{page}</GoodsLayout>;
};
export default UpdateGoodsPage;

// export async function getServerSideProps({ query: { itemcode } }) {
//   return {
//     props: {
//       itemcode,
//     },
//   };
// }