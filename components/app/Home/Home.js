import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FAB, Button, IconButton} from 'react-native-paper';
import {theme} from '../../../config/theme';
import {useAtom} from 'jotai';
import {invoiceCustomer, invoiceItems, userAtom} from '../../../Atoms';
import Toast from 'react-native-toast-message';
import SyncDataModal from '../SyncData/SyncDataModal';
import {
  getCustomersCount,
  getUnsyncedData,
} from '../../../helpers/DataSync/getData';

export const Home = ({navigation}) => {
  const [openSyncModal, setOpenSyncModal] = useState(false);
  const [, setSelectedCustomer] = useAtom(invoiceCustomer);
  const [, setSelectedItems] = useAtom(invoiceItems);
  const [currentUser] = useAtom(userAtom);
  const [unSyncedStats, setUnSyncedStats] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      getUnSyncedDetails();
    }, [openSyncModal]),
  );

  const getUnSyncedDetails = async () => {
    let result = await getUnsyncedData();
    if (result && result.status) {
      setUnSyncedStats(result.data);
    }
  };

  const handleInvoiceCreate = async () => {
    const result = await getCustomersCount();
    if (result && result.status && result.count > 0) {
      setSelectedCustomer({});
      setSelectedItems([]);
      navigation.navigate('Customer');
    } else {
      Toast.show({
        text1: 'Data not synced',
        text2: 'Please sync data to continue!',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  return (
    <ScrollView
      style={styles.constainer}
      keyboardShouldPersistTaps={'always'}
      keyboardDismissMode={'interactive'}>
      <View style={styles.header}>
        <IconButton
          style={styles.menuBtn}
          icon="menu"
          size={30}
          onPress={() => navigation.toggleDrawer()}
        />
        <Button
          style={styles.synBtn}
          icon="cloud-sync"
          mode="contained"
          onPress={() => setOpenSyncModal(true)}>
          Sync Data
        </Button>
      </View>
      <Text style={styles.heading}>Welcome,</Text>
      <Text style={styles.name}>{currentUser.name}</Text>
      <View style={styles.smallCardContainer}>
        <View style={styles.smallCards}>
          <Text style={styles.numberText}>{unSyncedStats.customer}</Text>
          <Text style={styles.cardText}>Unsynced Customer</Text>
        </View>
        <View style={styles.smallCards}>
          <Text style={styles.numberText}>{unSyncedStats.invoice}</Text>
          <Text style={styles.cardText}>Unsynced Invoice</Text>
        </View>
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Create Invoice"
        onPress={handleInvoiceCreate}
      />
      <View style={styles.infoBox}>
        <Text style={styles.info}>
          Create new invoice by selecting customer and items, once done email
          will be sent to the customer over his/her email.
        </Text>
      </View>
      <SyncDataModal
        open={openSyncModal}
        handleClose={() => setOpenSyncModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
    fontSize: 30,
    color: theme.colors.placeholder,
  },
  name: {
    fontFamily: theme.fonts.regular.fontFamily,
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 100,
  },
  smallCards: {
    fontSize: 14,
    width: 130,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  synBtn: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 30,
  },
  menuBtn: {
    marginLeft: -10,
  },
});
