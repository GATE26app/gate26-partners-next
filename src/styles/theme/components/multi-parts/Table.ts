import { StyleObjectOrFn } from '@chakra-ui/styled-system';

import { ChakraMultiPartComponentType } from '../type';

const parts = [
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'tfoot',
  'caption',
] as const;

const numericStyles = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
  },
};

const variantSimple: StyleObjectOrFn = (props) => {
  const { colorScheme: c } = props;

  return {
    table: {
      backgroundColor: 'white',
      borderRadius: '5px',
    },
    thead: {
      tr: {
        height: '50px',
      },
    },
    th: {
      position: 'relative',
      color: 'gray.500',
      borderBottom: '1px',
      borderColor: `${c}.300`,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '18px',
      letterSpacing: '-0.02em',
      textAlign: 'center',
      ...numericStyles,
    },
    td: {
      borderBottom: '1px',
      borderColor: `${c}.300`,
      color: 'black',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
      letterSpacing: '-0.02em',
      textAlign: 'center',
      ...numericStyles,
    },
    tr: {
      height: '70px',
    },
    caption: {
      color: 'gray.600',
    },
    tfoot: {
      tr: {
        height: '70px',
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
};

const variantGray: StyleObjectOrFn = (props) => {
  const simple = variantSimple(props);

  return {
    ...simple,
    thead: {
      tr: {
        height: '50px',
        backgroundColor: 'gray.50',
      },
    },
  };
};

export const Table: ChakraMultiPartComponentType<typeof parts> = {
  parts,
  baseStyle: {},
  defaultProps: {},
  sizes: {},
  variants: {
    simple: variantSimple,
    gray: variantGray,
  },
};
