import { ChakraMultiPartComponentType } from '../type';

const parts = [
  'overlay',
  'dialogContainer',
  'dialog',
  'header',
  'closeButton',
  'body',
  'footer',
] as const;

const variantSimple = {
  header: {
    padding: '29px 30px',
    fontWeight: 700,
    fontSize: '26px',
    LineHeight: '42px',
    letterSpace: '-0.02em',
  },
  body: {
    padding: '0px 30px',
  },
  footer: {
    padding: '29px 30px',
    display: 'flex',
    justifyContent: 'center',
    columnGap: '5px',
  },
};

export const Modal: ChakraMultiPartComponentType<typeof parts> = {
  parts,
  baseStyle: {},
  defaultProps: {},
  sizes: {},
  variants: {
    alert: {},
    simple: variantSimple,
  },
};
