import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { Formik } from 'formik';
import { User } from '../data/Users';
import { NavigationProps } from '../index';
import { theme } from '../themes/Colors';

const Delivery = (props: NavigationProps) => {
  const [user, setUser] = useState<User>(props.route.params?.getUser());
  const [postalCode, setPostalCode] = useState<string | number>(
    user?.postal_code || 0,
  );

  return (
    <View style={{ flex: 1, justifyContent:'flex-start' }}>
      <View
        style={styles.mainViewContainer}>
        <Text
          style={styles.titleText}>
          Delivery Address
        </Text>
        <Formik
          initialValues={{
            name: user.full_name,
            address: user.address1,
            address2: user.address2,
            postalCode: postalCode.toString(),
            city: user.city,
            country: user.country_name,
          }}
          onSubmit={values => {
            props.route.params?.setDeliveryAddress(values);
            props.navigation.navigate('OrderOverview');
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
            postalCode: yup.number().required(),
            city: yup.string().required(),
            country: yup.string().required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <TextInput
                value={values.name || undefined}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                placeholder="Full name"
                placeholderTextColor={theme.colors.secondary} 
                style={styles.formField}
              />
              {touched.name && errors.name && (
                <Text style={styles.textBase}>{errors.name}</Text>
              )}
              <TextInput
                value={values.address || undefined}
                onChangeText={handleChange('address')}
                onBlur={() => setFieldTouched('address')}
                placeholder="address"
                placeholderTextColor={theme.colors.secondary} 
                style={styles.formField}
              />
              {touched.address && errors.address && (
                <Text style={styles.textBase}>{errors.address}</Text>
              )}
              <TextInput
                value={values.address2 || undefined}
                onChangeText={handleChange('address2')}
                placeholder="Address line 2"
                placeholderTextColor={theme.colors.secondary} 
                onBlur={() => setFieldTouched('address2')}
                style={styles.formField}
              />
              {touched.address2 && errors.address2 && (
                <Text style={styles.textBase}>{errors.address2}</Text>
              )}
              <TextInput
                value={values.postalCode}
                onChangeText={handleChange('postalCode')}
                placeholder="Postal code"
                placeholderTextColor={theme.colors.secondary} 
                onBlur={() => setFieldTouched('postalCode')}
                style={styles.formField}
              />
              {touched.postalCode && errors.postalCode && (
                <Text style={styles.textBase}>{errors.postalCode}</Text>
              )}
              <TextInput
                value={values.city || undefined}
                onChangeText={handleChange('city')}
                placeholder="City"
                placeholderTextColor={theme.colors.secondary} 
                onBlur={() => setFieldTouched('city')}
                style={styles.formField}
              />
              {touched.city && errors.city && (
                <Text style={styles.textBase}>{errors.city}</Text>
              )}
              <TextInput
                value={values.country}
                onChangeText={handleChange('country')}
                placeholder="Country"
                placeholderTextColor={theme.colors.secondary} 
                onBlur={() => setFieldTouched('country')}
                style={styles.formField}
              />
              {touched.country && errors.country && (
                <Text style={styles.textBase}>{errors.country}</Text>
              )}
              <Button
                title="Submit"
                type="outline"
                disabled={!isValid}
                style={{ width: 200 }}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText:{
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  mainViewContainer:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formField: {
    height: 40,
    width: '80%',
    padding: 5,
    color:theme.colors.text,
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
  textBase: {
    fontSize: 10,
    color: theme.colors.error,
    marginHorizontal: 20
  },
});

export default Delivery;
