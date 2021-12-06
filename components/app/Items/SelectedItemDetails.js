import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {theme} from '../../../config/theme';

function SelectedItems(props) {
  const {item, selected} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.details}
        onPress={() => props.onItemClick(item)}>
        <View style={styles.infoContainer}>
          <View>
            <Text numberOfLines={1} style={[styles.name]}>
              {item.name}
            </Text>
          </View>
          <View style={styles.otherDetailsFlex}>
            <Text numberOfLines={1} style={styles.otherDetails}>
              Rate: {parseFloat(item.rate).toFixed(2)}
            </Text>
            <Text numberOfLines={1} style={styles.otherDetails}>
              Tax:{' '}
              {parseFloat(
                parseFloat(item.cgstTotal) + parseFloat(item.sgstTotal),
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.otherDetailsFlex}>
            <Text numberOfLines={1} style={styles.otherDetails}>
              Qty: {item.quantity}
            </Text>
            <Text numberOfLines={1} style={styles.otherDetails}>
              Total: {item.itemTotal}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <IconButton
            icon="circle-edit-outline"
            color={theme.colors.primary}
            size={26}
            onPress={() => props.editItem(item)}
          />

          <IconButton
            icon="delete-circle-outline"
            color={theme.colors.warning_red}
            size={26}
            onPress={() => props.deleteItem(item)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default SelectedItems;

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
  details: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selected: {
    backgroundColor: theme.colors.primaryLight,
  },
  infoContainer: {
    width: '65%',
  },
  name: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: theme.fonts.medium.fontFamily,
    fontWeight: theme.fonts.medium.fontWeight,
  },
  otherDetailsFlex: {
    marginLeft: 10,
    marginTop: 8,
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otherDetails: {
    fontSize: 14,
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
  },
  actions: {
    marginLeft: 5,
    flexDirection: 'row',
  },
});
