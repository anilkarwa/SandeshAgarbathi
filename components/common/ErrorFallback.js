import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

/**
 * Error fallback.
 * @param error
 * @param resetError
 * @returns {*}
 * @constructor
 */
const ErrorFallback = ({error, resetError}) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Something happened!</Text>
    <Text style={styles.subText}>
      We have notified our team. We will soon sort out the problem.
    </Text>
    <Button status="primary" onPress={resetError} title={'Try again'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
  heading: {
    fontWeight: 'bold',
    minWidth: '100%',
    fontSize: 25,
    textAlign: 'center',
  },
  subText: {
    paddingBottom: 20,
    textAlign: 'center',
  },
});

export default ErrorFallback;
