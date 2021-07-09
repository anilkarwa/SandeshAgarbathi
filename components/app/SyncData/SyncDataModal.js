/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../config/theme';
import {
  getAllCustomers,
  getUnSyncedCustomers,
  getUpdatedCustomers,
  getDeletedCustomers,
  getAllItems,
  getAllCustomerGroups,
  getAllInvoice,
  updateInvoiceCustomerData,
  getUnSyncedInvoice,
} from '../../../helpers/DataSync/getData';
import {useAtom} from 'jotai';
import {userAtom} from '../../../Atoms';
import {useNetInfo} from '@react-native-community/netinfo';

function SyncDataModal(props) {
  const netInfo = useNetInfo();
  const [currentUser] = useAtom(userAtom);
  const [customerFetchStatus, setCustomerFetchStatus] = useState('pending');
  const [itemFetchStatus, setItemFetchStatus] = useState('pending');
  const [customerGroupFetchStatus, setCustomerGroupFetchStatus] =
    useState('pending');
  const [invoiceFetchStatus, setInvoiceFetchStatus] = useState('pending');

  useEffect(() => {
    if (props.open) {
      startSyncProcess();
    }
  }, [props.open]);

  const startSyncProcess = async () => {
    try {
      if (!netInfo.isConnected) {
        Toast.show({
          text1: 'Error',
          text2: 'No Internet Connection!',
          type: 'error',
          position: 'bottom',
        });
        props.handleClose();
        return;
      }
      await SyncCustomer();
      await SyncCustomerGroup();
      await SyncItems();
    } catch (error) {
      Toast.show({
        text1: 'Error',
        text2: 'Error in sync process, Try again!',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const SyncCustomer = async () => {
    try {
      setCustomerFetchStatus('loading');
      let newCustomers = await getUnSyncedCustomers();
      if (newCustomers && !newCustomers.status) {
        throw new Error('Error saving new customers');
      }
      let updatedCustomers = await getUpdatedCustomers();
      if (updatedCustomers && !updatedCustomers.status) {
        throw new Error('Error saving updated customers');
      }

      let deletedCustomers = await getDeletedCustomers();
      if (deletedCustomers && !deletedCustomers.status) {
        throw new Error('Error deleting updated customers');
      }

      let loadCustomers = await getAllCustomers();
      if (loadCustomers && !loadCustomers.status) {
        throw new Error('Error loading customers');
      }

      let updateInvoiceCustomers = await updateInvoiceCustomerData();
      if (updateInvoiceCustomers && !updateInvoiceCustomers.status) {
        throw new Error('Error updated invoice customers');
      }

      setCustomerFetchStatus('success');
      await SyncInvoice();
    } catch (error) {
      setCustomerFetchStatus('error');
    }
  };

  const SyncItems = async () => {
    setItemFetchStatus('loading');
    let output = await getAllItems();
    if (output) {
      setItemFetchStatus('success');
    } else {
      setItemFetchStatus('error');
    }
  };

  const SyncCustomerGroup = async () => {
    setCustomerGroupFetchStatus('loading');
    let output = await getAllCustomerGroups();
    if (output) {
      setCustomerGroupFetchStatus('success');
    } else {
      setCustomerGroupFetchStatus('error');
    }
  };

  const SyncInvoice = async () => {
    try {
      setInvoiceFetchStatus('loading');

      let saveResult = await getUnSyncedInvoice();
      if (saveResult && !saveResult.status) {
        throw new Error('Error saving invoices');
      }
      let output = await getAllInvoice({prefix: currentUser.prefix});
      if (output && !output.status) {
        throw new Error('Error getting invoices');
      }

      setInvoiceFetchStatus('success');
    } catch (error) {
      setInvoiceFetchStatus('error');
    }
  };

  const RenderItemIcon = (prop) => {
    const {state} = prop;
    if (state === 'pending') {
      return <Icons name={'help'} size={16} color={theme.colors.placeholder} />;
    }
    if (state === 'success') {
      return (
        <Icons
          name={'check-circle-outline'}
          size={16}
          color={theme.colors.success}
        />
      );
    }
    if (state === 'error') {
      return (
        <Icons name={'close'} size={16} color={theme.colors.warning_red} />
      );
    }
    return (
      <ActivityIndicator
        animating={true}
        size={12}
        color={theme.colors.success}
      />
    );
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={props.open}
          onDismiss={props.handleClose}
          dismissable={false}>
          <Dialog.Title>Sync Progress</Dialog.Title>
          <Dialog.Content>
            <View>
              <View style={styles.itemContainer}>
                <RenderItemIcon state={customerFetchStatus} />
                <View style={styles.syncItem}>
                  <Text>Customers</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <RenderItemIcon state={invoiceFetchStatus} />
                <View style={styles.syncItem}>
                  <Text>Invoices</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <RenderItemIcon state={customerGroupFetchStatus} />
                <View style={styles.syncItem}>
                  <Text>Customer Group</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <RenderItemIcon state={itemFetchStatus} />
                <View style={styles.syncItem}>
                  <Text>Items</Text>
                </View>
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.handleClose}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default SyncDataModal;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  syncItem: {
    marginLeft: 10,
  },
});
