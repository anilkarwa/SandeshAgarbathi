/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
} from 'react-native';
import debounce from 'lodash.debounce';
import CModal from 'react-native-modal';
import {Button, FAB, IconButton} from 'react-native-paper';
import {theme} from '../../../config/theme';
import {useAtom} from 'jotai';
import {invoiceCustomer} from '../../../Atoms';
import Toast from 'react-native-toast-message';
import CustomerItem from './CustomerItems';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomerListLoader} from '../../../content-loaders/CustomerList';
import {
  getCustomerList,
  updateCustomer,
} from '../../../helpers/DataSync/getData';

function CustomerList({navigation, route}) {
  const isSettings = route.params;
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemLimit] = useState(25);
  const [lastVisiable, setLastVisiable] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useAtom(invoiceCustomer);
  const [isFetching, setIsFetching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (searchText === '') {
      loadInitialData(false);
    } else {
      loadInitialData(true);
    }
  }, [searchText]);

  const getCustomers = async (lVisible, searchVal = '') => {
    let result = await getCustomerList(lVisible, itemLimit, searchVal);
    setLoading(false);
    setRefreshing(false);
    setIsFetching(false);
    if (result && result.status) {
      let tempCustomers = lVisible === 0 ? [] : customers;
      setCustomerCount(result?.data?.count);

      setCustomers([...tempCustomers, ...result?.data?.rows]);
    } else {
      Toast.show({
        text2: 'Error loading customers',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const loadInitialData = async (isSearch) => {
    if (!isSearch) {
      setCustomerCount(0);
    }
    setCustomers([]);
    setLastVisiable(0);
    setLoading(true);
    getCustomers(0, searchText);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLastVisiable(0);
    setCustomerCount(0);
    setCustomers([]);
    setLoading(true);
    setSelectedCustomer({});
    setSearchText('');
    setIsFetching(false);
    getCustomers(0);
  }, [refreshing]);

  const renderFooter = () => {
    try {
      // Check If Loading
      if (isFetching) {
        return <ActivityIndicator color={'#2196f3'} size="large" />;
      } else {
        return <View style={styles.emptyFooter} />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveDataOnScroll = () => {
    if (!loading && !isFetching) {
      let lastVisiableItems = lastVisiable + itemLimit;
      setLastVisiable(lastVisiableItems);
      if (lastVisiableItems < customerCount) {
        setIsFetching(true);
        getCustomers(lastVisiableItems, searchText);
      }
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyList}>
      <Text>No Customer(s) found</Text>
    </View>
  );

  const onCustomerSelect = (item) => {
    setSelectedCustomer(item);
  };

  const debounceData = React.useMemo(() => debounce(setSearchText, 1000), []);

  const setSearchData = (text) => {
    setSearch(text);
    debounceData(text);
  };

  const updateSelectedCustomer = async (customer) => {
    let result = await updateCustomer({...customer, isUpdated: true});
    if (result) {
      Toast.show({
        text2: 'Updated customer successfully',
        type: 'success',
        position: 'bottom',
      });
    } else {
      Toast.show({
        text2: 'Error updating customers',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const openDeleteConfirmation = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const deleteSelectedCutomer = async () => {
    setCustomers(customers.filter((e) => e._id !== selectedCustomer._id));
    let result = await updateCustomer({...selectedCustomer, isDeleted: true});
    if (result) {
      setShowDeleteModal(false);
      Toast.show({
        text2: 'Deleted customer successfully',
        type: 'success',
        position: 'bottom',
      });
    } else {
      Toast.show({
        text2: 'Error deleting customers',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  return (
    <>
      {loading && customerCount === 0 ? (
        <CustomerListLoader />
      ) : (
        <View style={styles.container}>
          <View
            style={
              Platform.OS === 'android' ? styles.searchBox : styles.searchBoxIos
            }>
            <TouchableOpacity style={styles.searchBar}>
              <Icons
                name={'magnify'}
                size={16}
                color={theme.colors.placeholder}
              />
              <TextInput
                style={styles.inputText}
                value={search}
                onChangeText={(text) => setSearchData(text)}
                placeholder={'search customers'}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'interactive'}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={customers}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={retrieveDataOnScroll}
            onEndReachedThreshold={0.1}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
            renderItem={({item, index}) => (
              <CustomerItem
                parentNavigation={navigation}
                item={item}
                isSettings={isSettings}
                onCustomerSelect={onCustomerSelect}
                selectedCustomer={selectedCustomer}
                updateCustomer={updateSelectedCustomer}
                deleteCustomer={openDeleteConfirmation}
                refreshList={() => onRefresh()}
              />
            )}
          />
          {isSettings || Object.keys(selectedCustomer).length === 0 ? null : (
            <View style={styles.footer}>
              <Button
                style={styles.nextBtn}
                mode="contained"
                onPress={() => {
                  navigation.navigate('ItemSelection');
                }}>
                Continue
              </Button>
            </View>
          )}
          {isSettings && (
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() =>
                navigation.navigate('AddCustomer', {
                  refreshList: () => onRefresh(),
                })
              }
            />
          )}
          <CModal
            style={styles.modalContainer}
            isVisible={showDeleteModal}
            useNativeDriver={true}
            onBackdropPress={() => setShowDeleteModal(false)}
            hasBackdrop>
            <View style={styles.quantityContainer}>
              <IconButton
                style={styles.centerItems}
                icon="delete-circle-outline"
                color={theme.colors.warning_red}
                size={30}
              />
              <Text style={styles.centerItems}>
                Are you sure you want to delete this item?
              </Text>
              <View style={styles.btnContainer}>
                <Button
                  style={styles.deleteBtn}
                  mode="contained"
                  onPress={deleteSelectedCutomer}>
                  Delete
                </Button>
              </View>
            </View>
          </CModal>
        </View>
      )}
    </>
  );
}
export default CustomerList;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    shadowColor: '#D7DBDD',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
    elevation: 0.3,
  },
  searchBar: {
    marginBottom: 10,
    height: 40,
    width: '90%',
    borderRadius: 30,
    paddingLeft: 10,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
    elevation: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    marginLeft: 10,
    marginRight: 30,
    width: '100%',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  footer: {
    position: 'absolute',
    top: height - 200,
    elevation: 4,
    backgroundColor: theme.colors.background,
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.primary,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  modalContainer: {
    margin: 0,
  },
  centerItems: {
    alignSelf: 'center',
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  emptyFooter: {
    height: 40,
  },
  quantityContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
    padding: 10,
    paddingBottom: 40,
    paddingTop: 20,
    margin: 5,
  },
  deleteBtn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.warning_red,
  },
});
