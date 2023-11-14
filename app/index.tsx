import 'react-native-gesture-handler';
import * as React from 'react';
import { LogBox, View } from 'react-native';
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './redux/reducers';
import UsersList from './screens/UsersList';
import Beacons from './screens/Beacons';
import Delivery from './screens/Delivery';
import OrderOverview from './screens/OrderOverview';
import { User } from './data/Users';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import NavigationStack from './navigation/navigationStack';
import { persistStore } from 'redux-persist';

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

export default class App extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     order: undefined,
  //     user: undefined,
  //     deliveryAddress: undefined,
  //   };
  // }

  render() {


    return (
    
    <Provider store={store}>
  
    <NavigationStack/>

  </Provider>
    );
  }
}


