import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigatorContainer, NavigationService} from './navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import ErrorBoundary from 'react-native-error-boundary';
import {AppLoader, NoInternet, ErrorFallback} from './components/common';
import {theme} from './config/theme';
import Toast from 'react-native-toast-message';

const App = () => {
  const errorHandler = (error, stackTrace) => {
    /* Log the error to an error reporting service */
    const errors = {
      error: error.message,
      stackTrace: stackTrace,
      status: 'Reported',
      source: 'Mobile App',
    };
  };

  // global.XMLHttpRequest =
  //   global.originalXMLHttpRequest || global.XMLHttpRequest;
  // global.FormData = global.originalFormData || global.FormData;

  // if (window.FETCH_SUPPORT) {
  //   window.FETCH_SUPPORT.blob = false;
  // } else {
  //   global.FileReader = global.originalFileReader || global.FileReader;
  //   // eslint-disable-next-line no-undef
  //   GLOBAL.Blob = null;
  // }

  return (
    <>
      <PaperProvider theme={theme}>
        <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
          <NavigatorContainer
            TopLevelNavigator
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <AppLoader />
          <NoInternet />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </ErrorBoundary>
      </PaperProvider>
    </>
  );
};

export default App;
