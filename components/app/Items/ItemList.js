import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {
  Button,
  Modal as PaperModal,
  TextInput as PaperTextInput,
  Text,
  IconButton,
} from 'react-native-paper';
import {theme} from '../../../config/theme';
import ItemDetail from './SelectedItemDetails';
import {FAB} from 'react-native-paper';
import {CustomerListLoader} from '../../../content-loaders/CustomerList';
import ItemSelectionModal from './ItemSelectionModal';
import commonStyles from '../../../assets/styles/common';

function ItemList({navigation}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});

  const retrieveDataOnScroll = () => {};

  const handleItemModalClose = items => {
    setSelectedItems(items);
    setOpenItemModal(false);
  };

  const editItem = item => {
    setCurrentSelectedItem(item);
    setShowQuantityModal(true);
    setQuantity(currentSelectedItem.quantity);
  };

  const deleteItem = item => {
    setCurrentSelectedItem(item);
    setShowDeleteModal(true);
  };

  const deleteSelectedItem = () => {
    setSelectedItems(
      selectedItems.filter(e => e.id !== currentSelectedItem.id),
    );
    setShowDeleteModal(false);
  };

  const updateItemQuantity = () => {
    let currentItem = {...currentSelectedItem, quantity: quantity};
    let index = selectedItems.findIndex(e => e.id === currentItem.id);
    if (index > -1) {
      selectedItems[index] = currentItem;
      setSelectedItems([...selectedItems]);
      setShowQuantityModal(false);
    }
  };

  return (
    <>
      {selectedItems === 0 ? (
        <CustomerListLoader />
      ) : (
        <View style={styles.container}>
          <FlatList
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'interactive'}
            data={selectedItems}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={retrieveDataOnScroll}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <>
                <ItemDetail
                  item={item}
                  editItem={editItem}
                  deleteItem={deleteItem}
                />
              </>
            )}
          />
          {Object.keys(selectedItems).length === 0 ? null : (
            <View style={styles.footer}>
              <Button
                style={styles.nextBtn}
                mode="contained"
                onPress={() => navigation.navigate('FinalInvoice')}>
                Continue
              </Button>
            </View>
          )}
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setOpenItemModal(true)}
          />
          <ItemSelectionModal
            open={openItemModal}
            selectedItems={selectedItems}
            handleClose={handleItemModalClose}
          />
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
                  onPress={updateItemQuantity}>
                  ok
                </Button>
              </View>
            </View>
          </PaperModal>
          <PaperModal
            visible={showDeleteModal}
            onDismiss={() => setShowDeleteModal(false)}
            contentContainerStyle={styles.quantityContainer}>
            <View>
              <IconButton
                style={{alignSelf: 'center'}}
                icon="delete-circle-outline"
                color={theme.colors.warning_red}
                size={30}
              />
              <Text>Are you sure you want to delete this item?</Text>
              <View style={styles.btnContainer}>
                <Button
                  style={styles.deleteBtn}
                  mode="contained"
                  onPress={deleteSelectedItem}>
                  Delete
                </Button>
              </View>
            </View>
          </PaperModal>
        </View>
      )}
    </>
  );
}
export default ItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
  deleteBtn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.warning_red,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  quantityContainer: {
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingBottom: 40,
    paddingTop: 20,
    margin: 5,
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 30,
  },
});
