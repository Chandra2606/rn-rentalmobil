import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {apiUrl} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Mi from 'react-native-vector-icons/MaterialIcons';

export default function DataUser({setUserToken}) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const confirmLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin logout?', [
      {
        text: 'Batal',
        onPress: () => console.log('Logout dibatalkan'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleLogout(), cancelable: false},
    ]);
  };
  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      let response = await fetch(`${apiUrl}logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
        navigation.navigate('Login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let token = await AsyncStorage.getItem('userToken');
      try {
        // Ganti URL_API_LARAVEL dengan URL API Laravel Anda
        const response = await fetch(`${apiUrl}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1, marginTop: 30}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : user ? (
        <Card>
          <Card.Divider />
          <Text style={styles.detail}>Nama:</Text>
          <Text style={styles.detailData}>{user.name}</Text>
          <Text style={styles.detail}>Email:</Text>
          <Text style={styles.detailData}>{user.email}</Text>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={confirmLogout}>
              <Mi name="logout" size={30} color="white" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ) : (
        <Text>No user data available.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  detail: {
    fontSize: 14,
    marginBottom: 5,
    color: '#ccd',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailData: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  logoutButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
