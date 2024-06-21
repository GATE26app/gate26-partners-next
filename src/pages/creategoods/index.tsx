import { GetServerSideProps } from 'next';

import CreateGoodsPage from '@components/CreateGoodsPage';

export default CreateGoodsPage;

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
