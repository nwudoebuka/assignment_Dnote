import 'react-native-gesture-handler';
import * as React from 'react';
import { LogBox } from 'react-native';
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UsersList from '../screens/UsersList';
import Beacons from '../screens/Beacons';
import Delivery from '../screens/Delivery';
import OrderOverview from '../screens/OrderOverview';
import { User } from '../data/Users';
import { DefaultTheme } from '@react-navigation/native';
import { theme } from '../themes/Colors';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export type Order = {
  beacons: number;
  discount: number;
  price: number;
};

export type NavigationProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

type Props = {};

type State = {
  order: Order | undefined;
  user: User | undefined;
  deliveryAddress: any;
};

const Stack = createStackNavigator();

export default class NavigationStack extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      order: undefined,
      user: undefined,
      deliveryAddress: undefined,
    };
  }

  setUser = (user: User) => {
    this.setState({
      user,
    });
  };

  getUser = () => {
    return this.state.user;
  };

  setOrder = (order: Order) => {
    this.setState({
      order,
    });
  };

  getOrder = () => {
    return this.state.order;
  };

  setDeliveryAddress = (deliveryAddress: any) => {
    this.setState({
      deliveryAddress,
    });
  };

  getDeliveryAddress = () => {
    return this.state.deliveryAddress;
  };

  render() {
    const customTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        headerTintColor: theme.colors.text
      },
    };

    return (
      <NavigationContainer theme={customTheme}>
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen
            name="Users"
            component={UsersList}
            options={{ title: 'Select user' }}
            initialParams={{ setUser: this.setUser }}
          />
          <Stack.Screen
            name="Beacons"
            component={Beacons}
            options={{ title: 'Beacons' }}
            initialParams={{ getUser: this.getUser, setOrder: this.setOrder }}
          />
          <Stack.Screen
            name="Delivery"
            component={Delivery}
            options={{ title: 'Delivery' }}
            initialParams={{
              getUser: this.getUser,
              setDeliveryAddress: this.setDeliveryAddress,
            }}
          />
          <Stack.Screen
            name="OrderOverview"
            component={OrderOverview}
            options={{ title: 'OrderOverview' }}
            initialParams={{
              getUser: this.getUser,
              getOrder: this.getOrder,
              getDeliveryAddress: this.getDeliveryAddress,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
