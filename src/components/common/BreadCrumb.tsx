import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@chakra-ui/react';

interface BreadCrumbProps extends BreadcrumbProps {
  depth: string[];
}
const BreadCrumb = ({ depth, ...props }: BreadCrumbProps) => {
  return (
    <Breadcrumb
      fontSize={'12px'}
      fontWeight={700}
      lineHeight={'18px'}
      color={'gray.500'}
      marginBottom={'5px'}
    >
      {depth.map((item) => {
        return (
          <BreadcrumbItem key={item}>
            <BreadcrumbLink>{item}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
