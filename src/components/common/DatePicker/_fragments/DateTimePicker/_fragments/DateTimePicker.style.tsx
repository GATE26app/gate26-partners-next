import { Box, Flex } from '@chakra-ui/react';

import styled from '@emotion/styled';
import { Light } from '@theme/foundations/colors';

export const TimeBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 27px;
  letter-spacing: -2%;
  width: 50px;
  height: 32px;
  border-radius: 5px;

  &.cur {
    font-weight: bold;
    color: white;
    background-color: ${() => Light.primary[500]};
    &:hover {
      background-color: ${() => Light.primary[500]};
    }
  }
  &.select {
    background-color: ${() => Light.gray[100]};
  }
  &:hover {
    background-color: ${() => Light.gray[100]};
  }
`;

export const FlexHidden = styled(Flex)`
  height: 255px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
