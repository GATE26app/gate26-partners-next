import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect } from 'react';

import {
  ThemeProvider,
  useBreakpoint,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';

import ModalContainer from '@components/common/ModalContainer';
import ToggleColorModeButton from '@components/common/ToggleColorModeButton';
import TokDocsDevTools from '@components/common/TokDocsDevTool';

import { mode } from '@theme/foundations/colors';

import withAppProvider from 'contexts/app/app.provider';
import { withCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import { withGlobalModalHandlerContext } from 'contexts/modal/useGlobalModalHandler.context';

// import { withOrderModalHandlerContext } from 'contexts/modal/useOrderModalHandler.context';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const br = useBreakpoint();

  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
  return (
    // Provide the client to your App
    <ThemeProvider
      theme={{ ...theme, colors: { ...theme.colors, ...mode[colorMode] } }}
    >
      {/* <ToggleColorModeButton /> */}
      {getLayout(<Component {...pageProps} />)}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ModalContainer />
      {/* <OrderModalContainer /> */}
      {/* <TokDocsDevTools /> */}
    </ThemeProvider>
  );
}

export default withAppProvider(
  withGlobalModalHandlerContext(withCustomModalHandlerContext(MyApp)),
);
