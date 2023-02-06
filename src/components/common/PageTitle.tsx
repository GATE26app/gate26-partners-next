import { Flex, Text } from '@chakra-ui/react';

import IconButton from './IconButton';

interface PageTitleProps {
  title: string;
  isDownload?: boolean;
  isAllDownLoad?: boolean;
  noMargin?: boolean;
  onClickDownload?: () => void;
  onClickAllDownload?: () => void;
}
const PageTitle = ({
  title,
  isDownload,
  isAllDownLoad,
  noMargin,
  onClickDownload,
  onClickAllDownload,
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
      <Flex>
        {isDownload && (
          <IconButton
            type="download"
            size="sm"
            width="120px"
            text="현페이지다운"
            onClick={onClickDownload}
          />
        )}
        {isAllDownLoad && (
          <Flex ml="20px">
            <IconButton
              type="download"
              size="sm"
              width="120px"
              text="전체다운"
              onClick={onClickAllDownload}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default PageTitle;
