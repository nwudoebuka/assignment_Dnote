import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { User } from '../data/Users';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice } from '../data/Price';
import { NavigationProps } from '../index';
import { getUserVariant } from '../redux/actions/user.actions';
import RootView from './components/RootView';
import { theme } from '../themes/Colors';
import { getPrices } from '../redux/actions/prices.actions';
// TODO: Change the price to be fetched dynamically. Imagine that we are running an A/B test to
// expose users to different prices depending on country. To get the correct price, two pieces of
// data must be queried:
// 1. The "user_experiments" endpoint reveals which variant of the "beacon_price" experiment the
//    user has been assigned.
// 2. The "beacon_price" endpoint reveals the price of an iBeacon for each country / experiment
//    variant combination.

// user_experiments endpoint: https://6548fde7dd8ebcd4ab240284.mockapi.io/user_experiments/{user_id}
// beacon_price endpoint: https://633ab21ae02b9b64c6151a44.mockapi.io/api/v2/BeaconPrice

const minBeaconsForDiscount = 5;
const discountPercent = 0.15;

const Beacons = (props: NavigationProps) => {
  const [numberOfBeacons, setNumberOfBeacons] = useState(1);
  const [pricePerBeacon, setPricePerBeacon] = useState(0);
  const [userCurrency, setUserCurrency] = useState("USD");

  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.userVariant);
  const pricesState = useSelector((state: any) => state.prices);
  const user: User = props.route.params?.getUser();
  const price = getTotalPrice(1, pricePerBeacon);
  
  const decreaseBeaconCount = () => {
    if (numberOfBeacons > 1) {
      setNumberOfBeacons(numberOfBeacons - 1);
    }
  };

  const increaseBeaconCount = () => {
    setNumberOfBeacons(numberOfBeacons + 1);
  };

  const totalBeaconPrice = () => {
    if (numberOfBeacons > minBeaconsForDiscount) {
      const discountAmount = (price * numberOfBeacons * 0.15);
      const discountedPrice = (price * numberOfBeacons) - discountAmount;
      return discountedPrice;
    }
    return (price * numberOfBeacons);
  }

    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        dispatch(getPrices());
        dispatch(getUserVariant(user.id.toString()));
      });

      if (
        userState.userVariant &&
        userState.userVariant.experiments &&
        userState.userVariant.experiments.length > 0 &&
        pricesState.prices &&
        pricesState.prices.length > 0
      ){
        const beaconPriceData = userState.userVariant.experiments.find((item: any) => item.experiment === "beacon_price");
      
        const filteredPriceControl = pricesState.prices.filter((item: any) => item.country_id.toLowerCase() === user.country_id.toLowerCase()).map((item: any) => item[beaconPriceData.variant]);
        const currency = pricesState.prices.filter((item: any) => item.country_id.toLowerCase() === user.country_id.toLowerCase()).map((item: any) => item["currency"]);
        setPricePerBeacon(filteredPriceControl);
        setUserCurrency(currency);    
      }
 return unsubscribe;
    }, [userState, pricesState]);

  return (
    <RootView isLoading={userState.isFetching} apiError={userState.error} containerStyle={styles.container}>
    <View style={styles.parentContainer}>
      <View
        style={styles.mainViewStyle}>
        <View
          style={styles.priceHolderContainer}>

          <View style={styles.beaconCountContainer}>
          <TouchableOpacity
          style={{width:50,height:50,
            justifyContent:'center',
            borderTopLeftRadius:20,
            borderBottomLeftRadius:20,
           borderRightWidth:0.8}}
        onPress={() => {decreaseBeaconCount()}}
      >
        <Text style={{ fontSize: 20, color: theme.colors.text,alignSelf:'center' }}>-</Text>
      </TouchableOpacity>
          <Text style={{ fontSize: 16, color: theme.colors.text,marginHorizontal: 20 }}>{numberOfBeacons} iBeacon</Text>
          <TouchableOpacity
             style={{width:50,height:50,
             justifyContent:'center',
             borderTopEndRadius:20,
             borderBottomEndRadius:20,
            borderLeftWidth:0.8}}
        onPress={() => {increaseBeaconCount()}}
      >
        <Text style={styles.arithmeticSignStyle}>+</Text>
      </TouchableOpacity>
          </View>
       <View style={styles.priceContainer}>
       <Text style={styles.priceTextStyle}>
            Price: {totalBeaconPrice().toLocaleString()} {userCurrency}
       </Text>
       {numberOfBeacons > minBeaconsForDiscount ?
  <Text style={styles.discountThroughText}>
  {(price * numberOfBeacons).toLocaleString()} {userCurrency}
</Text>
:
<></>
       
       } 
     
       </View>
          <Text style={styles.discountInfoStyle}>
            get {discountPercent * 100}% discount when you buy more than 5 iBeacons.
          </Text>
        </View>
        <Button
          title="Buy iBeacon"
          type="outline"
          style={{ width: 200 }}
          onPress={() => {
            props.route.params?.setOrder({
              beacons: numberOfBeacons,
              discount: (price * numberOfBeacons) * discountPercent,
              price: totalBeaconPrice(),
            });
            props.navigation.navigate('Delivery');
          }}
        />
      </View>
    </View>
    </RootView>
  );
};

export default Beacons;

const styles = StyleSheet.create({
  beaconCountContainer: {
    flexDirection: 'row',
    height:50,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 0.8,
  },
  parentContainer:{ 
    flex: 1,
    justifyContent: 'center'
   },
  mainViewStyle:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  priceHolderContainer:{
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  priceContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  arithmeticSignStyle:{ 
    fontSize: 20,
    color: theme.colors.text, 
    alignSelf:'center' 
  },
  priceTextStyle:{
    fontSize: 16,
     color: theme.colors.text
     },
  discountInfoStyle:{ 
    fontSize: 13, 
    color: theme.colors.secondary 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountThroughText: {
    textDecorationLine: 'line-through',
    color: theme.colors.error,
  }
});
