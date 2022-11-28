import React, { useState } from 'react';

import styled from '@emotion/styled';

import Button from './Button';

export interface ToggleOption {
  text: string;
  value: any;
}
export interface ToogleProps {
  width?: string;
  size?: 'md' | 'sm' | 'xs';
  onClick?: (data: string) => void;
  defaultValue?: any;
  toggleOptions: ToggleOption[];
}

const Toggle = ({
  width = '166.67px',
  size = 'md',
  onClick,
  toggleOptions,
  defaultValue,
}: ToogleProps) => {
  const [selectedToggle, setSelectedToggle] = useState<any>(
    defaultValue || toggleOptions[0].value,
  );

  const toggleHandler = (value: string) => {
    if (onClick) onClick(value);

    setSelectedToggle(value);
  };
  return (
    <>
      <ToggleForm>
        {toggleOptions.map(({ value, text }, index) => {
          return (
            <Button
              key={index}
              width={width}
              size={size}
              type={selectedToggle === value ? 'square-outline' : 'toggleOff'}
              text={text}
              toggle
              onClick={() => toggleHandler(value)}
            />
          );
        })}
      </ToggleForm>
    </>
  );
};

const ToggleForm = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f3f4;
`;

export default Toggle;
