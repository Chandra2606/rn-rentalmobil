import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Pelanggan from './Pelanggan/Navigasi';
import Mobil from './Mobil/Navigasi';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DataUser from './DataUser';
import NavRental from './Rental/NavRental';

const Tab = createBottomTabNavigator();

export default function Index(props) {
  const {setUserToken} = props;
  return (
    <Tab.Navigator
      initialRouteName="Pelanggan"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Pelanggan') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Mobil') {
            iconName = focused ? 'car-sport' : 'car-sport-outline';
          } else if (route.name === 'UserAccount') {
            iconName = focused ? 'log-out' : 'log-out-outline';
          } else if (route.name === 'Rental') {
            iconName = focused ? 'cash' : 'cash-outline';
          }
          return <IonIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5F8670',
        tabBarInactiveTintColor: '#164863',
      })}>
      <Tab.Screen
        name="Pelanggan"
        component={Pelanggan}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Mobil"
        component={Mobil}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Rental"
        component={NavRental}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UserAccount"
        options={{headerShown: false, title: 'Keluar'}}>
        {props => <DataUser {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
