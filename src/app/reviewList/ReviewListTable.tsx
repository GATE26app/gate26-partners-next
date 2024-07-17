import Image from 'next/image';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import {
  ColorBlack,
  ColorDataTableBorderTop,
  ColorGray100,
  ColorGrayBorder,
} from '@/utils/_Palette';
import ReviewCard from './ReviewCard';
import {
  ReviewListItemType,
  ReviewListResType,
} from '@/apis/review/ReviewApi.type';

// import GoodsCard from './GoodsCard';

export const reviewlistheader = [
  {
    id: 'id',
    name: '번호',
    width: '12%',
  },
  {
    id: 'GoodOrderNum',
    name: '상품정보',
    width: '29%',
  },
  {
    id: 'info',
    name: '리뷰',
    width: '26%',
  },
  {
    id: 'payment',
    name: '작성자',
    width: '9%',
  },
  {
    id: 'rest',
    name: '작성일',
    width: '10%',
  },
  {
    id: 'reves',
    name: '답변상태값',
    width: '12%',
  },
  {
    id: 'state',
    name: '답글',
    width: '12%',
  },
];

interface DataTableHeaderProps {
  name: string;
  width: string;
}

export type { DataTableHeaderProps };
interface Props {
  list: ReviewListResType;
}
function ReviewListTable({ list }: Props) {
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
        {reviewlistheader.map((item: DataTableHeaderProps, index: number) => {
          return (
            <Flex
              w={item.width}
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
                textAlign={'center'}
              >
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>

      {list && list?.totalCount !== undefined && list?.totalCount !== 0 ? (
        <>
          {list &&
            list?.reviews.map((item: ReviewListItemType, index: number) => {
              return (
                <ReviewCard
                  key={index}
                  item={item}
                  header={reviewlistheader}
                  index={index}
                  totalCount={list.totalCount}
                  pageNo={list.pageNo}
                />
              );
            })}
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
            조회한 내용이 없습니다.
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default ReviewListTable;
