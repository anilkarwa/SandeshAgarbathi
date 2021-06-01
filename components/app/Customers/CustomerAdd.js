import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {userAtom} from '../../../Atoms';
import {useAtom} from 'jotai';
import Toast from 'react-native-toast-message';
import Realm from 'realm';
import CustomerSchema from '../../../Realm/CustomerSchema';
import {theme} from '../../../config/theme';
import commonStyles from '../../../assets/styles/common';
import CustomerValidationSchema from '../../../helpers/forms/CustomerValidation';

function CustomerAdd(props) {
  const initialValues = {
    customerCode: props.item.code || '',
    customerName: props.item.name || '',
    contactPerson: props.item.contactPerson || '',
    group: props.item.groupId || '',
    email: props.item.email || '',
    mobileNumber: props.item.mobileNumber || '',
    phoneNumber: props.item.phoneNumber || '',
    address_line_1: props.item.addressLine1 || '',
    address_line_2: props.item.addressLine2 || '',
    address_line_3: props.item.addressLine3 || '',
    city: props.item.city || '',
    state: props.item.state || '',
    pincode: props.item.pincode || '',
    gst: props.item.gstNo || '',
    remarks: props.item.remarks || '',
  };
  const [user] = useAtom(userAtom);
  const saveCustomer = async (values, setSubmitting) => {
    setSubmitting(false);
    let realm = null;
    try {
      realm = await Realm.open({
        path: 'myrealm',
        schema: [CustomerSchema],
      });
      let custObj = {
        _id: Realm.BSON.ObjectId().toHexString(),
        id: -1,
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
        groupId: values.group,
        phoneNumber: values.phoneNumber,
        mobileNumber: values.mobileNumber,
        contactPerson: values.contactPerson,
        gstNo: values.gst,
        addedBy: user?.name,
        remarks: values.remarks,
      };
      if (props.item.id) {
        custObj.changedBy = user?.name;
      }
      realm.write(() => {
        realm.create('Customer', custObj, 'modified');
      });
      Toast.show({
        text2: 'Customer Added',
        type: 'success',
        position: 'bottom',
      });
      setSubmitting(false);
      realm.close();
      props.navigation.navigate.goBack();
    } catch (error) {
      Toast.show({
        text2: 'Error Adding Customer',
        type: 'error',
        position: 'bottom',
      });
      setSubmitting(false);
      if (realm) {
        realm.close();
      }
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
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
            isSubmitting,
            /* and other goodies */
          }) => (
            <ScrollView>
              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Customer Code"
                onChangeText={(val) => handleChange('customerCode')(val)}
                onBlur={handleBlur('customerCode')}
                value={values.customerCode}
              />
              {errors.customerCode && touched.customerCode ? (
                <Text style={commonStyles.error}>{errors.customerCode}</Text>
              ) : null}

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Customer Name"
                onChangeText={(val) => handleChange('customerName')(val)}
                onBlur={handleBlur('customerName')}
                value={values.customerName}
              />
              {errors.customerName && touched.customerName ? (
                <Text style={commonStyles.error}>{errors.customerName}</Text>
              ) : null}

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Customer Group"
                onChangeText={(val) => handleChange('group')(val)}
                onBlur={handleBlur('group')}
                value={values.group}
              />
              {errors.group && touched.group ? (
                <Text style={commonStyles.error}>{errors.group}</Text>
              ) : null}

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Contact Person"
                onChangeText={(val) => handleChange('contactPerson')(val)}
                onBlur={handleBlur('contactPerson')}
                value={values.contactPerson}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Email"
                onChangeText={(val) => handleChange('email')(val)}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={commonStyles.error}>{errors.email}</Text>
              ) : null}

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Mobile Number"
                onChangeText={(val) => handleChange('mobileNumber')(val)}
                onBlur={handleBlur('mobileNumber')}
                value={values.mobileNumber}
              />
              {errors.mobileNumber && touched.mobileNumber ? (
                <Text style={commonStyles.error}>{errors.mobileNumber}</Text>
              ) : null}

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Phone Number"
                onChangeText={(val) => handleChange('phoneNumber')(val)}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Addresss Line 1"
                onChangeText={(val) => handleChange('address_line_1')(val)}
                onBlur={handleBlur('address_line_1')}
                value={values.address_line_1}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Address Line 2"
                onChangeText={(val) => handleChange('address_line_2')(val)}
                onBlur={handleBlur('address_line_2')}
                value={values.address_line_2}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Address Line 3"
                onChangeText={(val) => handleChange('address_line_3')(val)}
                onBlur={handleBlur('address_line_3')}
                value={values.address_line_3}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="City"
                onChangeText={(val) => handleChange('city')(val)}
                onBlur={handleBlur('city')}
                value={values.city}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="State"
                onChangeText={(val) => handleChange('state')(val)}
                onBlur={handleBlur('state')}
                value={values.state}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Pincode"
                onChangeText={(val) => handleChange('pincode')(val)}
                onBlur={handleBlur('pincode')}
                value={values.pincode}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="GST No"
                onChangeText={(val) => handleChange('gst')(val)}
                onBlur={handleBlur('gst')}
                value={values.gst}
              />

              <TextInput
                mode="outlined"
                multiline
                style={commonStyles.textField}
                label="Remarks"
                onChangeText={(val) => handleChange('remarks')(val)}
                onBlur={handleBlur('remarks')}
                value={values.remarks}
              />
              <View>
                <Button style={styles.loginBtn} mode="contained">
                  Reset
                </Button>
                <Button
                  disabled={isSubmitting || !isValid}
                  style={styles.loginBtn}
                  loading={isSubmitting}
                  mode="contained"
                  onPress={handleSubmit}>
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

export default CustomerAdd;

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
  loginBtn: {
    marginTop: 50,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
