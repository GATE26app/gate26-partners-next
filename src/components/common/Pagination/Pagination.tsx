import React from 'react';

import { Flex } from '@chakra-ui/react';

import ArrowLeftIcon from '@icons/System/ArrowLeft2';
import ArrowRightIcon from '@icons/System/ArrowRight2';

import styled from '@emotion/styled';

import { PaginationProps } from './Pagination.type';

function Pagination({
  currentPage,
  limit,
  total,
  pageRangeDisplayed = 5,
  onPageNumberClicked,
  onPreviousPageClicked,
  onNextPageClicked,
}: PaginationProps) {
  const handlePreviousClicked = (page: number) => {
    if (page < 0) return;
    onPreviousPageClicked(page);
  };
  const handleNextsClicked = (page: number) => {
    const pagesLength = Math.ceil(total / limit);
    if (pagesLength <= page) return;
    onNextPageClicked(page);
  };
  const renderNumbers = () => {
    const pagesLength = Math.ceil(total / limit);

    let start;
    let end;
    const ceiling = Math.ceil(pageRangeDisplayed / 2);
    const floor = Math.floor(pageRangeDisplayed / 2);

    if (pagesLength < pageRangeDisplayed) {
      start = 0;
      end = pagesLength;
    } else if (currentPage >= 0 && currentPage <= ceiling) {
      start = 0;
      end = pageRangeDisplayed;
    } else if (currentPage + floor >= pagesLength) {
      start = pagesLength - pageRangeDisplayed;
      end = pagesLength;
    } else {
      start = currentPage - ceiling;
      end = currentPage + floor;
    }
    const pageNumbers = [];
    for (let i = start; i < end; i++) {
      const number = (
        <div
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          key={i}
          // isCurrentPage={currentPage === i}
          onClick={() => onPageNumberClicked(i)}
        >
          {i + 1}
        </div>
      );

      pageNumbers.push(number);
    }
    return pageNumbers;
  };

  return (
    <PageContainer alignItems="center" justifyContent="center">
      <Flex
        className="page-button left"
        alignItems="center"
        justifyContent="center"
        onClick={() => handlePreviousClicked(currentPage - 1)}
      >
        <ArrowLeftIcon maxH="24px" maxW="24px" width="2em" height="2em" />
      </Flex>
      <Flex gap="20px" className="page-items">
        {renderNumbers()}
      </Flex>
      <Flex
        className="page-button right"
        alignItems="center"
        justifyContent="center"
        onClick={() => handleNextsClicked(currentPage + 1)}
      >
        <ArrowRightIcon maxH="24px" maxW="24px" width="2em" height="2em" />
      </Flex>
    </PageContainer>
  );
}

const PageContainer = styled(Flex)`
  width: 100%;
  padding: 21.5px 0;
  .page-item {
    width: 8px;
    height: 27px;
    font-size: 15px;
    line-height: 27px;
    letter-spacing: -0.02em;
    border-radius: 5px;
    color: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 400;
    gap: 10px;
    &.active {
      font-weight: 700;
      color: #ff5942;
    }
  }
  .page-button {
    width: 24px;
    height: 24px;
    cursor: pointer;
    &.left {
      margin-right: 20px;
    }
    &.right {
      margin-left: 20px;
    }
  }
`;

export default Pagination;
