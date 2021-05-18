import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import CModal from 'react-native-modal';
import {theme} from '../../../config/theme';

function FinalInvoice(props) {
  const [remarks, setRemarks] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const cancelInvoice = () => {};
  const saveInvoice = () => {};

  return (
    <ScrollView style={styles.constainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Invoice</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.space}>
          <Text style={styles.label}>Invoice No:</Text> 223423423
        </Text>
        <Text style={styles.space}>
          <Text style={styles.label}>Date:</Text> 17/04/2021 9:00
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.label, styles.space]}>GMS Software Solutions</Text>
        <Text style={styles.smallSpace}>GST: 77DSSDFS890DFD</Text>
        <Text style={styles.smallSpace}>+91 8923423423</Text>
        <Text style={styles.smallSpace}>
          569, 20th Main Road, 2nd Floor, C R complex, Banagirnargar, BSK
        </Text>
      </View>
      <View style={[styles.section, styles.itemContainer]}>
        <View>
          <Text style={[styles.label, styles.space]}>1. Epson Printer</Text>
          <Text style={styles.smallSpace}>Qty: 10</Text>
          <Text style={styles.smallSpace}>Rate: 1000</Text>
        </View>
        <View style={styles.itemTotal}>
          <Text>Total: 10,000</Text>
        </View>
      </View>
      <View style={styles.finalAmountContainer}>
        <Text style={styles.finalAmount}>Total Amount: 10,000</Text>
      </View>
      <View style={{marginTop: 40}}>
        <TextInput
          mode="outlined"
          label="Remark"
          multiline
          onChangeText={val => setRemarks(val)}
          value={remarks}
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
        style={{margin: 0}}
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
            style={{alignSelf: 'center'}}
            icon="close"
            color={theme.colors.warning_red}
            size={30}
          />
          <Text>Are you sure you want to cancel ?</Text>
          <View style={styles.modalBtnContainer}>
            <Button style={styles.deleteBtn} mode="contained">
              Ok
            </Button>
          </View>
        </View>
      </CModal>
      <CModal
        style={{margin: 0}}
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
            style={{alignSelf: 'center'}}
            icon="check-decagram"
            color={theme.colors.success}
            size={30}
          />
          <Text>Are you sure you save invoice ?</Text>
          <View style={styles.modalBtnContainer}>
            <Button style={styles.confirmBtn} mode="contained">
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
    flexDirection: 'row',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: theme.colors.divider,
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
  modalBtnContainer: {
    marginTop: 30,
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
