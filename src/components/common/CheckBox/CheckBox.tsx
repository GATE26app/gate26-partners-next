import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { CheckBoxProps } from './CheckBox.type';

import {
  CheckedDisableIcon,
  CheckedOffIcon,
  CheckedOnIcon,
} from 'components/common/@Icons/Admin';

const CheckBox = ({
  checked,
  disabled,
  children,
  onClick,
  width,
  height,
  ...props
}: CheckBoxProps) => {
  return (
    <Flex
      cursor="pointer"
      alignItems="center"
      {...props}
      onClick={() => onClick && onClick()}
    >
      {disabled ? (
        <CheckedDisableIcon w={width} h={height} />
      ) : checked ? (
        <CheckedOnIcon w={width} h={height} />
      ) : (
        <CheckedOffIcon w={width} h={height} />
      )}
      {typeof children === 'string' ? (
        <Text fontSize={'15px'} ml="8px" color="black">
          {children}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};

export default CheckBox;
