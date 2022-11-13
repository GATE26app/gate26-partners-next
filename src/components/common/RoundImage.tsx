import React from 'react';

import { Image } from '@chakra-ui/react';

interface RoundImageProps {
  width?: string;
  height?: string;
  src: string;
  alt?: string;
}

const RoundImage = ({ width, height, src, alt }: RoundImageProps) => {
  return (
    <Image
      borderRadius="5px"
      w={width}
      h={height}
      objectFit="cover"
      src={src}
      alt={alt}
    />
  );
};

export default RoundImage;
