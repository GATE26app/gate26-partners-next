import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { ColorGrayMenu, ColorRed, ColorWhite } from '@utils/_Palette';

import { useCancelFilterZuInfo } from '_store/CancelStateInfo';
import { useGoodsFilterZuInfo } from '_store/GoodsFilterInfo';
import { useOrderFilterZuInfo } from '_store/OrderFilterInfo';

function MenuBar() {
  const router = useRouter();
  const [menu, setMenu] = useState(1);
  const [orderMenu, setOrdreMenu] = useState(1);
  const { goodsFilterInfo, setGoodsFilterInfo } = useGoodsFilterZuInfo(
    (state) => state,
  );
  const { orderFilterInfo, setOrderFilterInfo } = useOrderFilterZuInfo(
    (state) => state,
  );
  const { cancelFilterInfo, setCancelFilterInfo } = useCancelFilterZuInfo(
    (state) => state,
  );
  useEffect(() => {
    if (
      router.pathname == '/creategoods' ||
      router.pathname == '/goodslist' ||
      router.pathname == '/updateGoods' ||
      router.pathname == '/saveGoods'
    ) {
      setMenu(4);
      // 주문관리 초기화
      setOrdreMenu(1);
    }
    if (router.pathname == '/orderlist' || router.pathname == '/orderdetail') {
      setMenu(2);
      setOrdreMenu(1);
    } else if (
      router.pathname == '/cancellist' ||
      router.pathname == '/canceldetail'
    ) {
      setMenu(2);
      setOrdreMenu(2);
    }
  }, [router]);

  //필터 초기화
  useEffect(() => {
    if (
      router.pathname !== '/creategoods' &&
      router.pathname !== '/goodslist' &&
      router.pathname !== '/updateGoods' &&
      router.pathname !== '/saveGoods'
    ) {
      setGoodsFilterInfo({
        ...goodsFilterInfo,
        pageNo: 0,
        status: null,
        level: 0,
        forSale: 0,
        searchKeyword: '',
        searchType: '',
      });
    }
    if (
      router.pathname !== '/orderlist' &&
      router.pathname !== '/orderdetail'
    ) {
      setOrderFilterInfo({
        ...orderFilterInfo,
        periodEndDate: '',
        periodStartDate: '',
        periodType: '',
        searchKeyword: '',
        searchType: '',
        orderStatus: 0,
        orderType: 0,
        cancelStatus: [],
      });
    }
    if (
      router.pathname !== '/cancellist' &&
      router.pathname !== '/canceldetail'
    ) {
      setCancelFilterInfo({
        ...cancelFilterInfo,
        pageNo: 0,
        orderStatus: 0,
        orderType: 0,
        periodEndDate: '',
        periodStartDate: '',
        periodType: '',
        searchKeyword: '',
        searchType: '',
        cancelStatus: [1, 2, 3],
      });
    }
  }, [router]);

  return (
    <Box
      w={'340px'}
      h={'100%'}
      bgColor={ColorWhite}
      pl={'30px'}
      pt={'35px'}
      position={'sticky'}
      top={'0px'}
    >
      <Flex flexDirection={'row'} alignItems={'center'} mb={'57px'}>
        <Image
          src={'/images/header/icon_logo_big.png'}
          width={185}
          height={41}
          alt="로고"
          priority={true}
        />
        <Box
          bgColor={'rgba(255,223,219,0.38)'}
          borderRadius={'11px'}
          px={'6px'}
          py={'2px'}
          ml={'15px'}
        >
          <Text fontSize={'13px'} fontWeight={600} color={ColorRed}>
            파트너스
          </Text>
        </Box>
      </Flex>
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => setMenu(1)}
      >
        {menu == 1 ? (
          <Image
            src={'/images/Menu/icon_menu_calendar_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/Menu/icon_menu_calendar_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 1 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          예약/주문캘린더
        </Text>
      </Flex> */}
      <Flex
        alignItems={'center'}
        cursor={'pointer'}
        justifyContent={'space-between'}
        justifyItems={'center'}
        mr={'30px'}
        mb={menu == 2 ? '15px' : '30px'}
        onClick={() => setMenu(2)}
      >
        <Flex alignItems={'center'}>
          {menu == 2 ? (
            <Image
              src={'/images/Menu/icon_menu_order_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/Menu/icon_menu_order_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}
          <Text
            color={menu == 2 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            주문관리
          </Text>
        </Flex>
        {menu == 2 ? (
          <Image
            src={'/images/Menu/icon_menu_up.png'}
            width={16}
            height={16}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/Menu/icon_menu_down.png'}
            width={16}
            height={16}
            alt="로고"
          />
        )}
      </Flex>
      {menu == 2 && (
        <Flex mb={'30px'} ml={'57px'} flexDirection={'column'}>
          <Link href={'/orderlist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 1 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => {
                setOrdreMenu(1);
              }}
            >
              주문관리
            </Text>
          </Link>
          <Link href={'/cancellist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 2 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(2)}
            >
              취소관리
            </Text>
          </Link>
        </Flex>
      )}

      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={menu == 3 ? '15px' : '30px'}
        mr={'30px'}
        justifyContent={'space-between'}
        onClick={() => setMenu(3)}
      >
        <Flex alignItems={'center'}>
          {menu == 3 ? (
            <Image
              src={'/images/Menu/icon_menu_calculate_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/Menu/icon_menu_calculate_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}

          <Text
            color={menu == 3 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            정산내역
          </Text>
        </Flex>
        {menu == 3 ? (
          <Image
            src={'/images/Menu/icon_menu_up.png'}
            width={16}
            height={16}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/Menu/icon_menu_down.png'}
            width={16}
            height={16}
            alt="로고"
          />
        )}
      </Flex> */}
      {/* {menu == 3 && (
        <Flex mb={'30px'} ml={'57px'} flexDirection={'column'}>
          <Text
            fontWeight={700}
            fontSize={'16px'}
            mb={'15px'}
            color={menu == 3 ? ColorRed : ColorGrayMenu}
          >
            정산내역
          </Text>
          <Text
            fontWeight={700}
            fontSize={'16px'}
            mb={'15px'}
            color={menu == 3 ? ColorRed : ColorGrayMenu}
          >
            세금계산서
          </Text>
        </Flex>
      )} */}
      <Link href={'/goodslist'}>
        <Flex
          alignItems={'center'}
          cursor={'pointer'}
          mb={'30px'}
          onClick={() => setMenu(4)}
        >
          {menu == 4 ? (
            <Image
              src={'/images/Menu/icon_menu_goods_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/Menu/icon_menu_goods_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}

          <Text
            color={
              menu == 4 || router.pathname == '/creategoods'
                ? ColorRed
                : ColorGrayMenu
            }
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            상품관리
          </Text>
        </Flex>
      </Link>
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => setMenu(5)}
      >
        {menu == 5 ? (
          <Image
            src={'/images/Menu/icon_menu_review_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/Menu/icon_menu_review_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 5 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          리뷰내역
        </Text>
      </Flex> */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => setMenu(6)}
      >
        {menu == 6 ? (
          <Image
            src={'/images/Menu/icon_menu_setting_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/Menu/icon_menu_setting_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 6 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          설정
        </Text>
      </Flex> */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => setMenu(7)}
      >
        {menu == 7 ? (
          <Image
            src={'/images/Menu/icon_menu_chat_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/Menu/icon_menu_chat_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 7 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          채팅
        </Text>
      </Flex> */}
    </Box>
  );
}

export default MenuBar;