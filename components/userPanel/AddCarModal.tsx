import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "@/styles/parking/parking.styles";
import { useCar } from "@/hooks/api/useCar";

type SlotDetailsModalProps = {
  modalizeRef: React.RefObject<Modalize>;
  onCarAction: () => void;
};

const AddCarModal = ({ modalizeRef, onCarAction }: SlotDetailsModalProps) => {
  const { car } = useCar();
  const [registrationPlate, setRegistrationPlate] = useState("");

  const {
    execute: addCar,
    loading: loadingAddCar,
    error: errorAddCar,
    value: AddCar,
  } = car.add;

  const handleAddCar = async () => {
    if (registrationPlate) {
      console.log(`Added car: ${registrationPlate}`);
      const payload = { registrationPlate };
      await addCar(payload);
      onCarAction();
      setRegistrationPlate("");
      if (modalizeRef.current) {
        modalizeRef.current.close();
      }
    } else {
      alert("Please enter an amount.");
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={700}
      modalStyle={{ width: "100%", borderWidth: 0 }}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Register car</Text>
          <Text style={styles.modalDescription}>
            Provide license plate for new car.
          </Text>
          <View style={styles.inputAndButton}>
            <TextInput
              placeholder="Registration plate"
              style={styles.input}
              value={registrationPlate}
              onChangeText={setRegistrationPlate}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modalize>
  );
};

export default AddCarModal;
