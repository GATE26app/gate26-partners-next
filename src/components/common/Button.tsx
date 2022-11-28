import { Button as ChakraButton, Flex } from '@chakra-ui/react';

import styled from '@emotion/styled';

type ButtonType =
  | 'square'
  | 'round'
  | 'square-outline'
  | 'square-grayscale'
  | 'round-outline'
  | 'toggleOff';
export interface ButtonProps {
  type?: ButtonType;
  width?: string;
  size: 'md' | 'sm' | 'xs';
  text: string;
  onClick?: () => void;
  toggle?: boolean;
}

const Button = ({
  type = 'square',
  width = '69px',
  size = 'md',
  text,
  onClick,
  toggle = false,
}: ButtonProps) => {
  return (
    <CustomButton
      w={width}
      h={size === 'md' ? '50px' : size === 'sm' ? '40px' : '30px'}
      size={size}
      buttonType={type}
      onClick={onClick}
      borderRadius={
        type.startsWith('round') && !toggle ? '25px' : toggle ? '10px' : '5px'
      }
    >
      <Flex alignItems="center" justifyContent="center">
        <div>{text}</div>
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
    background-color: ${({ buttonType }) =>
      buttonType?.endsWith('-outline')
        ? 'rgba(255, 255, 255, 1)'
        : buttonType?.endsWith('-grayscale')
        ? '#ffffff'
        : buttonType === 'toggleOff'
        ? 'unset'
        : '#ff5942'};
    border: ${({ buttonType }) =>
      buttonType?.endsWith('-outline')
        ? '1px solid #ff5942'
        : buttonType?.endsWith('-grayscale')
        ? '1px solid #E5E7EC'
        : buttonType === 'toggleOff'
        ? 'unset'
        : 0};
    /* border-radius: ${({ buttonType }) =>
      buttonType === 'toggleOff' ? 'unset' : ''}; */
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: ${({ size }) => (size === 'md' ? '15px' : '12px')};
    line-height: ${({ size }) => (size === 'md' ? '27px' : '18px')};
    letter-spacing: -0.02em;
    color: ${({ buttonType }) =>
      buttonType?.endsWith('-outline')
        ? '#FF5942'
        : buttonType?.endsWith('-grayscale')
        ? '#8C919F'
        : buttonType === 'toggleOff'
        ? '#B8BCC8'
        : '#ffffff'};
  }
`;
export default Button;
