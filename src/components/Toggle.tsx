import React, { useState } from 'react';

import styled from '@emotion/styled';

import Button from './common/Button';

export interface ToogleOption {
  width?: string;
  size?: 'md' | 'sm' | 'xs';
  onClick?: (data: string) => void;
  text1: string;
  text2: string;
  text3?: string;
  toggleOption?: boolean;
}

const Toggle = ({
  width = '166.67px',
  size = 'md',
  text1,
  text2,
  text3,
  onClick,
  toggleOption,
}: ToogleOption) => {
  const [isToggle, setIsToggle] = useState<string>('1');

  const toggleHandler = (index: string) => {
    if (onClick) {
      onClick(index);
    }
    setIsToggle(index);
    return index;
  };
  return (
    <>
      <ToggleForm>
        <Button
          width={width}
          size={size}
          type={isToggle === '1' ? 'square-outline' : 'toggleOff'}
          text={text1}
          toggle
          onClick={() => toggleHandler('1')}
        />
        <Button
          width={width}
          size={size}
          type={isToggle === '2' ? 'square-outline' : 'toggleOff'}
          text={text2}
          toggle
          onClick={() => toggleHandler('2')}
        />
        {toggleOption ? (
          <Button
            width={width}
            size={size}
            type={isToggle === '3' ? 'square-outline' : 'toggleOff'}
            text={text3 ? text3 : ''}
            toggle
            onClick={() => toggleHandler('3')}
          />
        ) : null}
      </ToggleForm>
    </>
  );
};

const ToggleForm = styled.div`
  display: flex;
  align-items: center;
`;

export default Toggle;
