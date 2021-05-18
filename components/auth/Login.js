import React from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Title, TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import commonStyles from '../../assets/styles/common';
import colors from '../../config/colors';
import {theme} from '../../config/theme';
import {userLogin} from '../../services/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login(props) {
  const authenticateUser = async (values, setSubmitting) => {
    setSubmitting(true);
    const response = await userLogin({
      email: values.email,
      password: values.password,
    });
    setSubmitting(false);
    if (response.response_type === 'success') {
      await AsyncStorage.setItem(
        '@USER',
        JSON.stringify(response.response.data),
      );
      props.navigate('AppStack');
    } else {
      Toast.show({
        text2: 'Login failed',
        type: 'error',
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Title style={styles.title}>Login</Title>
          </View>
          <View>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Email is required'),
                password: Yup.string().required('Password is required'),
              })}
              onSubmit={(values, {setSubmitting}) => {
                authenticateUser(values, setSubmitting);
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
                <>
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
                    secureTextEntry
                    mode="outlined"
                    style={commonStyles.textField}
                    label="Password"
                    onChangeText={(val) => handleChange('password')(val)}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <Text style={commonStyles.error}>{errors.password}</Text>
                  ) : null}

                  <Button
                    disabled={isSubmitting || !isValid}
                    style={styles.loginBtn}
                    loading={isSubmitting}
                    mode="contained"
                    onPress={handleSubmit}>
                    Login
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
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
