import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import CModal from 'react-native-modal';
import {theme} from '../../../config/theme';
import {useAtom} from 'jotai';
import {invoiceItems} from '../../../Atoms';
import ItemDetail from './SelectedItemDetails';
import commonStyles from '../../../assets/styles/common';

function ItemList({navigation}) {
  const [selectedItems, setSelectedItems] = useAtom(invoiceItems);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [disc, setDisc] = useState('');
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});

  const retrieveDataOnScroll = () => {};

  const editItem = (item) => {
    setCurrentSelectedItem(item);
    setDisc(item.discPer)
    setQuantity(item.quantity);
    setShowQuantityModal(true);
  };

  const deleteItem = (item) => {
    setCurrentSelectedItem(item);
    setShowDeleteModal(true);
  };

  const deleteSelectedItem = () => {
    setSelectedItems(
      selectedItems.filter((e) => e.id !== currentSelectedItem.id),
    );
    setShowDeleteModal(false);
  };

  const updateItemQuantity = () => {
    let netTotal = parseFloat(quantity * currentSelectedItem.rate).toFixed(2);
    let discAmt = (parseFloat(netTotal) * disc) / 100;
    netTotal = parseFloat(parseFloat(netTotal) - discAmt).toFixed(2);
    let cgstTotal = parseFloat(
      (netTotal * currentSelectedItem.cgst) / 100,
    ).toFixed(2);
    let sgstTotal = parseFloat(
      (netTotal * currentSelectedItem.sgst) / 100,
    ).toFixed(2);
    

    const currentItem = {
      ...currentSelectedItem,
      quantity: quantity,
      netTotal,
      cgstTotal,
      sgstTotal,
      discPer: parseFloat(parseFloat(disc).toFixed(2)),
      discAmt,
      itemTotal: parseFloat(
        parseFloat(netTotal) + parseFloat(cgstTotal) + parseFloat(sgstTotal),
      ).toFixed(2),
    };

    let index = selectedItems.findIndex((e) => e.id === currentItem.id);
    if (index > -1) {
      selectedItems[index] = currentItem;
      setSelectedItems([...selectedItems]);
      setShowQuantityModal(false);
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyList}>
      <Text>No Items(s) Selected</Text>
    </View>
  );

  return (
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
        ListEmptyComponent={renderEmptyComponent}
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
      {selectedItems.length === 0 ? null : (
        <View style={styles.footer}>
          <Button
            style={styles.nextBtn}
            mode="contained"
            onPress={() => navigation.navigate('FinalInvoice')}>
            Continue
          </Button>
        </View>
      )}
      {/* <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('ItemSelection')}
      /> */}
      <CModal
        style={styles.modalContainer}
        isVisible={showQuantityModal}
        useNativeDriver
        onBackdropPress={() => setShowQuantityModal(false)}
        hasBackdrop>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityHeading}>Enter item quantity</Text>
          <View style={commonStyles.elementBox}>
            <Text style={commonStyles.label}>Quantity *</Text>
            <TextInput
              style={commonStyles.textInput}
              placeholder="Enter quantity"
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={(val) => setQuantity(val)}
              value={quantity.toString()}
            />
            <Text style={commonStyles.label}>Disc% *</Text>
            <TextInput
              style={commonStyles.textInput}
              placeholder="Enter Disc%"
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={(val) => setDisc(val)}
              value={disc.toString()}
              onSubmitEditing={updateItemQuantity}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              style={styles.nextBtn}
              mode="contained"
              disabled={
                currentSelectedItem.quantity < 1 ||
                isNaN(currentSelectedItem.quantity)
              }
              onPress={updateItemQuantity}>
              ok
            </Button>
          </View>
        </View>
      </CModal>

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
              onPress={deleteSelectedItem}>
              Delete
            </Button>
          </View>
        </View>
      </CModal>
    </View>
  );
}
export default React.memo(ItemList);

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
});
