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
    // <NavigationContainer independent={true}>
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#5F8670"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataPelanggan">
        <Stack.Screen
          name="DataPelanggan"
          component={Data}
          options={{
            headerTitle: 'Data Pelanggan',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5F8670',
            },
          }}
        />
        <Stack.Screen
          name="DetailPelanggan"
          component={DetailData}
          options={{
            headerTitle: 'Detail Pelanggan',
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
            headerTitle: 'Tambah Pelanggan',
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
            headerTitle: 'Edit Pelanggan',
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
            headerTitle: 'Update Foto Pelanggan',
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
