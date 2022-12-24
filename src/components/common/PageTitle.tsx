import { Flex, Text } from '@chakra-ui/react';

import IconButton from './IconButton';

interface PageTitleProps {
  title: string;
  isDownload?: boolean;
  noMargin?: boolean;
  onClickDownload?: () => void;
}
const PageTitle = ({
  title,
  isDownload,
  noMargin,
  onClickDownload,
}: PageTitleProps) => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      marginBottom={noMargin ? '0' : '30px'}
    >
      <Text
        fontSize="26px"
        fontStyle="normal"
        fontWeight={700}
        lineHeight="42px"
        letterSpacing="-0.02em"
        color="black"
      >
        {title}
      </Text>
      {isDownload && (
        <IconButton
          type="download"
          size="sm"
          width="120px"
          text="내보내기"
          onClick={onClickDownload}
        />
      )}
    </Flex>
  );
};

export default PageTitle;
