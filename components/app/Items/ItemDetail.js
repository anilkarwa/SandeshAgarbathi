import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {theme} from '../../../config/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function CustomerItems(props) {
  const {item, selected} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.details]}
        onPress={() => props.onItemClick(item)}>
        <View>
          <Avatar.Image
            size={50}
            source={require('../../../assets/images/user.png')}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
          <View style={styles.otherDetailsFlex}>
            <Text numberOfLines={1} style={styles.otherDetails}>
              {item.price}
            </Text>
          </View>
        </View>
        {selected ? (
          <View style={styles.checkIcon}>
            <Icons
              name={'check-circle-outline'}
              size={22}
              color={theme.colors.success}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

export default CustomerItems;

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
  },
  selected: {
    backgroundColor: theme.colors.primaryLight,
  },
  infoContainer: {
    width: '100%',
    maxWidth: Dimensions.get('window').width - 110,
  },
  name: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 16,
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
    fontSize: 14,
    fontFamily: theme.fonts.regular.fontFamily,
    fontWeight: theme.fonts.regular.fontWeight,
  },
  checkIcon: {},
});
