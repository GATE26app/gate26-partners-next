import { Flex, Text } from '@chakra-ui/react';

import IconButton from './IconButton';

interface PageTitleProps {
  title: string;
  isDownload?: boolean;
  onClickDownload?: () => void;
}
const PageTitle = ({ title, isDownload, onClickDownload }: PageTitleProps) => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      marginBottom={'30px'}
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
          size="md"
          width="120px"
          height="40px"
          text="내보내기"
          onClick={onClickDownload}
        />
      )}
    </Flex>
  );
};

export default PageTitle;
