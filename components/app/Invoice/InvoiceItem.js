import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../../config/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function InvoiceItem(props) {
  const navigation = useNavigation();
  const {item} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.details]}
        onPress={() =>
          navigation.navigate('InvoiceDetails', {
            invoice: item,
          })
        }>
        <View style={styles.firstRow}>
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceNum}>{item.invoiceNo}</Text>
          </View>
          <Text style={styles.otherText}>
            {moment(new Date(item.invoiceDate)).format('DD/MM/YYYY')}{' '}
            {item.time}
          </Text>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.customerDetail}>
            <Icons
              name={'account'}
              size={20}
              color={theme.colors.placeholder}
            />
            <Text style={styles.customerName}>{item.partyName}</Text>
          </View>
        </View>
        <View style={styles.thirdRow}>
          <View>
            <Text style={styles.otherText}>Tax</Text>
            <Text style={styles.otherBoldText}>
              {parseFloat(item.cgstAmt + item.sgstAmt).toFixed(2)}
            </Text>
          </View>
          <View>
            <Text style={styles.otherText}>Invoice Value</Text>
            <Text style={styles.otherBoldText}>
              {parseFloat(item.totalAmt).toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default InvoiceItem;

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
  details: {
    flex: 1,
    padding: 10,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 15,
  },
  secondRow: {
    marginBottom: 10,
  },
  thirdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  invoiceContainer: {
    backgroundColor: theme.colors.divider,
    borderRadius: 10,
    padding: 5,
  },
  invoiceNum: {
    height: 20,
    fontSize: 18,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  customerDetail: {
    flexDirection: 'row',
  },
  customerName: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  otherText: {
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 14,
  },
  otherBoldText: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 14,
  },
});
