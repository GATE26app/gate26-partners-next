import { GetServerSideProps } from 'next';

import CancelDetailPage from '@components/CancelDetailPage';

export default CancelDetailPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, resolvedUrl } = context;
  const referer: string | undefined = req.headers?.referer;
  let previousRoute = referer || undefined;

  if (
    (previousRoute && previousRoute.includes(resolvedUrl)) ||
    previousRoute === undefined
  ) {
    previousRoute = '/canceldetail?';
  }

  return {
    props: { previousRoute },
  };
};
