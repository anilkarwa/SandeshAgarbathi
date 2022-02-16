import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import CModal from 'react-native-modal';
import {theme} from '../../../config/theme';
import moment from 'moment';
import {useAtom} from 'jotai';
import Toast from 'react-native-toast-message';
import {invoiceCustomer, invoiceItems, userAtom} from '../../../Atoms';
import {
  addNewInvoice,
  getLastInvoiceNumber,
} from '../../../helpers/DataSync/getData';

function FinalInvoice(props) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useAtom(invoiceCustomer);
  const [selectedItems, setSelectedItems] = useAtom(invoiceItems);
  const [currentUser] = useAtom(userAtom);
  const [invoiceDetails, setInvoiceDetails] = useState({
    id: -1,
    invoiceNo: '',
    invoiceDate: new Date(),
    time: moment(new Date()).format('HH:mm'),
    custCode: selectedCustomer.code,
    partyName: selectedCustomer.name,
    addressLine1: selectedCustomer.addressLine1,
    addressLine2: selectedCustomer.addressLine2,
    addressLine3: selectedCustomer.addressLine3,
    addressLine4: selectedCustomer.addressLine4,
    city: selectedCustomer.city,
    state: selectedCustomer.state,
    country: selectedCustomer.country,
    pinCode: selectedCustomer.pincode,
    gstNo: selectedCustomer.gstNo,
    phoneNo: selectedCustomer.phoneNumber || selectedCustomer.mobileNumber,
    addedBy: currentUser.code,
    grossAmt: 0.0,
    cgstAmt: 0.0,
    sgstAmt: 0.0,
    totalAmt: 0.0,
    grandTotolAmt: 0.0,
    roundOff: 0.0,
    discAmt: selectedCustomer.discAmt,
    agent: currentUser.name,
    remarks: '',
    prefix: '',
    isSyned: false,
    items: [],
  });

  useEffect(() => {
    calculateInvoiceAmount();
  }, []);

  const calculateInvoiceAmount = async () => {
    let cgst = 0.0;
    let sgst = 0.0;
    let grossAmt = 0.0;
    let totalAmt = 0.0;
    let roundOff = 0.0;
    let grantTotal = 0.0;
    let totalDisc = 0.0;

    for (let item of selectedItems) {
      let total = 0.0;
      let tempCGST = 0.0;
      let tempSGST = 0.0;
      total = parseFloat(item.netTotal);
      grossAmt += total;
      tempCGST = parseFloat(item.cgstTotal);
      tempSGST = parseFloat(item.sgstTotal);
      cgst += tempCGST;
      sgst += tempSGST;
      totalDisc += parseFloat(item.discAmt);
    }
    totalAmt = parseFloat(parseFloat(grossAmt + cgst + sgst).toFixed(2));
    grantTotal = Math.round(totalAmt);
    roundOff = totalAmt - grantTotal;

    let invoiceNo = await generateInvoiceNumber();

    setInvoiceDetails({
      ...invoiceDetails,
      invoiceNo: invoiceNo,
      grossAmt,
      cgstAmt: cgst,
      sgstAmt: sgst,
      totalAmt: totalAmt,
      discAmt: totalDisc,
      grandTotolAmt: grantTotal,
      roundOff: roundOff,
      prefix: currentUser.prefix,
    });
  };

  const cancelInvoice = () => {
    setSelectedCustomer({});
    setSelectedItems([]);
    props.navigation.navigate('Home');
  };

  const saveInvoice = async () => {
    let tempItems = [];
    let tempInvoice = {...invoiceDetails};
    for (let item of selectedItems) {
      let grossAmt = parseFloat(item.netTotal);
      let netAmt = parseFloat(item.netTotal);
      let cgstAmt = parseFloat(netAmt * item.cgst) / 100;
      let sgstAmt = parseFloat(netAmt * item.sgst) / 100;
      let totalAmt = parseFloat(
        parseFloat(netAmt + cgstAmt + sgstAmt).toFixed(2),
      );

      let obj = {
        itemId: item.id,
        itemName: item.name,
        UOMID: item.UOMID,
        HSNCode: item.HSNCode,
        qty: parseInt(item.quantity, 10),
        rate: item.rate,
        grossAmt: grossAmt,
        disPer: item.discPer,
        disAmt: item.discAmt,
        netAmt: netAmt,
        cgstPer: item.cgst,
        cgstAmt: cgstAmt,
        sgstPer: item.sgst,
        sgstAmt: sgstAmt,
        totalAmt: totalAmt,
      };
      tempItems.push(obj);
    }
    tempInvoice.items = tempItems;
    let result = await addNewInvoice(tempInvoice);
    if (result) {
      setSelectedCustomer({});
      setSelectedItems([]);
      Toast.show({
        text1: 'Invoice Saved',
        text2: 'New invoice save successfully',
        type: 'success',
        position: 'bottom',
      });
      setShowConfirmModal(false);
      props.navigation.navigate('Home');
    } else {
      setShowConfirmModal(false);
      Toast.show({
        text1: 'Error',
        text2: 'Error Saving Invoice',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const generateInvoiceNumber = async () => {
    try {
      const result = await getLastInvoiceNumber(currentUser.prefix);
      const invoicePrefixConst = '0000000';
      const invoiceNumberParts = {};
      let finalInvoiceNumber = '';
      const currentYear = moment().month('April').startOf('month').format('YY');
      if (result && result.status) {
        invoiceNumberParts.year = result.data.slice(0, 2);
        invoiceNumberParts.currentNumber = result.data.slice(
          5,
          result.data.length,
        );
      } else {
        invoiceNumberParts.year = currentYear;
        invoiceNumberParts.currentNumber = '0000000';
      }
      if (parseInt(currentYear, 10) > parseInt(invoiceNumberParts.year, 10)) {
        invoiceNumberParts.year = currentYear;
        invoiceNumberParts.currentNumber = '0000000';
      }
      const incrementedValue =
        parseInt(invoiceNumberParts.currentNumber, 10) + 1;
      const valueLength = incrementedValue.toString().length;
      const paddingLength = 7 - valueLength;

      finalInvoiceNumber = `${invoiceNumberParts.year}${
        currentUser.prefix
      }${invoicePrefixConst.slice(0, paddingLength)}${incrementedValue}`;
      return finalInvoiceNumber;
    } catch (error) {
      console.log('eror=>', error);
    }
  };

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
          {moment(invoiceDetails.invoiceDate).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.label, styles.space]}>
          {invoiceDetails.partyName}
        </Text>
        <Text style={styles.smallSpace}>
         {invoiceDetails.addressLine1} {invoiceDetails.addressLine2}{' '}
          {invoiceDetails.addressLine3} {invoiceDetails.addressLine4} {invoiceDetails.city}{' - '}
          {invoiceDetails.pinCode}
        </Text>
        <Text style={[styles.smallSpace, {fontWeight: '700'}]}>
          Mobile No: {invoiceDetails.mobileNumber || selectedCustomer.phoneNumber}
        </Text>
        <Text style={[styles.smallSpace]}>Email: {selectedCustomer.email}</Text>
        <Text style={[styles.smallSpace, {fontWeight: '700'}]}>GST: {selectedCustomer.gstNo}</Text>
       
      </View>
      {selectedItems.map((item, index) => (
        <View style={[styles.section, styles.itemContainer]} key={item._id}>
          <View style={styles.itemDetails}>
            <Text numberOfLines={1} style={[styles.label, styles.space]}>
              {index + 1}). {item.name}
            </Text>
            <Text style={styles.smallSpace}>Qty: {item.quantity}</Text>
            <Text style={styles.smallSpace}>
              Rate: {parseFloat(item.rate).toFixed(2)}
            </Text>
            <Text style={styles.smallSpace}>
              Disc: {parseFloat(item.discPer).toFixed(1)}%  {parseFloat(item.discAmt).toFixed(2)}
            </Text>
            <Text style={styles.smallSpace}>
              CGST: {parseFloat(item.cgst).toFixed(1)}%  {parseFloat(item.cgstTotal).toFixed(2)}
            </Text>
            <Text style={styles.smallSpace}>
              SGST: {parseFloat(item.sgst).toFixed(1)}%  {parseFloat(item.sgstTotal).toFixed(2)}
            </Text>
          </View>
          <View style={styles.itemTotal}>
            <Text>
              Total: {parseFloat(item.netTotal).toFixed(2)}
            </Text>
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
          Grand Total: {parseFloat(invoiceDetails.grandTotolAmt).toFixed(2)}
        </Text>
      </View>
      <View style={styles.remarksContainer}>
        <TextInput
          mode="outlined"
          label="Remark"
          returnKeyType="done"
          onChangeText={(val) =>
            setInvoiceDetails({
              ...invoiceDetails,
              remarks: val,
            })
          }
          value={invoiceDetails.remarks}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => setShowCancelModal(true)}
          style={styles.cancelBtn}
          mode="contained">
          Cancel
        </Button>
        <Button
          onPress={() => setShowConfirmModal(true)}
          style={styles.saveBtn}
          mode="contained">
          Save
        </Button>
      </View>
      <CModal
        style={styles.modalContainer}
        hideModalContentWhileAnimating={true}
        isVisible={showCancelModal}
        animationIn="fadeInRightBig"
        animationOut="fadeOutRightBig"
        animationInTiming={100}
        animationOutTiming={100}
        useNativeDriver
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        onBackdropPress={() => setShowCancelModal(false)}>
        <View style={styles.cancelContainer}>
          <IconButton
            style={styles.IconBtn}
            icon="close"
            color={theme.colors.warning_red}
            size={30}
          />
          <Text>Are you sure you want to cancel ?</Text>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.deleteBtn}
              mode="contained"
              onPress={cancelInvoice}>
              Ok
            </Button>
          </View>
        </View>
      </CModal>
      <CModal
        style={styles.modalContainer}
        hideModalContentWhileAnimating={true}
        animationIn="fadeInRightBig"
        animationOut="fadeOutRightBig"
        animationInTiming={100}
        animationOutTiming={100}
        useNativeDriver
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        isVisible={showConfirmModal}
        onBackdropPress={() => setShowConfirmModal(false)}>
        <View style={styles.cancelContainer}>
          <IconButton
            style={styles.IconBtn}
            icon="check-decagram"
            color={theme.colors.success}
            size={30}
          />
          <Text>Are you sure you save invoice ?</Text>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.confirmBtn}
              mode="contained"
              onPress={saveInvoice}>
              Yes
            </Button>
          </View>
        </View>
      </CModal>
    </ScrollView>
  );
}
export default FinalInvoice;

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
