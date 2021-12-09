/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Divider,
} from 'react-native-paper';
import moment from 'moment';
import {theme} from '../config/theme';
import {useAtom} from 'jotai';
import {userAtom} from '../Atoms';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCompanyData} from '../helpers/DataSync/getData';
import { useFocusEffect } from '@react-navigation/native';

export const DrawerContent = (props) => {
  const {navigate} = useNavigation();
  const [user] = useAtom(userAtom);
  const [company, setCompany] = useState({});
  const [userProfile] = useState(require('../assets/images/user.png'));

  const logoutUser = async () => {
    let keys = ['@USER_AUTH_TOKEN', '@USER'];
    await AsyncStorage.multiRemove(keys, (err) => {
      console.log('errr', err);
    });
    navigate('AuthStack');
  };

  const getCompanyInfo = async () => {
    try{
      let result = await getCompanyData();
      if(result.status) {
        setCompany(result.data[0] || {});
      }
    }catch(err){
      console.log('company data error')
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getCompanyInfo();
    }, [])
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
                    <Caption numberOfLines={1} style={styles.caption}>
                      Prefix: {user.prefix}
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
                  props.navigation.navigate('Customer', {
                    settings: true,
                  });
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
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="power" color={color} size={size} />
                )}
                label="Logout"
                onPress={logoutUser}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginLeft: -5,
              }}>
              <Text
                style={{
                  fontFamily: 'Spartan-Bold',
                  fontSize: 16,
                  marginTop: -5,
                }}>
                {company?.name}
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="copyright" color={'#B2BABB'} size={14} />
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  fontSize: 12,
                  color: '#B2BABB',
                }}>
                {moment(new Date()).format('YYYY')}, All rights reserved
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  fontSize: 12,
                  color: '#B2BABB',
                }}>
                Designed & Developed By: Softvent
              </Text>
            </View>
          </View>
        </Drawer.Section>
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
    height: 130,
    borderColor: '#D5DBDB',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    color: theme.colors.text,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: theme.colors.text,
    marginBottom: 10,
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
