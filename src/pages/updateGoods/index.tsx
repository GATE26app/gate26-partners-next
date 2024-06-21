import { GetServerSideProps } from 'next';

import UpdateGoodsPage from '@components/UpdateGoodsPage';

export default UpdateGoodsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, resolvedUrl } = context;
  const referer: string | undefined = req.headers?.referer;
  let previousRoute = referer || undefined;

  if (
    (previousRoute && previousRoute.includes(resolvedUrl)) ||
    previousRoute === undefined
  ) {
    previousRoute = '/updategoods?';
  }

  return {
    props: { previousRoute },
  };
};
