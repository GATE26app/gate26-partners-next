import { Button as ChakraButton, Flex } from '@chakra-ui/react';

import styled from '@emotion/styled';

export interface SmallButton {
  width?: string;
  height?: string;
  text: string;
  onClick?: () => void;
  color: 'blue' | 'normal' | 'file';
  label?: string;
}

const SmallButton = ({
  width = '58px',
  height = '18px',
  text,
  color,
  onClick,
  label,
}: SmallButton) => {
  return (
    <SamllButotnStyle
      w={width}
      h={height}
      buttonColor={color}
      onClick={onClick}
    >
      <Flex alignItems="center" justifyContent="center">
        <label htmlFor={label}>
          <div>{text}</div>
        </label>
      </Flex>
    </SamllButotnStyle>
  );
};

interface ButtonOption {
  buttonColor?: 'normal' | 'blue' | 'file';
}
const SamllButotnStyle = styled(ChakraButton)<ButtonOption>`
  & {
    padding: 0px 5px;
    background-color: #ffffff;
    border: ${({ buttonColor }) =>
      buttonColor === 'normal'
        ? '1px solid #E5E7EC'
        : buttonColor === 'file'
        ? '1px solid #E5E7EC'
        : '1px solid #CBDFFF'};
    color: ${({ buttonColor }) =>
      buttonColor === 'normal'
        ? '#1A1A1A'
        : buttonColor === 'file'
        ? '#4a4d55'
        : '#3479EA'};
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -2%;
    font-family: 'Pretendard';
    border-radius: 5px;
  }
`;

export default SmallButton;
