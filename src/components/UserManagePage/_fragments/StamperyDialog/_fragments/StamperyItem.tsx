import { Box, Circle, Flex, Image, Text } from '@chakra-ui/react';

import styled from '@emotion/styled';

export interface StamperyItemProps {
  icon: string;
  text: string;
  value?: any;
  isAcitve?: boolean;
  onClick?: (value: any) => void;
}

const StamperyItem = ({
  value,
  icon,
  text,
  isAcitve,
  onClick,
}: StamperyItemProps) => {
  return (
    <ItemWrapper
      onClick={onClick ? () => onClick(value) : undefined}
      cursor="pointer"
    >
      <Flex align="center" direction="column">
        <Circle
          backgroundColor={isAcitve ? 'primary.100' : 'gray.200'}
          size="100px"
        >
          <Image src={icon} />
        </Circle>
        <Text
          textStyle={isAcitve ? 'titleMd' : 'textMd'}
          color={isAcitve ? 'primary.500' : 'black'}
          marginTop="1.5"
        >
          {text}
        </Text>
      </Flex>
    </ItemWrapper>
  );
};

const ItemWrapper = styled(Box)`
  &.active {
  }
`;

export default StamperyItem;
