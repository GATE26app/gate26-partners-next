import { Button as ChakraButton, Flex } from '@chakra-ui/react';

import styled from '@emotion/styled';

import DownloadIcon from './@Icons/Admin/Download';
import PlusIcon from './@Icons/Admin/Plus';

type ButtonType = 'add' | 'download';
export interface IconButtonProps {
  type: ButtonType;
  width?: string;
  size: 'md' | 'sm' | 'xs';
  text: string;
  onClick?: () => void;
}

const IconButton = ({
  type,
  width = '110px',
  size,
  text,
  onClick,
}: IconButtonProps) => {
  const buttonOption = {
    add: {
      backgroundColor: '#FF5942',
      color: '#FFFFFF',
      icon: <PlusIcon size={size} strokeColor="#FFFFFF" />,
    },
    download: {
      backgroundColor: '#FFDFDB',
      color: '#FF5942',
      icon: <DownloadIcon size={size} strokeColor="#FF5942" />,
    },
  };

  return (
    <CustomButton
      w={width}
      h={size === 'md' ? '50px' : size === 'sm' ? '40px' : '30px'}
      size={size}
      buttonType={type}
      onClick={onClick}
      borderRadius={'5px'}
      backgroundColor={buttonOption[type].backgroundColor}
      color={buttonOption[type].color}
    >
      <Flex alignItems="center" justifyContent="center">
        {buttonOption[type].icon}
        <div style={{ marginLeft: '5px' }}>{text}</div>
      </Flex>
    </CustomButton>
  );
};

interface ButtonOptionProps {
  buttonType?: ButtonType;
  size?: 'md' | 'sm' | 'xs';
}
const CustomButton = styled(ChakraButton)<ButtonOptionProps>`
  & {
    padding: 11.5px 15px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: ${({ size }) => (size === 'md' ? '15px' : '12px')};
    line-height: ${({ size }) => (size === 'md' ? '27px' : '18px')};
    letter-spacing: -0.02em;
  }
`;
export default IconButton;
