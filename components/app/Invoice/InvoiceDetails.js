import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import {theme} from '../../../config/theme';
import moment from 'moment';

function InvoiceDetails(props) {
  const {invoice} = props.route.params;

  const [invoiceDetails] = useState({
    invoiceNo: invoice.invoiceNo,
    invoiceDate: moment(new Date(invoice.invoiceDate)).format('DD/MM/YYYY'),
    time: invoice.time,
    partyName: invoice.partyName,
    addressLine1: invoice.addressLine1,
    addressLine2: invoice.addressLine2,
    addressLine3: invoice.addressLine3,
    city: invoice.city,
    state: invoice.state,
    country: invoice.country,
    pinCode: invoice.pindcode,
    grossAmt: invoice.grossAmt,
    cgstAmt: invoice.cgstAmt,
    sgstAmt: invoice.sgstAmt,
    totalAmt: invoice.totalAmt,
    grandTotolAmt: invoice.grandTotolAmt,
    roundOff: invoice.roundOff,
    discAmt: invoice.discAmt,
    agent: invoice.agent,
    remarks: invoice.remarks,
    items: invoice.items,
  });

  return (
    <ScrollView style={styles.constainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Invoice</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.space}>
          <Text style={styles.label}>Invoice No:</Text>{' '}
          {invoiceDetails.invoiceNo}
        </Text>
        <Text style={styles.space}>
          <Text style={styles.label}>Date:</Text>{' '}
          {moment(invoiceDetails.invoiceDate).format('DD/MM/YYYY')}{' '}
          {invoiceDetails.time}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.label, styles.space]}>
          {invoiceDetails.partyName}
        </Text>
        <Text style={styles.smallSpace}>
          {invoiceDetails.addressLine1} {invoiceDetails.addressLine2}{' '}
          {invoiceDetails.addressLine3} {invoiceDetails.city}{' '}
          {invoiceDetails.state} {invoiceDetails.country}{' '}
          {invoiceDetails.pinCode}
        </Text>
      </View>
      {invoiceDetails.items.map((item, index) => (
        <View style={[styles.section, styles.itemContainer]} key={item.itemId}>
          <View style={styles.itemDetails}>
            <Text numberOfLines={1} style={[styles.label, styles.space]}>
              {index + 1}). {item.itemName}
            </Text>
            <Text style={styles.smallSpace}>Qty: {parseInt(item.qty, 10)}</Text>
            <Text style={styles.smallSpace}>
              Rate: {parseFloat(item.rate).toFixed(2)}
            </Text>
          </View>
          <View style={styles.itemTotal}>
            <Text>Total: {parseFloat(item.rate * item.qty).toFixed(2)}</Text>
          </View>
        </View>
      ))}
      <View style={styles.finalAmountContainer}>
        <Text style={styles.finalAmount}>
          Total Amount: {parseFloat(invoiceDetails.grossAmt).toFixed(2)}
        </Text>
        <Text style={styles.finalAmount}>
          SGST: {parseFloat(invoiceDetails.sgstAmt).toFixed(2)}
        </Text>
        <Text style={styles.finalAmount}>
          CGST: {parseFloat(invoiceDetails.cgstAmt).toFixed(2)}
        </Text>
        <Text style={styles.finalAmount}>
          Grant Total: {parseFloat(invoiceDetails.grandTotolAmt).toFixed(2)}
        </Text>
      </View>
      <View style={styles.remarksContainer}>
        <Text>Remarks: {invoiceDetails.remarks}</Text>
      </View>
    </ScrollView>
  );
}
export default InvoiceDetails;

const styles = StyleSheet.create({
  constainer: {
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  section: {
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.divider,
    padding: 10,
    paddingTop: 20,
  },
  space: {
    marginBottom: 10,
  },
  smallSpace: {
    marginBottom: 6,
    marginLeft: 8,
  },
  label: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTotal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalAmountContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: theme.colors.divider,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  finalAmount: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 30,
  },
  cancelBtn: {
    width: '45%',
    backgroundColor: theme.colors.warning_red,
    color: theme.colors.background,
  },
  saveBtn: {
    width: '45%',
    backgroundColor: theme.colors.primary,
  },
  cancelContainer: {
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingBottom: 40,
    paddingTop: 20,
    margin: 5,
    alignItems: 'center',
  },
  modalContainer: {
    margin: 0,
  },
  IconBtn: {
    alignSelf: 'center',
  },
  itemDetails: {
    width: '65%',
  },
  modalBtnContainer: {
    marginTop: 30,
  },
  remarksContainer: {
    marginTop: 40,
  },
  deleteBtn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.warning_red,
  },
  confirmBtn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.primary,
  },
});
