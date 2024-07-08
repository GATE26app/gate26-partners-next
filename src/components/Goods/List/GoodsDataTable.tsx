import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  GodsListItemDataListProps,
  GoodsListItemProps,
  GoodsListResponseProps,
} from '@/apis/goods/GoodsApi.type';

import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';

import GoodsCard from './GoodsCard';
import { listheader } from '@/utils/headerData';

interface DataTableHeaderProps {
  name: string;
  width: number;
}
interface ListProps {
  itemCode: string;
  items: GoodsListItemProps[];
}
interface Props {
  data: GoodsListResponseProps;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
export type { DataTableHeaderProps, ListProps };
function GoodsDataTable({ data, setOnSubmit }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDownEvent = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (scrollRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseMoveEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const walk = e.pageX - clickPoint;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  return (
    <Box
      overflowX={'auto'}
      ref={scrollRef}
      onMouseDown={handleMouseDownEvent}
      onMouseLeave={() => setDragging(false)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={handleMouseMoveEvent}
    >
      <Flex
        flexDirection={'row'}
        minW={'1550px'}
        borderTopColor={ColorDataTableBorderTop}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
        borderTopWidth={1}
        mt={'15px'}
        justifyContent={'center'}
      >
        {listheader.map((item: DataTableHeaderProps, index: number) => {
          return (
            <Flex
              w={`${item.width}%`}
              alignItems={'center'}
              justifyContent={'center'}
              h={'64px'}
              key={index}
            >
              <Text
                color={ColorBlack}
                fontSize={'15px'}
                fontWeight={700}
                whiteSpace={'pre-wrap'}
              >
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      {data && data?.totalCount !== undefined && data?.totalCount !== 0 ? (
        <>
          {data &&
            data?.data !== undefined &&
            data?.data.map(
              (itemData: GodsListItemDataListProps, index: number) => {
                return (
                  <GoodsCard
                    key={index}
                    item={itemData}
                    header={listheader}
                    index={index}
                    totalCount={data.totalCount}
                    pageNo={data.pageNo}
                    setOnSubmit={setOnSubmit}
                  />
                );
              },
            )}
        </>
      ) : (
        <Flex
          bgColor={ColorGray100}
          mt={'20px'}
          py={'42px'}
          minW={'1550px'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            width={80}
            height={80}
            src={'/images/Page/no_data.png'}
            alt="데이터 없음"
          />
          <Text fontSize={'14px'} fontWeight={'400'} color={ColorBlack}>
            상품이 없습니다.
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default GoodsDataTable;
