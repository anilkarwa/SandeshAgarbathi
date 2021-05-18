import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Divider,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export const DrawerContent = props => {
  const {navigate} = useNavigation();
  const [user, setUser] = useState({});
  const [userProfile, SetUserProfile] = useState(
    require('../assets/images/user.png'),
  );

  return (
    <>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <TouchableOpacity
                style={{marginLeft: 12, marginTop: 8}}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    alignItems: 'center',
                  }}>
                  <Avatar.Image source={userProfile} size={50} />
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: 'column',
                      width: 180,
                    }}>
                    <Title numberOfLines={1} style={styles.title}>
                      {user.name}
                    </Title>
                    <Caption numberOfLines={1} style={styles.caption}>
                      {user.email}
                    </Caption>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.navigate('Home');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="account-star-outline" color={color} size={size} />
                )}
                label="Customers"
                onPress={() => {
                  props.navigation.navigate('Customer');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="playlist-check" color={color} size={size} />
                )}
                label="Invoices"
                onPress={() => {
                  props.navigation.navigate('Invoices');
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: -5,
    height: 150,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontFamily: 'Khula-Bold',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#D7DBDD',
    fontFamily: 'Roboto-Light',
  },
  row: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 5,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
