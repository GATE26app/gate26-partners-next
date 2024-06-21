import { GetServerSideProps } from 'next';

import OrderDetailPage from '@components/OrderDetailPage';

export default OrderDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, resolvedUrl } = context;
  const referer: string | undefined = req.headers?.referer;
  let previousRoute = referer || undefined;

  if (
    (previousRoute && previousRoute.includes(resolvedUrl)) ||
    previousRoute === undefined
  ) {
    previousRoute = '/orderdetail?';
  }

  return {
    props: { previousRoute },
  };
};
