import { Component } from 'react';

import { ChakraComponent, Flex, Text } from '@chakra-ui/react';

import styled from '@emotion/styled';

interface ModalRowProps {
  title: string;
  titleAlign?: 'top' | 'center' | 'bottom';
  content: JSX.Element;
  height?: string;
}
const ModalRow = ({
  title,
  titleAlign = 'center',
  content,
  height = '40px',
}: ModalRowProps) => {
  return (
    <Flex
      h={height}
      alignItems={
        titleAlign === 'top'
          ? 'flex-start'
          : titleAlign === 'bottom'
          ? 'flex-end'
          : 'center'
      }
    >
      <Flex h={'40px'} alignItems={'center'}>
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
      </Flex>

      <Content h={height} alignItems={'center'}>
        {content}
      </Content>
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
