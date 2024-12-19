import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Data from './Data';
import DetailData from './Detaildata';
import {StatusBar} from 'react-native';
import FormTambah from './FormTambah';
import FormEdit from './FormEdit';
import FormUpload from './FormUpload';

export default function Navigasi() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#5F8670"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataMobil">
        <Stack.Screen
          name="DataMobil"
          component={Data}
          options={{
            headerTitle: 'Data Mobil',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
          }}
        />
        <Stack.Screen
          name="DetailMobil"
          component={DetailData}
          options={{
            headerTitle: 'Detail Mobil',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
          }}
        />
        <Stack.Screen
          name="FormTambah"
          component={FormTambah}
          options={{
            headerTitle: 'Tambah Mobil',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormEdit"
          component={FormEdit}
          options={{
            headerTitle: 'Edit Mobil',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormUpload"
          component={FormUpload}
          options={{
            headerTitle: 'Update Foto Mobil',
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
