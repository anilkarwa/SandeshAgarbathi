import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {ScrollView, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import colors from '../../../config/colors';
import {theme} from '../../../config/theme';
import commonStyles from '../../../assets/styles/common';
import CustomerValidationSchema from '../../../helpers/forms/CustomerValidation';

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
  state: '',
  pincode: '',
  gst: '',
  remarks: '',
};

function CustomerAdd(props) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={CustomerValidationSchema}
          onSubmit={(values, {setSubmitting}) => {}}>
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
                onChangeText={val => handleChange('customerCode')(val)}
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
                onChangeText={val => handleChange('customerName')(val)}
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
                onChangeText={val => handleChange('group')(val)}
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
                onChangeText={val => handleChange('contactPerson')(val)}
                onBlur={handleBlur('contactPerson')}
                value={values.contactPerson}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Email"
                onChangeText={val => handleChange('email')(val)}
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
                onChangeText={val => handleChange('mobileNumber')(val)}
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
                onChangeText={val => handleChange('phoneNumber')(val)}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Addresss Line 1"
                onChangeText={val => handleChange('address_line_1')(val)}
                onBlur={handleBlur('address_line_1')}
                value={values.address_line_1}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Address Line 2"
                onChangeText={val => handleChange('address_line_2')(val)}
                onBlur={handleBlur('address_line_2')}
                value={values.address_line_2}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Address Line 3"
                onChangeText={val => handleChange('address_line_3')(val)}
                onBlur={handleBlur('address_line_3')}
                value={values.address_line_3}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="City"
                onChangeText={val => handleChange('city')(val)}
                onBlur={handleBlur('city')}
                value={values.city}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="State"
                onChangeText={val => handleChange('state')(val)}
                onBlur={handleBlur('state')}
                value={values.state}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="Pincode"
                onChangeText={val => handleChange('pincode')(val)}
                onBlur={handleBlur('pincode')}
                value={values.pincode}
              />

              <TextInput
                mode="outlined"
                style={commonStyles.textField}
                label="GST No"
                onChangeText={val => handleChange('gst')(val)}
                onBlur={handleBlur('gst')}
                value={values.gst}
              />

              <TextInput
                mode="outlined"
                multiline
                style={commonStyles.textField}
                label="Remarks"
                onChangeText={val => handleChange('remarks')(val)}
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
