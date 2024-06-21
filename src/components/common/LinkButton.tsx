import Link, { LinkProps } from 'next/link';

import { Button, ButtonProps } from '@chakra-ui/react';

/**
 * @see Docs https://chakra-ui.com/docs/typography/text
 * @see Docs https://nextjs.org/docs/api-reference/next/link
 */
// LinkButtonProps 타입스크립트에러 any로 대체
// export interface LinkButtonProps
//   extends LinkProps,
//     Omit<ButtonProps, 'as' | 'onMouseEnter' | 'onClick'> {
//   target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
// }

const LinkButton = ({
  href, // Next Link Props
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  locale,
  target,

  ...props
}: any) => {
  return (
    <Link //
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <Button //
        as="a"
        target={target}
        {...props}
      />
    </Link>
  );
};

export default LinkButton;
