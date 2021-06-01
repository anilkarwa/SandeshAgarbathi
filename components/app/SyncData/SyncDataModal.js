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
  getAllItems,
  getAllCustomerGroups,
} from '../../../helpers/DataSync/getData';
import {useNetInfo} from '@react-native-community/netinfo';

function SyncDataModal(props) {
  const netInfo = useNetInfo();
  const [customerFetchStatus, setCustomerFetchStatus] = useState('pending');
  const [itemFetchStatus, setItemFetchStatus] = useState('pending');
  const [customerGroupFetchStatus, setCustomerGroupFetchStatus] =
    useState('pending');

  useEffect(() => {
    if (props.open) {
      startSyncProcess();
    }
  }, [props.open]);

  const startSyncProcess = async () => {
    if (!netInfo.isConnected) {
      Toast.show({
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
  };

  const SyncCustomer = async () => {
    setCustomerFetchStatus('loading');
    let output = await getAllCustomers();
    if (output) {
      setCustomerFetchStatus('success');
    } else {
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
