import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

/**
 *  App loader component. it is generic component to show loader in whole application
 *  it depends on value of showLoader in redux store. So show loader set value of this variable to true
 *  to find set value to false.
 */
function AppLoader(props) {
  const showLoader = false;
  return (
    <React.Fragment>
      {showLoader ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={'#fff'} size="large" />
        </View>
      ) : null}
    </React.Fragment>
  );
}

export default AppLoader;

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
