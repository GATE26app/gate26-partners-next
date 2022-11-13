import { cssVar } from '@chakra-ui/styled-system';

import { ChakraMultiPartComponentType } from '../type';

const parts = [
  'button',
  'list',
  'item',
  'groupTitle',
  'command',
  'divider',
] as const;

const baseStyleList = {
  minW: '60px',
  padding: 0,
};

const baseStyleItem = {
  justifyContent: 'end',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  letterSpacing: '-0.02em',
  color: 'black',
};

export const Menu: ChakraMultiPartComponentType<typeof parts> = {
  parts,
  baseStyle: {
    list: baseStyleList,
    item: baseStyleItem,
  },
  defaultProps: {},
  sizes: {},
  variants: {},
};
