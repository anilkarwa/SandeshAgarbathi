/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Initial landing screen. here we check if user logged in then it go to app flow or else go to auth flow.
 */
function AuthLoadingScreen(props) {
  // Fetch the token from storage then navigate to our appropriate place
  async function _bootstrapAsync() {
    //USER_AUTH_TOKEN
    const user = await AsyncStorage.getItem('@USER');
    props.navigation.navigate(user ? 'AppStack' : 'AuthStack');
  }

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  // Render any loading content that you like here
  //right now just keeping a blank screen while app is making decision on initial loading.
  return (
    <React.Fragment>
      {
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={'#fff'} size="large" />
        </View>
      }
    </React.Fragment>
  );
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000' + '93',
    zIndex: 9999,
  },
});
