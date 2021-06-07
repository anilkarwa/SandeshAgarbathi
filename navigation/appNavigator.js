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
import InvoiceDetails from '../components/app/Invoice/InvoiceDetails';
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
        <MainStack.Screen
          name="Customer"
          component={CustomerList}
          options={{
            title: 'Customers',
          }}
        />
        <MainStack.Screen name="Items" component={Items} />
        <MainStack.Screen
          name="ItemSelection"
          component={ItemSelection}
          options={{
            title: 'Select Items',
          }}
        />
        <MainStack.Screen
          name="FinalInvoice"
          component={FinalInvoice}
          options={{
            title: 'Final Invoice',
          }}
        />
        <MainStack.Screen
          name="InvoiceDetails"
          component={InvoiceDetails}
          options={{
            title: 'Invoice Details',
          }}
        />
        <MainStack.Screen
          name="AddCustomer"
          component={AddCustomer}
          options={{
            title: 'Add Customer',
          }}
        />
        <MainStack.Screen name="Invoices" component={Invoices} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
