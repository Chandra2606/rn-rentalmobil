import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import ModalDataPelanggan from './ModalDataPelanggan';
import ModalDataMobil from './ModalDataMobil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {apiUrl} from '../config';
import {useNavigation} from '@react-navigation/native';

export default function FormInput() {
  const navigation = useNavigation();
  const [modalPelangganVisible, setModalPelangganVisible] = useState(false);
  const [modalMobilVisible, setModalMobilVisible] = useState(false);
  const [koderental, setKodeRental] = useState('');
  const [lamahari, setLamahari] = useState('');
  const [selectedPelanggan, setSelectedPelanggan] = useState({
    kdpelanggan: '',
    nama: '',
  });
  const [selectedMobil, setSelectedMobil] = useState({
    kode: '',
    nama: '',
    hargamobil: '',
  });
  const [TanggalMulai, setTanggalMulai] = useState(new Date());
  const [TanggalSelesai, setTanggalSelesai] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('start');
  const [total, setTotal] = useState('');
  const [hargamobil, setHargamobil] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onPelangganSelected = (kdpelanggan, nama) => {
    setSelectedPelanggan({kdpelanggan, nama});
    setModalPelangganVisible(false); // Menutup modal setelah pemilihan
  };

  const onMobilSelected = (kode, nama, hargamobil) => {
    setSelectedMobil({kode, nama, hargamobil});
    setModalMobilVisible(false); // Menutup modal setelah pemilihan
  };

  const onChangeTime = (event, selectedTime) => {
    setShowPicker(Platform.OS === 'ios'); // Untuk iOS, tetap tampilkan picker
    const currentTime = selectedTime || new Date();
    if (currentPicker === 'start') {
      setTanggalMulai(currentTime);
    } else {
      setTanggalSelesai(currentTime);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || TanggalMulai;
    setShowPicker(Platform.OS === 'ios');
    if (currentPicker === 'start') {
      setTanggalMulai(currentDate);
    } else {
      setTanggalSelesai(currentDate);
    }
  };

  const formatDate = date => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const modalSearchPelanggan = () => {
    setModalPelangganVisible(true); // Buka hanya modal Pelanggan
  };

  const modalSearchMobil = () => {
    setModalMobilVisible(true); // Buka hanya modal Mobil
  };

  const submitRental = async () => {
    setLoading(true);
    setValidationErrors({});
    // Hitung total berdasarkan harga mobil dan lama hari
    const totalHarga =
      parseFloat(selectedMobil.hargamobil) * parseInt(lamahari);

    const dataToSend = {
      koderental: koderental,
      kdpelanggan: selectedPelanggan.kdpelanggan,
      kdmobil: selectedMobil.kode,
      lamahari: lamahari,
      tanggalmulai: formatDate(TanggalMulai),
      tanggalselesai: formatDate(TanggalSelesai),
      total: totalHarga.toString(), // Set total sesuai hasil perhitungan
    };
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${apiUrl}rental`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          if (response.status === 422) {
            let errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = data.errors[key][0];
            });
            setValidationErrors(errors);
          } else {
            throw new Error(
              data.message || 'Terjadi kesalahan saat menyimpan data.',
            );
          }
          return;
        }
        setLoading(false);
        Alert.alert('Berhasil', 'Data Rental berhasil disimpan', [
          {
            text: 'Ok',
            onPress: () => {
              setKodeRental('');
              setLamahari('');
              setSelectedPelanggan({kdpelanggan: '', nama: ''});
              setSelectedMobil({kode: '', nama: '', hargamobil: ''});
              setTanggalMulai(new Date());
              setTanggalSelesai(new Date());
              setShowPicker(false);
              setTotal('');
              setHargamobil('');
              setValidationErrors({});
              navigation.navigate('DataRental', {dataAdded: true});
            },
          },
        ]);
      })
      .catch(error => {
        console.log(`Gagal Simpan Data : ${error}`);
      });
  };
  useEffect(() => {
    // Konversi harga mobil dan lama hari menjadi angka
    const hargaMobilNumber = parseFloat(selectedMobil.hargamobil);
    const lamaHariNumber = parseFloat(lamahari);

    // Hitung total
    if (!isNaN(hargaMobilNumber) && !isNaN(lamaHariNumber)) {
      const total = hargaMobilNumber * lamaHariNumber;
      setTotal(total.toString());
    }
  }, [selectedMobil.hargamobil, lamahari]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.container}>
        <Input
          value={koderental}
          onChangeText={setKodeRental}
          label="Kode Rental"
          labelStyle={styles.labelInput}
          placeholder="Input Kode Rental..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.koderental}
        />
        <View style={styles.inputRow}>
          <View style={{flex: 4, marginRight: 10}}>
            <Input
              label="Kode Pelanggan"
              labelStyle={styles.labelInput}
              placeholder="Cari Pelanggan..."
              disabled={true}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              value={`${selectedPelanggan.kdpelanggan} - ${selectedPelanggan.nama}`}
              errorMessage={validationErrors.kdpelanggan}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Cari"
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                height: 50,
                backgroundColor: '#5F8670',
                borderRadius: 10,
              }}
              onPress={modalSearchPelanggan}
            />
            <ModalDataPelanggan
              isVisible={modalPelangganVisible}
              onClose={() => setModalPelangganVisible(false)}
              onPelangganSelected={onPelangganSelected}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={{flex: 4, marginRight: 10}}>
            <Input
              label="Kode Mobil"
              labelStyle={styles.labelInput}
              placeholder="Cari Mobil..."
              disabled={true}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              value={`${selectedMobil.kode} - ${selectedMobil.nama}`}
              errorMessage={validationErrors.kdmobil}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Cari"
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                height: 50,
                backgroundColor: '#5F8670',
                borderRadius: 10,
              }}
              onPress={modalSearchMobil}
            />
            <ModalDataMobil
              isVisible={modalMobilVisible}
              onClose={() => setModalMobilVisible(false)}
              onMobilSelected={onMobilSelected}
            />
          </View>
        </View>
        <Input
          value={`${selectedMobil.hargamobil}`}
          onChangeText={setHargamobil}
          label="hargamobil Mobil"
          labelStyle={styles.labelInput}
          disabled={true}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />

        <View style={styles.dateContainer}>
          <Button
            title="Pilih Tanggal Mulai"
            buttonStyle={{
              backgroundColor: '#5F8670',
            }}
            onPress={() => {
              setCurrentPicker('start');
              setShowPicker(true);
            }}
            icon={<Icon name="calendar" size={15} color="white" />}
          />
          {showPicker && currentPicker === 'start' && (
            <DateTimePicker
              value={TanggalMulai}
              mode="date"
              display="default"
              onChange={onDateChange} // Perubahan disini
              isVisible={showPicker}
            />
          )}
          <Text style={styles.dateDisplay}>
            Tanggal Mulai: {formatDate(TanggalMulai)}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Button
            title="Pilih Tanggal Selesai"
            buttonStyle={{
              backgroundColor: '#5F8670',
            }}
            onPress={() => {
              setCurrentPicker('end');
              setShowPicker(true);
            }}
            icon={<Icon name="calendar" size={15} color="white" />}
          />
          {showPicker && currentPicker === 'end' && (
            <DateTimePicker
              value={TanggalSelesai}
              mode="date"
              display="default"
              onChange={onDateChange} // Perubahan disini
              isVisible={showPicker}
            />
          )}
          <Text style={styles.dateDisplay}>
            Tanggal Selesai: {formatDate(TanggalSelesai)}
          </Text>
        </View>

        <Input
          value={lamahari}
          onChangeText={setLamahari}
          label="Lama Hari"
          labelStyle={styles.labelInput}
          placeholder="Input Lama Sewa..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.lamahari}
        />
        <Input
          value={total}
          onChangeText={setTotal}
          label="Total"
          labelStyle={styles.labelInput}
          placeholder="Input Total..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.total}
        />
        <Button
          title={loading ? 'Tunggu...' : 'Simpan Data'}
          disabled={loading}
          onPress={submitRental}
          buttonStyle={{
            marginHorizontal: 10,
            backgroundColor: '#5F8670',
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 5,
  },
  labelInput: {
    color: '#000',
    borderBottomColor: '#000',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
    elevation: 3,
  },
  inputText: {
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 25,
  },
  dateContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  dateDisplay: {
    marginTop: 10,
    marginLeft: 10,
  },
});
