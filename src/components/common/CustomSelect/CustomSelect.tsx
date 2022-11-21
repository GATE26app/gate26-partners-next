/* eslint-disable no-use-before-define */
import React from 'react';
import Select, { Props as ReactSelectProps } from 'react-select';

import { useTheme } from '@chakra-ui/react';

import styled from '@emotion/styled';

import DropdownIndicator from './_fragments/DropdownIndicator';

interface CustomSelectProps {
  width?: string;
  size?: 'md' | 'sm' | 'xs';
  placeholder?: string;
  disabled?: boolean;
  items: {
    value: string | number;
    label: string;
  }[];
  noBorder?: boolean;
  onChange?: (value: string | number) => void;
}

const CustomSelect = ({
  width,
  size = 'md',
  placeholder,
  items,
  disabled,
  defaultValue,
  noBorder,
  onChange,
  ...props
}: CustomSelectProps & ReactSelectProps) => {
  const theme = useTheme();
  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e.value);
    }
  };

  return (
    <Wrap
      width={width}
      height={size === 'md' ? '50px' : size === 'sm' ? '40px' : '30px'}
    >
      <StyledReactSelect
        className="select-container"
        {...props}
        isDisabled={disabled}
        placeholder={placeholder}
        isSearchable={false}
        components={{ DropdownIndicator }}
        customTheme={theme}
        classNamePrefix={'Select'}
        onChange={handleChange}
        options={items}
        defaultValue={
          defaultValue !== undefined
            ? items.find((item) => item.value === defaultValue)
            : items[0]
        }
        size={size}
        noBorder={noBorder}
        styles={{
          dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
          }),
        }}
      />
    </Wrap>
  );
};

export default CustomSelect;

interface WrapStyleProps {
  width?: string;
  height?: string;
}

const Wrap = styled.div<WrapStyleProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
`;

interface StyledReactSelectProps {
  customTheme: any;
  size: 'md' | 'sm' | 'xs';
  noBorder?: boolean;
}

const StyledReactSelect = styled(Select)<StyledReactSelectProps>`
  height: 100%;
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) =>
      props.isDisabled
        ? props.customTheme.colors.gray[500]
        : props.customTheme.colors.black};
  }
  & .Select {
    &__control {
      display: flex;
      align-items: center;
      background-color: ${(props) => props.customTheme.colors.white};
      border-color: ${(props) => props.customTheme.colors.gray[300]};
      min-height: auto;
      height: 100%;
      border-radius: 5px;
      box-shadow: none !important;
      border-width: ${(props) => (props.noBorder ? 0 : '1px')};
      &--menu-is-open {
        border-color: #ff5942;
      }
      &:hover {
        border-color: #ff5942;
      }
    }

    &__menu {
      margin: 0;
      top: calc(100% + 10px);
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 'none';
      border-width: 0px;
      background-color: ${(props) => props.customTheme.colors.white};
      color: ${(props) => props.customTheme.colors.black};
      padding: ${(props) => (props.noBorder ? '0px' : '10px')};
      &-list {
        padding: 0;
        text-align: center;
      }
    }

    &__option {
      border-radius: 5px;
      display: 'flex';
      align-items: 'center';
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.02em;
      color: ${(props) => props.customTheme.colors.black};
      &--is-selected {
        background-color: ${(props) => props.customTheme.colors.gray[100]};
      }
      &--is-focused {
        background-color: ${(props) => props.customTheme.colors.gray[100]};
      }
    }

    &__value-container {
      width: 100%;
      display: flex;
      align-items: center;
      padding: ${(props) => (props.noBorder ? 0 : '2px 8px')};
    }
    &__single-value {
      color: ${(props) =>
        props.isDisabled
          ? props.customTheme.colors.gray[500]
          : props.customTheme.colors.black};
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: ${(props) => (props.size === 'md' ? '15px' : '12px')};
      line-height: ${(props) => (props.size === 'md' ? '27px' : '18px')};
      letter-spacing: -0.02em;
      opacity: 1;
      transition: opacity 300ms;
      &--is-disabled {
        opacity: 0;
      }
    }

    &__placeholder {
      color: ${(props) =>
        props.isDisabled
          ? props.customTheme.colors.gray[500]
          : props.customTheme.colors.black};
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: ${(props) => (props.size === 'md' ? '15px' : '12px')};
      line-height: ${(props) => (props.size === 'md' ? '27px' : '18px')};
      letter-spacing: -0.02em;
    }

    &__indicator {
      &-separator {
        display: none;
      }
    }
  }
`;
