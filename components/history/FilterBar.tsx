import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "@/styles/history/FilterBar";

type FilterBarProps = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  spot: string;
  setSpot: (value: string) => void;
  plate: string;
  setPlate: (value: string) => void;
  date: Date | null;
  setDate: (value: Date | null) => void;
};

export default function FilterBar({
  status,
  setStatus,
  spot,
  setSpot,
  plate,
  setPlate,
  date,
  setDate,
}: FilterBarProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Any", value: "any" },
    { label: "Still in parking", value: "Still in parking" },
    { label: "Left", value: "Left" },
  ]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.filterBar}>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Spot"
          keyboardType="numeric"
          value={spot}
          onChangeText={setSpot}
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="car-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Plate"
          value={plate}
          onChangeText={setPlate}
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity
        style={styles.datePickerTrigger}
        onPress={showDatePicker}
      >
        <Ionicons name="calendar-outline" size={20} color="#666" />
        <Text style={styles.datePickerText}>
          {date ? date.toLocaleDateString("en-GB") : "Select Date"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display="spinner"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        backdropStyleIOS={styles.backdropStyle}
        pickerContainerStyleIOS={styles.pickerContainerStyle}
        pickerComponentStyleIOS={styles.pickerComponentStyle}
      />

      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
          placeholder="Filter by status"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => {
          setDate(null);
          setPlate("");
          setSpot("");
          setStatus("");
        }}
      >
        <Ionicons name="close-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
}
