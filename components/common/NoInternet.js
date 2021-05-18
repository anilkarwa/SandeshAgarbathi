import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

/**
 * No Internet component
 */
function NoInternet() {
  const netInfo = useNetInfo();
  return (
    <React.Fragment>
      {!netInfo.isConnected ? (
        <View style={styles.noInternetBlock}>
          <Text style={styles.errorMessage}>No Internet Connection!</Text>
        </View>
      ) : null}
    </React.Fragment>
  );
}

export default NoInternet;

const styles = StyleSheet.create({
  noInternetBlock: {
    backgroundColor: '#323232',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 9999,
  },
  errorMessage: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'normal',
    flexWrap: 'wrap',
  },
});
