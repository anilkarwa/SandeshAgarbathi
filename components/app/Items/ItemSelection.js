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
import {Button} from 'react-native-paper';
import debounce from 'lodash.debounce';
import Toast from 'react-native-toast-message';
import CModal from 'react-native-modal';
import {useAtom} from 'jotai';
import {invoiceItems} from '../../../Atoms';
import {theme} from '../../../config/theme';
import ItemDetail from './ItemDetail';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../../../assets/styles/common';
import {getItemList} from '../../../helpers/DataSync/getData';

function ItemSelection(props) {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemLimit] = useState(25);
  const [lastVisiable, setLastVisiable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useAtom(invoiceItems);
  const [currentSelecteItem, setCurrentSelectedItem] = useState({});
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const quantityRef = React.useRef(null);

  useEffect(() => {
    if (searchText === '') {
      loadInitialData(false);
    } else {
      loadInitialData(true);
    }
  }, [searchText]);

  useEffect(() => {
    if (props?.route?.selectedItems?.length > 0) {
      setSelectedItems(props.route.selectedItems);
    }
  }, [props?.route?.selectedItems]);

  const getItems = async (lVisible, searchVal = '') => {
    let result = await getItemList(lVisible, itemLimit, searchVal);
    if (result && result.status) {
      let tempItems = lVisible === 0 ? [] : items;
      setItemCount(result?.data?.count);
      setItems([...tempItems, ...result?.data?.rows]);
      setLoading(false);
      setRefreshing(false);
      setIsFetching(false);
    } else {
      Toast.show({
        text1: 'Error',
        text2: 'Error loading items',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const loadInitialData = (isSearch) => {
    if (!isSearch) {
      setItemCount(0);
    }
    setItems([]);
    setLastVisiable(0);
    setLoading(true);
    getItems(0, searchText);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLastVisiable(0);
    setItemCount(0);
    setItems([]);
    setLoading(true);
    setSelectedItems([]);
    setCurrentSelectedItem({});
    setSearchText('');
    setIsFetching(false);
    getItems(0);
  }, [refreshing]);

  const renderFooter = () => {
    // Check If Loading
    if (isFetching) {
      return <ActivityIndicator color={'#2196f3'} size="large" />;
    } else {
      return <View style={styles.emptyFooter} />;
    }
  };

  const retrieveDataOnScroll = () => {
    if (!loading) {
      let lastVisiableItems = lastVisiable + itemLimit;
      setLastVisiable(lastVisiableItems);
      if (lastVisiableItems < itemCount) {
        setIsFetching(true);
        getItems(lastVisiableItems, searchText);
      }
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyList}>
      <Text>No Items(s) found</Text>
    </View>
  );

  const onItemClick = (item) => {
    setCurrentSelectedItem(item);
    setShowQuantityModal(true);
    setTimeout(() => {
      quantityRef.current.focus();
    }, 1000);
  };

  const saveSelectedItemQuantity = () => {
    if (quantity !== '' && quantity > 1) {
      const selected = {...currentSelecteItem, quantity: quantity};
      setSelectedItems([...selectedItems, selected]);
      setCurrentSelectedItem({});
      setQuantity('');
      setShowQuantityModal(false);
    }
  };

  const debounceData = React.useMemo(() => debounce(setSearchText, 1000), []);

  const setSearchData = (text) => {
    setSearch(text);
    debounceData(text);
  };

  return (
    <View>
      <View
        style={
          Platform.OS === 'android' ? styles.searchBox : styles.searchBoxIos
        }>
        <TouchableOpacity style={styles.searchBar}>
          <Icons name={'magnify'} size={16} color={theme.colors.placeholder} />
          <TextInput
            style={styles.inputText}
            value={search}
            onChangeText={(text) => setSearchData(text)}
            placeholder={'search items'}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'interactive'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={items}
        initialNumToRender={10}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={retrieveDataOnScroll}
        onEndReachedThreshold={0.3}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ItemDetail
            key={item._id}
            item={item}
            onItemClick={onItemClick}
            selected={selectedItems.findIndex((e) => e.id === item.id) > -1}
          />
        )}
      />
      {selectedItems.length === 0 ? null : (
        <View style={styles.footer}>
          <Button
            style={styles.nextBtn}
            mode="contained"
            onPress={() => props.navigation.navigate('Items')}>
            Done ({selectedItems.length})
          </Button>
        </View>
      )}

      <CModal
        style={styles.modalContainer}
        isVisible={showQuantityModal}
        useNativeDriver={true}
        onBackdropPress={() => setShowQuantityModal(false)}
        hasBackdrop>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityHeading}>Enter item quantity</Text>
          <View style={commonStyles.elementBox}>
            <Text style={commonStyles.label}>Quantity *</Text>
            <TextInput
              ref={quantityRef}
              style={commonStyles.textInput}
              placeholder="Enter quantity"
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={(val) => setQuantity(val)}
              value={quantity.toString()}
              onSubmitEditing={saveSelectedItemQuantity}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              style={styles.nextBtn}
              mode="contained"
              disabled={quantity < 1 || isNaN(quantity)}
              onPress={saveSelectedItemQuantity}>
              ok
            </Button>
          </View>
        </View>
      </CModal>
    </View>
  );
}
export default React.memo(ItemSelection);

const {width, height} = Dimensions.get('screen');

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
    top: height - 200,
    elevation: 1,
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
  modal: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    margin: 0,
  },
  closeModal: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  quantityContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
    padding: 10,
    paddingBottom: 40,
    paddingTop: 20,
    margin: 5,
  },
  quantityHeading: {
    fontSize: 18,
  },
  btnContainer: {
    marginTop: 30,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  emptyFooter: {
    height: 40,
  },
});
