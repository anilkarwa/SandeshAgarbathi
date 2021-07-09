import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {userAtom} from '../../../Atoms';
import {useAtom} from 'jotai';
import Toast from 'react-native-toast-message';
import Realm from 'realm';
import CustomerSchema from '../../../Realm/CustomerSchema';
import {theme} from '../../../config/theme';
import commonStyles from '../../../assets/styles/common';
import {Picker} from '@react-native-picker/picker';
import CustomerValidationSchema from '../../../helpers/forms/CustomerValidation';
import StateList from '../../../IndiaState.json';
import {useNavigation} from '@react-navigation/native';
import {getCustomerGroupList} from '../../../helpers/DataSync/getData';

const initialValues = {
  customerCode: '',
  customerName: '',
  contactPerson: '',
  group: '',
  email: '',
  mobileNumber: '',
  phoneNumber: '',
  address_line_1: '',
  address_line_2: '',
  address_line_3: '',
  city: '',
  state: 'Karnataka',
  pincode: '',
  gst: '',
  remarks: '',
};

function CustomerAdd(props) {
  const navigation = useNavigation();
  const {
    customer: item = {},
    updateCustomer,
    refreshList,
  } = props?.route?.params;
  const [formData, setFormData] = useState({
    customerCode: item.code || '',
    customerName: item.name || '',
    contactPerson: item.contactPerson || '',
    group: item.groupId || '',
    email: item.email || '',
    mobileNumber: item.mobileNumber || '',
    phoneNumber: item.phoneNumber || '',
    address_line_1: item.addressLine1 || '',
    address_line_2: item.addressLine2 || '',
    address_line_3: item.addressLine3 || '',
    city: item.city || '',
    state: item.state || 'Karnataka',
    pincode: item.pincode || '',
    gst: item.gstNo || '',
    remarks: item.remarks || '',
  });
  const [user] = useAtom(userAtom);
  const [customerGroups, setCustomerGroups] = useState([]);

  useEffect(() => {
    loadCustomerGroup();
  }, []);

  const loadCustomerGroup = async () => {
    let result = await getCustomerGroupList();
    if (result && result.status) {
      let data = result.data.map((item) => {
        return {label: item.name, value: item.id};
      });
      setCustomerGroups(data);
    }
  };

  const saveCustomer = async (values, setSubmitting) => {
    let custObj = {
      code: values.customerCode,
      name: values.customerName,
      email: values.email,
      addressLine1: values.address_line_1,
      addressLine2: values.address_line_2,
      addressLine3: values.address_line_3,
      city: values.city,
      state: values.state,
      country: 'India',
      pincode: values.pincode,
      groupId: values.group ? parseInt(values.group, 10) : 0,
      phoneNumber: values.phoneNumber,
      mobileNumber: values.mobileNumber,
      contactPerson: values.contactPerson,
      gstNo: values.gst,
      remarks: values.remarks,
    };
    if (item && item._id) {
      custObj._id = item._id;
      custObj.changedBy = user?.name;
      custObj.changedOn = new Date();
      updateCustomer(custObj);
      setSubmitting(false);
      refreshList();
      navigation.goBack();
    } else {
      custObj._id = Realm.BSON.ObjectId().toHexString();
      custObj.id = -1;
      custObj.addedBy = user?.name;
      custObj.addedO = new Date();

      setSubmitting(true);
      let realm = null;
      try {
        realm = await Realm.open({
          path: 'myrealm',
          schema: [CustomerSchema],
        });
        const exitingCustomers = realm.objects('Customer');
        const isNotUnique = exitingCustomers.filtered(
          'code == $0',
          custObj.code,
        );

        if (isNotUnique && isNotUnique.length) {
          Toast.show({
            text1: 'Duplicate Customer Code',
            text2: 'Customer code already exists',
            type: 'error',
            position: 'bottom',
          });
          setSubmitting(false);
          return false;
        }
        realm.write(() => {
          realm.create('Customer', custObj);
        });
        Toast.show({
          text1: 'Customer Added',
          text2: 'Customer has beed created',
          type: 'success',
          position: 'bottom',
        });
        setSubmitting(false);
        realm.close();
        refreshList();
        navigation.goBack();
      } catch (error) {
        Toast.show({
          text1: 'Error Saving Customer',
          text2: 'Some error occured while saving customer',
          type: 'error',
          position: 'bottom',
        });
        setSubmitting(false);
        if (realm) {
          realm.close();
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Formik
          initialValues={formData}
          validationSchema={CustomerValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            saveCustomer(values, setSubmitting);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
            isSubmitting,
            dirty,
            setTouched,
            /* and other goodies */
          }) => (
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}
              keyboardDismissMode={'interactive'}>
              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Code *</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter code"
                  onChangeText={(val) => handleChange('customerCode')(val)}
                  onBlur={handleBlur('customerCode')}
                  returnKeyType="next"
                  value={values.customerCode}
                />
                {errors.customerCode && touched.customerCode ? (
                  <Text style={commonStyles.error}>{errors.customerCode}</Text>
                ) : null}
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Name *</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter name"
                  onChangeText={(val) => handleChange('customerName')(val)}
                  onBlur={handleBlur('customerName')}
                  returnKeyType="next"
                  value={values.customerName}
                />
                {errors.customerName && touched.customerName ? (
                  <Text style={commonStyles.error}>{errors.customerName}</Text>
                ) : null}
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Group *</Text>
                <View style={commonStyles.boderBox}>
                  <Picker
                    selectedValue={values.group}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                      setValues({
                        ...values,
                        group: itemValue,
                      })
                    }>
                    <Picker.Item
                      style={styles.pickerItems}
                      color={'#A6ACAF'}
                      label="Select"
                      value=""
                    />
                    {customerGroups.map((e) => (
                      <Picker.Item
                        style={styles.pickerItems}
                        label={e.label}
                        value={e.value}
                      />
                    ))}
                  </Picker>
                </View>
                {errors.group && touched.group ? (
                  <Text style={commonStyles.error}>{errors.group}</Text>
                ) : null}
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Contact Person</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter contact person"
                  onChangeText={(val) => handleChange('contactPerson')(val)}
                  returnKeyType="next"
                  value={values.contactPerson}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Email *</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter email"
                  onChangeText={(val) => handleChange('email')(val)}
                  returnKeyType="next"
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={commonStyles.error}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Mobile Number *</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={(val) => handleChange('mobileNumber')(val)}
                  returnKeyType="next"
                  value={values.mobileNumber}
                />
                {errors.mobileNumber && touched.mobileNumber ? (
                  <Text style={commonStyles.error}>{errors.mobileNumber}</Text>
                ) : null}
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Phone Number </Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  onChangeText={(val) => handleChange('phoneNumber')(val)}
                  returnKeyType="next"
                  value={values.phoneNumber}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Address Line 1</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter address line 1"
                  onChangeText={(val) => handleChange('address_line_1')(val)}
                  returnKeyType="next"
                  value={values.address_line_1}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Address Line 2</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter address line 2"
                  onChangeText={(val) => handleChange('address_line_2')(val)}
                  returnKeyType="next"
                  value={values.address_line_2}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Address Line 3</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter address line 3"
                  onChangeText={(val) => handleChange('address_line_3')(val)}
                  returnKeyType="next"
                  value={values.address_line_3}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>City</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter city"
                  onChangeText={(val) => handleChange('city')(val)}
                  returnKeyType="next"
                  value={values.city}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>State</Text>
                <View style={commonStyles.boderBox}>
                  <Picker
                    selectedValue={values.state}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                      setValues({
                        ...values,
                        state: itemValue,
                      })
                    }>
                    <Picker.Item
                      style={styles.pickerItems}
                      color={'#A6ACAF'}
                      label="Select state"
                      value=""
                    />
                    {StateList.map((e) => (
                      <Picker.Item
                        style={styles.pickerItems}
                        label={e.label}
                        value={e.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Pincode</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter pincode"
                  maxLength={6}
                  keyboardType="numeric"
                  onChangeText={(val) => handleChange('pincode')(val)}
                  returnKeyType="next"
                  value={values.pincode}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>GST</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter GST"
                  onChangeText={(val) => handleChange('gst')(val)}
                  returnKeyType="next"
                  value={values.gst}
                />
              </View>

              <View style={commonStyles.elementBox}>
                <Text style={commonStyles.label}>Remarks</Text>
                <TextInput
                  style={commonStyles.textInput}
                  placeholder="Enter remarks"
                  onChangeText={(val) => handleChange('remarks')(val)}
                  returnKeyType="next"
                  value={values.remarks}
                />
              </View>

              <View>
                {/* <Button
                  style={styles.loginBtn}
                  mode="contained"
                  onPress={() => setFormData(initialValues)}>
                  Reset
                </Button> */}
                <Button
                  disabled={isSubmitting || !dirty}
                  style={styles.loginBtn}
                  loading={isSubmitting}
                  mode="contained"
                  onPress={() => {
                    setTouched({
                      customerCode: true,
                      customerName: true,
                      contactPerson: true,
                      group: true,
                      email: true,
                      mobileNumber: true,
                      phoneNumber: true,
                      address_line_1: true,
                      address_line_2: true,
                      address_line_3: true,
                      city: true,
                      state: true,
                      pincode: true,
                      gst: true,
                      remarks: true,
                    });
                    if (dirty && Object.keys(errors).length === 0) {
                      handleSubmit();
                    }
                  }}>
                  Save
                </Button>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(CustomerAdd);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    maxWidth: 500,
    margin: 10,
  },
  title: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 30,
  },
  pickerStyle: {
    width: '100%',
    height: 50,
    paddingRight: 0,
    paddingLeft: 0,
    fontSize: 10,
  },
  pickerItems: {
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 14,
  },
  loginBtn: {
    marginTop: 50,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dropdown: {
    marginTop: 18,
  },
});
