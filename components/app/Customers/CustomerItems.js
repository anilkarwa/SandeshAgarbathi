import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {isEqual} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {Avatar, IconButton} from 'react-native-paper';
import {theme} from '../../../config/theme';

function CustomerItems(props) {
  const navigation = useNavigation();
  const {item, onCustomerSelect} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.info,
          item.selected && !props.isSettings === true ? styles.selected : null,
        ]}
        onPress={() => {
          if (!props.isSettings) {
            onCustomerSelect(item);
            item.selected = !item.selected;
          }
        }}>
        <View style={styles.infoFlex}>
          <View>
            <Avatar.Image
              size={40}
              source={require('../../../assets/images/user.png')}
            />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
            </View>
            <View style={styles.otherDetailsFlex}>
              <Text numberOfLines={1} style={styles.otherDetails}>
                {item.email}
              </Text>
              <Text numberOfLines={1} style={styles.otherDetails}>
                {item.city === '-' ? '' : item.city}
              </Text>
            </View>
          </View>
        </View>
        {props.isSettings ? (
          <View style={styles.actions}>
            <IconButton
              icon="circle-edit-outline"
              color={theme.colors.primary}
              size={24}
              style={styles.actionBtn}
              onPress={() =>
                props.parentNavigation.navigate('AddCustomer', {
                  customer: item,
                  updateCustomer: props.updateCustomer,
                  refreshList: props.refreshList,
                })
              }
            />

            <IconButton
              style={styles.actionBtn}
              icon="delete-circle-outline"
              color={theme.colors.warning_red}
              size={26}
              onPress={() => props.deleteCustomer(item)}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(CustomerItems, shouldComponentUpdate);

const shouldComponentUpdate = (preveProps, nextProps) => {
  return isEqual(preveProps.item, nextProps.item);
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1,
  },
  info: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
  },
  infoFlex: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: theme.colors.primaryLight,
  },
  infoContainer: {
    maxWidth: Dimensions.get('window').width - 110,
  },
  name: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: theme.fonts.medium.fontFamily,
    fontWeight: theme.fonts.medium.fontWeight,
  },
  otherDetailsFlex: {
    marginLeft: 20,
    fontSize: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otherDetails: {
    fontSize: 12,
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 25,
    marginRight: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#D5D8DC',
  },
  actionBtn: {
    padding: 0,
    margin: 0,
    marginTop: 3,
  },
});
