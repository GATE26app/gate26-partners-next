import { useEffect, useState } from 'react';

import { Flex, Radio, RadioGroup, Stack, background } from '@chakra-ui/react';

type radioColor = 'checked' | 'disabled';

interface RadioPrsop {
  onClick?: (buttonIdx: number) => void;
  type?: radioColor;
  radioCount?: number;
  groupLabel?: string[];
  label?: string;
  disabled?: boolean;
  group?: boolean;
  checked?: boolean;
}

const RadioButton = ({
  onClick,
  label,
  disabled = false,
  group = false,
  checked = false,
  groupLabel,
}: RadioPrsop) => {
  const [value, setVaule] = useState<boolean>(false);
  const [groupValue, setGroupValue] = useState<string>('0');

  const RadioValue = (e: any) => {
    if (!group) {
      setVaule(!value);
      if (onClick) {
        onClick(e);
      }
      return;
    }
    setGroupValue(e);
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <>
      {!group ? (
        <Radio
          isDisabled={disabled}
          size="lg"
          isChecked={checked ? checked : disabled ? true : value}
          onClick={(e) => RadioValue(e)}
          _disabled={{ border: '5px solid #b8bccb' }}
          _checked={{ background: '#FF5942' }}
          _before={{
            background: '#ffffff',
            width: '10px',
            height: '10px',
            content: '""',
            borderRadius: '50%',
          }}
        >
          {label}
        </Radio>
      ) : (
        <RadioGroup onChange={(e) => RadioValue(e)} value={groupValue}>
          <Stack direction="row" columnGap={'30.5px'}>
            {groupLabel?.map((item, index) => {
              return (
                <>
                  <Radio
                    isChecked={checked ? checked : disabled ? true : value}
                    isDisabled={disabled}
                    size="lg"
                    onClick={(e) => RadioValue(e)}
                    _disabled={{ border: '5px solid #b8bccb' }}
                    _checked={{ background: '#FF5942' }}
                    _before={{
                      background: '#ffffff',
                      width: '10px',
                      height: '10px',
                      content: '""',
                      borderRadius: '50%',
                    }}
                    value={String(index)}
                  >
                    {item}
                  </Radio>
                </>
              );
            })}
          </Stack>
        </RadioGroup>
      )}
    </>
  );
};

export default RadioButton;
