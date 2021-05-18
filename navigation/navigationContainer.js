import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AuthLoadingScreen} from '../components/screen';
import AuthStackScreen from './authNavigator';
import {AppNavigator} from './appNavigator';

/**
 * Main composite navigator.
 */
export default createAppContainer(
  createSwitchNavigator(
    {
      AppLoading: AuthLoadingScreen,
      AppStack: AppNavigator,
      AuthStack: AuthStackScreen,
    },
    {
      initialRouteName: 'AppLoading',
    },
  ),
);
