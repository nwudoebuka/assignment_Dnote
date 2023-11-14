import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';
import { NavigationProps } from '../index';
import { theme } from '../themes/Colors';

const OrderOverview = (props: NavigationProps) => {
  const [isVisible, setVisible] = useState(false);

  const getDisCountPrice = () => {
    if (props.route.params?.getOrder().beacons > 5) {
      const totalPrice = props.route.params?.getOrder().discount + props.route.params?.getOrder().price;
      return totalPrice;
    }
    return "";
  };

  return (
    <View style={styles.parentContainer}>
      <View
        style={styles.mainViewContainer}>
        <Text h2 style={styles.titleText}>
          Order Overview
        </Text>
        <Text style={styles.boldText}>
          Ordered iBeacons: {props.route.params?.getOrder().beacons}
        </Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.boldText}>
          Full Price: {props.route.params?.getOrder().price}
        </Text>
        <Text style={styles.discountThroughText}>
          {getDisCountPrice()}
        </Text>
        </View>
       
        <Text h4>Delivery Address</Text>
        <Text style={styles.boldText}>
          {props.route.params?.getDeliveryAddress().name}
        </Text>
        <Text style={styles.boldText}>
          {props.route.params?.getDeliveryAddress().address},&nbsp;
          {props.route.params?.getDeliveryAddress().postalCode}
        </Text>
        <Text style={styles.boldText}>
          {props.route.params?.getDeliveryAddress().city},&nbsp;
          {props.route.params?.getDeliveryAddress().country}
        </Text>
        <Button
          title="Confirm and send the order"
          type="outline"
          style={{ width: '90%' }}
          onPress={() => {
            Alert.alert(
              'Order completed! 📦🚚',
              'You can now go back to the "select user" screen and start over.',
              [
                {
                  text: 'Go back',
                  onPress: () => props.navigation.navigate('Users'),
                },
              ],
            );
          }}
        />
        <Overlay
          isVisible={isVisible}
          onBackdropPress={() => setVisible(false)}>
          <Text h3 style={{ color: '#27AAE1' }}>
            Order completed! 📦🚚
          </Text>
        </Overlay>
      </View>
    </View>
  );
};
export default OrderOverview;

const styles = StyleSheet.create({
  parentContainer:{ 
    flex: 1,
    justifyContent: 'center'
   },
   titleText:{ 
    color: theme.colors.accent
   },
   mainViewContainer:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  boldText:{ 
    fontSize: 17, 
    fontWeight: 'bold'
   },
   discountThroughText: {
    textDecorationLine: 'line-through',
    color: theme.colors.error,
  }
});