import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {theme} from '../../../config/theme';

export const Home = ({navigation}) => {
  return (
    <View style={styles.constainer}>
      <Text style={styles.heading}>Welcome,</Text>
      <Text style={styles.name}>Anil Karwa</Text>
      <View style={styles.smallCardContainer}>
        <View style={styles.smallCards}>
          <Text style={styles.numberText}>500</Text>
          <Text style={styles.cardText}>Today's Sale</Text>
        </View>
        <View style={styles.smallCards}>
          <Text style={styles.numberText}>22,000</Text>
          <Text style={styles.cardText}>Month Sale</Text>
        </View>
        <View style={styles.smallCards}>
          <Text style={styles.numberText}>10</Text>
          <Text style={styles.cardText}>Today's Invoice</Text>
        </View>
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Create Invoice"
        onPress={() => navigation.navigate('Customer')}
      />
      <View style={styles.infoBox}>
        <Text style={styles.info}>
          Create new invoice by selecting customer and items, once done email
          will be sent to the customer over his/her email.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontWeight: theme.fonts.medium.fontWeight,
    fontSize: 30,
  },
  name: {
    fontFamily: theme.fonts.regular.fontFamily,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 22,
  },
  fab: {
    margin: 16,
    maxWidth: '70%',
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
  },
  smallCardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 100,
  },
  smallCards: {
    fontSize: 14,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardText: {
    marginTop: 10,
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
    fontSize: 12,
  },
  numberText: {
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
    fontSize: 20,
  },
  infoBox: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  info: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
    fontSize: 12,
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
    textAlign: 'center',
  },
});
