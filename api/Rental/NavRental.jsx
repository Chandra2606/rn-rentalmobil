import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import FormInput from './FormInput';
import DataRental from './DataRental';
import DetailRental from './DetailData';

export default function NavRental() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#5F8670"
        translucent={true}
      />

      <Stack.Navigator initialRouteName="DataRental">
        <Stack.Screen
          name="DataRental"
          component={DataRental}
          options={{
            headerTitle: 'Data Rental',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="DetailData"
          component={DetailRental}
          options={{
            headerTitle: 'Detail Rental',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
          }}
        />

        <Stack.Screen
          name="FormInput"
          component={FormInput}
          options={{
            headerTitle: 'Input Rental',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
