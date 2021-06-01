import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './drawerContent';
import {Home} from '../components/screen';
import CustomerList from '../components/app/Customers/CustomerList';
import Items from '../components/app/Items/ItemList';
import ItemSelection from '../components/app/Items/ItemSelection';
import FinalInvoice from '../components/app/Invoice/FinalInvoice';
import AddCustomer from '../components/app/Customers/CustomerAdd';
import Invoices from '../components/app/Invoice/Invoices';

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={Home} options={({route}) => ({})} />
  </Drawer.Navigator>
);

export const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <MainStack.Screen name="Customer" component={CustomerList} />
        <MainStack.Screen name="Items" component={Items} />
        <MainStack.Screen name="ItemSelection" component={ItemSelection} />
        <MainStack.Screen name="FinalInvoice" component={FinalInvoice} />
        <MainStack.Screen name="AddCustomer" component={AddCustomer} />
        <MainStack.Screen name="Invoices" component={Invoices} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
