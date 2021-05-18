// NavigationService.js
/**
 * this can be used to navigate  from other then react components.
 */
import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

/**
 * Function to set navigator reference to use later on,
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(NavigationActions.back());
}

function reset() {
  _navigator.dispatch(StackActions.reset.apply(null, arguments));
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  back,
  reset,
};
