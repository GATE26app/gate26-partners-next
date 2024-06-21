import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import { useGoodsDeleteMutation } from '@apis/goods/GoodsApi.mutation';
import {
  GodsListItemDataListProps,
  GoodsListItemProps,
} from '@apis/goods/GoodsApi.type';
import { customModalSliceAction } from '@features/customModal/customModalSlice';

import CustomButton from '@components/common/CustomButton';

import {
  ColorBlack,
  ColorBlue,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';

import { DataTableHeaderProps, ListProps } from './GoodsDataTable';
import GoodsItemCard from './GoodsItemCard';

import { useGoodsStateZuInfo } from '_store/StateZuInfo';
import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface Props {
  header: Array<DataTableHeaderProps>;
  item: GodsListItemDataListProps;
  index: number;
  pageNo: number;
  totalCount: number;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
function GoodsCard({
  header,
  item,
  index,
  pageNo,
  totalCount,
  setOnSubmit,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const { openCustomModal } = useCustomModalHandlerContext();
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const { mutate: deleteMutate } = useGoodsDeleteMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setGoodsInfo({
            goodState: true,
          });
        } else {
          toast({
            position: 'top',
            duration: 3000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'삭제가 되지 않았습니다.'}
              </Box>
            ),
          });
        }
      },
    },
  });
  const handleDelete = (itemCode: string, itemId: string) => {
    const body = {
      itemCode: itemCode,
      itemId: itemId,
    };
    dispatch(
      customModalSliceAction.setMessage({
        title: '상품 삭제',
        message: `삭제하시겠습니까?`,
        type: 'confirm',
        okButtonName: '삭제',
        cbOk: () => {
          deleteMutate(body);

          // setOnSubmit(true);
          // setSelectState(type);
          // removeAdminInfo(row.userId as string);
        },
      }),
    );
    openCustomModal();

    // deleteMutate(body);
  };
  return (
    <Flex
      minW={'1550px'}
      flexDirection={'row'}
      justifyContent={'center'}
      py={'20px'}
      borderBottomColor={ColorGrayBorder}
      borderBottomWidth={1}
    >
      <Flex
        w={`${header[0]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {/* {item.itemCode} */}
          {totalCount - (pageNo - 1) * 10 - index}
        </Text>
      </Flex>
      <Flex
        w={`${header[1]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'5px'}
      >
        <CustomButton
          text="관리"
          px="26px"
          py="7.5px"
          fontSize="15px"
          color={ColorGray700}
          borderColor={ColorGray400}
          bgColor={ColorWhite}
          onClick={() =>
            item.items[0].status == 0
              ? router.push({
                  pathname: '/saveGoods',
                  query: {
                    type: item?.items[0].type,
                    itemCode: item?.items[0].itemCode,
                  },
                })
              : router.push({
                  pathname: '/updateGoods',
                  query: {
                    itemcode: item.itemCode,
                    type: item?.items[0].type,
                  },
                })
          }
        />
        <CustomButton
          text="삭제"
          px="26px"
          py="7.5px"
          fontSize="15px"
          color={ColorGray700}
          borderColor={ColorGray400}
          bgColor={ColorWhite}
          onClick={() => handleDelete(item.itemCode, item.items[0].itemId)}
        />
      </Flex>
      <Flex
        w={`${header[2]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.itemCode}
        </Text>
      </Flex>
      <Flex flexDirection={'column'} w={'80%'}>
        {item?.items.map((data, index) => {
          return (
            <Flex
              flexDirection={'row'}
              key={index}
              borderBottomColor={ColorGrayBorder}
              pb={
                item?.items.length > 1 && item?.items.length - 1 !== index
                  ? '20px'
                  : 0
              }
              pt={
                item?.items.length > 1 && item?.items.length - 1 == index
                  ? '20px'
                  : 0
              }
              borderBottomWidth={
                item?.items.length > 1 && item?.items.length - 1 !== index
                  ? 1
                  : 0
              }
            >
              <GoodsItemCard header={header} item={data} />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default GoodsCard;
