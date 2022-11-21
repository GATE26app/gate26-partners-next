import React from 'react';

import { Image } from '@chakra-ui/react';

interface RoundImageProps {
  width?: string;
  height?: string;
  src: string;
  alt?: string;
  isCircle?: boolean;
}

const RoundImage = ({ width, height, src, alt, isCircle }: RoundImageProps) => {
  return (
    <Image
      borderRadius={isCircle ? 'full' : '5px'}
      w={width}
      h={height}
      objectFit="cover"
      src={src}
      margin={'0 auto'}
      alt={alt}
    />
  );
};

export default RoundImage;
