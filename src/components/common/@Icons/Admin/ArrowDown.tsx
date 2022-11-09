import { Icon, IconProps } from '@chakra-ui/react';

const ArrowDownIcon = ({ ...props }: IconProps) => {
  return (
    <Icon
      maxW={'8px'}
      maxH={'5px'}
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 5L0 0H8L4 5Z" fill="white" />
    </Icon>
  );
};

export default ArrowDownIcon;

{
  /* <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 5L0 0H8L4 5Z" fill="white"/>
</svg> */
}
