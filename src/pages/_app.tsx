import {
  ThemeProvider,
  useBreakpoint,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';

import ModalContainer from '@components/common/ModalContainer';
import ToggleColorModeButton from '@components/common/ToggleColorModeButton';
import TokDocsDevTools from '@components/common/TokDocsDevTool';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { mode } from '@theme/foundations/colors';

import withAppProvider from 'contexts/app/app.provider';
import { withCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import { withGlobalModalHandlerContext } from 'contexts/modal/useGlobalModalHandler.context';

function MyApp({ Component, pageProps }: any) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const br = useBreakpoint();

  return (
    // Provide the client to your App
    <ThemeProvider
      theme={{ ...theme, colors: { ...theme.colors, ...mode[colorMode] } }}
    >
      {/* <ToggleColorModeButton /> */}
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ModalContainer />
      <TokDocsDevTools />
    </ThemeProvider>
  );
}

export default withAppProvider(
  withGlobalModalHandlerContext(withCustomModalHandlerContext(MyApp)),
);
