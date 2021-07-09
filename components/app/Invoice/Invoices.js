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
} from 'react-native';
import debounce from 'lodash.debounce';
import Toast from 'react-native-toast-message';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import InvoiceItem from './InvoiceItem';
import {CustomerListLoader} from '../../../content-loaders/CustomerList';
import {getinvoiceList} from '../../../helpers/DataSync/getData';
import {theme} from '../../../config/theme';

function Invoices(props) {
  const {navigation} = props;
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemLimit] = useState(25);
  const [lastVisiable, setLastVisiable] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (searchText === '') {
      loadInitialData(false);
    } else {
      loadInitialData(true);
    }
  }, [searchText]);

  const getInvoices = async (lVisible, searchVal = '') => {
    let result = await getinvoiceList(lVisible, itemLimit, searchVal);
    setLoading(false);
    setRefreshing(false);
    setIsFetching(false);
    if (result && result.status) {
      let tempInvoices = lVisible === 0 ? [] : invoiceList;
      setInvoiceCount(result?.data?.count);

      setInvoiceList([...tempInvoices, ...result?.data?.rows]);
    } else {
      Toast.show({
        text1: 'Error',
        text2: 'Error loading invoices',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const loadInitialData = async (isSearch) => {
    if (!isSearch) {
      setInvoiceCount(0);
    }
    setInvoiceList([]);
    setLastVisiable(0);
    setLoading(true);
    getInvoices(0, searchText);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLastVisiable(0);
    setInvoiceCount(0);
    setInvoiceList([]);
    setLoading(true);
    setSearchText('');
    setIsFetching(false);
    getInvoices(0);
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
      if (lastVisiableItems < invoiceCount) {
        setIsFetching(true);
        getInvoices(lastVisiableItems, searchText);
      }
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyList}>
      <Text>No Customer(s) found</Text>
    </View>
  );

  const debounceData = React.useMemo(() => debounce(setSearchText, 1000), []);

  const setSearchData = (text) => {
    setSearch(text);
    debounceData(text);
  };

  return (
    <>
      {loading && invoiceCount === 0 ? (
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
                value={search}
                onChangeText={(text) => setSearchData(text)}
                placeholder={'search invoice'}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'interactive'}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={invoiceList}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={retrieveDataOnScroll}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={renderEmptyComponent}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <>
                <InvoiceItem item={item} />
              </>
            )}
          />
        </View>
      )}
    </>
  );
}

export default Invoices;

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
  emptyFooter: {
    marginTop: 50,
  },
});
