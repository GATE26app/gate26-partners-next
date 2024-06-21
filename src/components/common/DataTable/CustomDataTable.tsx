import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import CustomButton from '@components/common/CustomButton';
import ImageButton from '@components/common/ImageButton';
import SelectBox from '@components/common/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorWhite,
} from '@utils/_Palette';

function CustomDataTable() {
  return (
    <Box mt={'40px'}>
      {/* {DataTop()}
      <OrderDataTable />
      {paginationProps && (
        <Flex justifyContent="center" alignItems="center">
          <Pagination
            currentPage={paginationProps.currentPage}
            limit={paginationProps.limit}
            total={paginationProps.total}
            onPageNumberClicked={paginationProps.onPageNumberClicked}
            onPreviousPageClicked={paginationProps.onPreviousPageClicked}
            onNextPageClicked={paginationProps.onNextPageClicked}
          />
        </Flex>
      )} */}
    </Box>
  );
}

export default CustomDataTable;
