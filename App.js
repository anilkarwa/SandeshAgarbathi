import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigatorContainer, NavigationService} from './navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as JotaiProvider} from 'jotai';
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

  return (
    <>
      <PaperProvider theme={theme}>
        <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
          <JotaiProvider>
            <NavigatorContainer
              TopLevelNavigator
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
            <AppLoader />
          </JotaiProvider>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </ErrorBoundary>
      </PaperProvider>
    </>
  );
};

export default App;
