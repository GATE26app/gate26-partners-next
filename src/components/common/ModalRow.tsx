import { Component } from 'react';

import { ChakraComponent, Flex, Text } from '@chakra-ui/react';

import styled from '@emotion/styled';

interface ModalRowProps {
  title: string;
  content: JSX.Element;
  height?: string;
}
const ModalRow = ({ title, content, height = '40px' }: ModalRowProps) => {
  return (
    <Flex h={height} alignItems={'flex-start'}>
      <Text
        minW={'85px'}
        alignSelf={'center'}
        fontSize={'12px'}
        fontWeight={700}
        fontStyle={'normal'}
        lineHeight={'18px'}
        letterSpacing={'-0.02em'}
      >
        {title}
      </Text>
      <Content h={height}>{content}</Content>
    </Flex>
  );
};

const Content = styled(Flex)`
  width: 100%;
  > input {
    height: ${(props) => props.h};
  }
  > div {
    width: 100%;
  }
`;
export default ModalRow;
