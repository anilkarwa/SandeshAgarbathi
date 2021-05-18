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
import {
  Modal as PaperModal,
  Button,
  TextInput as PaperTextInput,
} from 'react-native-paper';
import CModal from 'react-native-modal';
import {theme} from '../../../config/theme';
import ItemDetail from './ItemDetail';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomerListLoader} from '../../../content-loaders/CustomerList';
import commonStyles from '../../../assets/styles/common';

function ItemSelectionModal(props) {
  const defaultItems = [
    {
      id: 1,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 2,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 3,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 4,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 5,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 6,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 7,
      name: 'Agarbathi',
      price: 300,
    },
    {
      id: 8,
      name: 'Agarbathi',
      price: 300,
    },
  ];

  const [items, setItems] = useState(defaultItems);
  const [itemCount, setItemCount] = useState(6);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemLimit] = useState(25);
  const [lastVisiable, setLastVisiable] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentSelecteItem, setCurrentSelectedItem] = useState({});
  const [searchText, setSearchText] = useState('');
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState('');

  const loadInitialData = isSearch => {
    if (!isSearch) {
      setItemCount(0);
    }
    setItems([]);
    setLastVisiable(0);
    setLoading(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLastVisiable(0);
    setItemCount(0);
    setItems([]);
    setLoading(true);
  }, []);

  const renderFooter = () => {
    try {
      // Check If Loading
      if (items.status === 'PENDING') {
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
      if (lastVisiableItems < itemCount) {
        setLoading(true);
      }
    }
  };

  const onItemClick = item => {
    setCurrentSelectedItem(item);
    setShowQuantityModal(true);
  };

  const saveSelectedItemQuantity = () => {
    const selected = {...currentSelecteItem, quantity: quantity};
    setSelectedItems([...selectedItems, selected]);
    setCurrentSelectedItem({});
    setQuantity('');
    setShowQuantityModal(false);
  };

  useEffect(() => {
    setSelectedItems([...props.selectedItems]);
  }, [props.selectedItems]);

  return (
    <>
      {itemCount === 0 ? (
        <CustomerListLoader />
      ) : (
        <View>
          <CModal
            style={{margin: 0}}
            hideModalContentWhileAnimating={true}
            isVisible={props.open}
            animationIn="fadeInRightBig"
            animationOut="fadeOutRightBig"
            animationInTiming={100}
            animationOutTiming={100}
            coverScreen={true}
            useNativeDriver={true}
            backdropTransitionOutTiming={0}
            hasBackdrop={false}>
            <View style={styles.modalContainer}>
              <View
                style={
                  Platform.OS === 'android'
                    ? styles.searchBox
                    : styles.searchBoxIos
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
                    placeholder={'search items'}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                keyboardShouldPersistTaps={'always'}
                keyboardDismissMode={'interactive'}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={items}
                initialNumToRender={5}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={renderFooter}
                onEndReached={retrieveDataOnScroll}
                onEndReachedThreshold={0.3}
                refreshing={loading}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <ItemDetail
                      item={item}
                      onItemClick={onItemClick}
                      selected={
                        selectedItems.findIndex(e => e.id === item.id) > -1
                      }
                    />
                  );
                }}
              />
              {selectedItems.length === 0 ? null : (
                <View style={styles.footer}>
                  <Button
                    style={styles.nextBtn}
                    mode="contained"
                    onPress={() => props.handleClose(selectedItems)}>
                    Done ({selectedItems.length})
                  </Button>
                </View>
              )}
              <PaperModal
                visible={showQuantityModal}
                onDismiss={() => setShowQuantityModal(false)}
                contentContainerStyle={styles.quantityContainer}>
                <View>
                  <PaperTextInput
                    mode="outlined"
                    style={commonStyles.textField}
                    label="Quantity"
                    keyboardType="number-pad"
                    onChangeText={val => setQuantity(val)}
                    value={quantity.toString()}
                  />
                  <View style={styles.btnContainer}>
                    <Button
                      style={styles.nextBtn}
                      mode="contained"
                      onPress={saveSelectedItemQuantity}>
                      ok
                    </Button>
                  </View>
                </View>
              </PaperModal>
            </View>
          </CModal>
        </View>
      )}
    </>
  );
}
export default ItemSelectionModal;

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    marginTop: 20,
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
    bottom: 0,
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
  modal: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  closeModal: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  quantityContainer: {
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingBottom: 40,
    paddingTop: 20,
    margin: 5,
  },
  btnContainer: {
    marginTop: 30,
  },
});
