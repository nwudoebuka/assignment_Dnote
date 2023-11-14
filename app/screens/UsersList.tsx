import React from 'react';
import { FlatList } from 'react-native';
import { Row, Separator } from '../components/Row';
import { users } from '../data/Users';
import { NavigationProps } from '../index';
import {useSelector } from 'react-redux';
import RootView from './components/RootView';

const UsersList = (props: NavigationProps) => {

  return (
    <RootView isLoading={false} apiError={null}>
    <FlatList
      data={users}
      keyExtractor={user => {
        return `${user.id}`;
      }}
      renderItem={({ item }) => {
        return (
          <Row
            title={item.full_name || '-'}
            subtitle={item.country_name}
            onPress={() => {
              props.route.params?.setUser(item);
              props.navigation.navigate('Beacons');
            }}
          />
        );
      }}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={() => <Separator />}
      ListFooterComponent={() => <Separator />}
      contentContainerStyle={{ paddingVertical: 20 }}
    />
</RootView>
  );
};

export default UsersList;
