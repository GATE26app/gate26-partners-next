import { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';

function useSize() {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 1920) {
        const ratio = window.innerWidth / 1920;
        setHeight(window.innerHeight / ratio);
        setWidth(window.innerWidth / ratio);
      } else {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', () => updateSize());
    return () => window.removeEventListener('resize', () => updateSize());
  }, []);

  return { height, width };
}

// const outer_html = 'https://gate26.co.kr/TermOfUse.html';

function TermsAndConditionsContent(props: {contentSrc?: string}) {
  const { height } = useSize();

  return (
    <Flex h={height} px="0px" mt="0px" direction="column">
      <iframe width="100%" height={height} src={props.contentSrc} />
    </Flex>
  );
}

export default TermsAndConditionsContent;
