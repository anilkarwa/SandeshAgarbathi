import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from '../components/auth/Login';

const AuthStackNavigator = createStackNavigator();

const AuthStackScreen = () => {
  const [initialScreen] = useState('LoginScreen');
  const RenderNavigationData = () => {
    return (
      <NavigationContainer>
        <AuthStackNavigator.Navigator
          initialRouteName={initialScreen} // Add this to set initial screen
          screenOptions={{
            headerShown: false,
          }}>
          <AuthStackNavigator.Screen name="LoginScreen" component={LoginPage} />
        </AuthStackNavigator.Navigator>
      </NavigationContainer>
    );
  };

  return <RenderNavigationData />;
};

export default AuthStackScreen;
