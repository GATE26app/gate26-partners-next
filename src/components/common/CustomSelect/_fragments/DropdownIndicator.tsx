import { DropdownIndicatorProps, components } from 'react-select';

import ArrowDownIcon from '@components/common/@Icons/Admin/ArrowDown';

import { Light } from '@theme/foundations/colors';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
