import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "@/styles/parking/history.styles";

type CarData = {
  id: number;
  spotNumber: number;
  licensePlate: string;
  entryDate: string;
  entryTime: string;
  status: string;
  duration?: string;
  cost?: number;
};

const sampleData: CarData[] = [
  {
    id: 1,
    spotNumber: 1,
    licensePlate: "CT2180X",
    entryDate: "05.10.2024",
    entryTime: "14:18",
    status: "Still in parking",
  },
  {
    id: 2,
    spotNumber: 31,
    licensePlate: "EZG69708",
    entryDate: "05.10.2024",
    entryTime: "14:18",
    status: "Left",
    duration: "0h 44m",
    cost: 6,
  },
];

export default function ParkingListScreen() {
  const [data, setData] = useState<CarData[]>(sampleData);
  const [filteredData, setFilteredData] = useState<CarData[]>(sampleData);
  const [status, setStatus] = useState<string>("");
  const [spot, setSpot] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Funkcja filtrująca
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSpot = spot
        ? item.spotNumber.toString().includes(spot)
        : true;
      const matchesPlate = plate ? item.licensePlate.includes(plate) : true;
      const matchesStatus = status ? item.status === status : true;
      const matchesDate = date
        ? item.entryDate === date.toLocaleDateString("en-GB")
        : true;
      return matchesSpot && matchesPlate && matchesStatus && matchesDate;
    });
    setFilteredData(filtered);
  }, [spot, plate, status, date, data]);

  const renderCard = ({ item }: { item: CarData }) => (
    <View style={styles.card}>
      <View style={styles.spotNumberContainer}>
        <Text style={styles.spotNumber}>{item.spotNumber}</Text>
      </View>
      <Text style={styles.licensePlate}>{item.licensePlate}</Text>
      <Text style={styles.dateTime}>
        {item.entryDate} {item.entryTime}
      </Text>
      <Text style={styles.status}>{item.status}</Text>
      {item.status === "Left" && (
        <>
          <Text style={styles.duration}>{item.duration}</Text>
          <Text style={styles.cost}>{item.cost} PLN</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sekcja filtrów */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Filter by spot"
          keyboardType="numeric"
          value={spot}
          onChangeText={setSpot}
        />

        <TextInput
          style={styles.input}
          placeholder="Filter by plate"
          value={plate}
          onChangeText={setPlate}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.filterButtonText}>
            {date ? date.toLocaleDateString("en-GB") : "Filter by date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={(event: any, selectedDate?: Date) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue: string) => setStatus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Filter by status" value="" />
            <Picker.Item label="Still in parking" value="Still in parking" />
            <Picker.Item label="Left" value="Left" />
          </Picker>
        </View>
      </View>

      {/* Lista kart */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        contentContainerStyle={styles.cardList}
        numColumns={2}
      />
    </View>
  );
}
