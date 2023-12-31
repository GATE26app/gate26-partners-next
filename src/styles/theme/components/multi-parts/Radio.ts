import { ChakraMultiPartComponentType } from '../type';

const parts = ['container', 'control', 'label'] as const;

export const Radio: ChakraMultiPartComponentType<typeof parts> = {
  parts,
  baseStyle: {},
  defaultProps: {},
  sizes: {
    lg: {
      label: { fontSize: '15px' },
    },
  },
  variants: {},
};
