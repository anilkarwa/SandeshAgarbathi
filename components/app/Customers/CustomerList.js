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
} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import {theme} from '../../../config/theme';
import CustomerItem from './CustomerItems';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomerListLoader} from '../../../content-loaders/CustomerList';

function CustomerList({navigation}) {
  const defaultCustomers = [
    {
      name: 'Anil Karwa',
      city: 'Makrana',
      email: 'anilkarwa@gmail.com',
      phoneNumber: '-',
    },
    {
      name: 'Anil Karwa',
      city: 'Makrana',
      email: 'anilkarwa@gmail.com',
      phoneNumber: '-',
    },
    {
      name: 'Anil Karwa',
      city: 'Makrana',
      email: 'anilkarwa@gmail.com',
      phoneNumber: '-',
    },
    {
      name: 'Anil Karwa',
      city: 'Makrana',
      email: 'anilkarwa@gmail.com',
      phoneNumber: '-',
    },
    {
      name: 'Anil Karwa',
      city: 'Makrana',
      email: 'anilkarwa@gmail.com',
      phoneNumber: '-',
    },
    {
      name: 'Anil Karwa',
      city: 'Makrana',
      email: 'anilkarwa@gmail.com',
      phoneNumber: '-',
    },
  ];

  const [customers, setCustomers] = useState(defaultCustomers);
  const [customerCount, setCustomerCount] = useState(6);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemLimit] = useState(25);
  const [lastVisiable, setLastVisiable] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [searchText, setSearchText] = useState('');

  const loadInitialData = isSearch => {
    if (!isSearch) {
      setCustomerCount(0);
    }
    setCustomers([]);
    setLastVisiable(0);
    setLoading(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLastVisiable(0);
    setCustomerCount(0);
    setCustomers([]);
    setLoading(true);
    setSelectedCustomer({});
  }, []);

  const renderFooter = () => {
    try {
      // Check If Loading
      if (customers.status === 'PENDING') {
        return <ActivityIndicator color={'#2196f3'} size="large" />;
      } else {
        return <View style={{height: 40}} />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveDataOnScroll = () => {
    if (!loading) {
      let lastVisiableItems = lastVisiable + itemLimit;
      setLastVisiable(lastVisiableItems);
      if (lastVisiableItems < customerCount) {
        setLoading(true);
      }
    }
  };

  const onCustomerSelect = item => {
    setSelectedCustomer(item);
  };

  return (
    <>
      {customerCount === 0 ? (
        <CustomerListLoader />
      ) : (
        <View>
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
                onChangeText={text => setSearchText(text)}
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
            onEndReachedThreshold={0.3}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <>
                <CustomerItem
                  item={item}
                  onCustomerSelect={onCustomerSelect}
                  selectedCustomer={selectedCustomer}
                />
              </>
            )}
          />
          {Object.keys(selectedCustomer).length === 0 ? null : (
            <View style={styles.footer}>
              <Button
                style={styles.nextBtn}
                mode="contained"
                onPress={() => navigation.navigate('Items')}>
                Continue
              </Button>
            </View>
          )}
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => navigation.navigate('AddCustomer')}
          />
        </View>
      )}
    </>
  );
}
export default CustomerList;

const styles = StyleSheet.create({
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
    bottom: -50,
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
});
