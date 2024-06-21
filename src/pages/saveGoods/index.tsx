import { GetServerSideProps } from 'next';

import SaveGoodsPage from '@components/SaveGoodsPage';

export default SaveGoodsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, resolvedUrl } = context;
  const referer: string | undefined = req.headers?.referer;
  let previousRoute = referer || undefined;

  if (
    (previousRoute && previousRoute.includes(resolvedUrl)) ||
    previousRoute === undefined
  ) {
    previousRoute = '/creategodds?';
  }

  return {
    props: { previousRoute },
  };
};
