import React, { RefObject } from 'react';

import { Flex, Text } from '@chakra-ui/react';

interface PickerFooterProps {
  ref: RefObject<{ focus(): void }>;
  onClickCancel: () => void;
  onClickApply: () => void;
}

const PickerFooter = ({
  ref,
  onClickCancel,
  onClickApply,
}: PickerFooterProps) => {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      borderTop={'1px solid'}
      borderTopColor={'gray.200'}
      padding={'13.5px 20px 14px 20px'}
    >
      <Text
        fontWeight="400"
        fontSize="15px"
        color="gray.500"
        cursor={'pointer'}
        onClick={onClickCancel}
        ref={ref?.current?.focus}
      >
        {'취소'}
      </Text>

      <Text
        fontWeight="700"
        fontSize="15px"
        color="primary.500"
        cursor={'pointer'}
        onClick={onClickApply}
        ref={ref?.current?.focus}
      >
        {'확인'}
      </Text>
    </Flex>
  );
};

export default PickerFooter;
