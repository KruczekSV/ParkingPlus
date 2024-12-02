import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "@/styles/parking/parking.styles";
import { useCar } from "@/hooks/api/useCar";
import { ICar } from "@/types/ICar";
import DropDownPicker from "react-native-dropdown-picker";

type SlotDetailsModalProps = {
  modalizeRef: React.RefObject<Modalize>;
  cars: ICar[];
  onCarRemoved: () => void;
};

const RemoveCarModal = ({
  modalizeRef,
  cars,
  onCarRemoved,
}: SlotDetailsModalProps) => {
  const { car } = useCar();
  const [selectedPlate, setSelectedPlate] = useState<string>("");
  const [open, setOpen] = useState(false);

  const {
    execute: removeCar,
    loading: loadingRemoveCar,
    error: errorRemoveCar,
  } = car.delete;

  const handleRemoveCar = async () => {
    if (selectedPlate) {
      console.log(`Removing car: ${selectedPlate}`);
      const payload = { registrationPlate: selectedPlate };
      await removeCar(selectedPlate);
      onCarRemoved();
      if (modalizeRef.current) {
        modalizeRef.current.close();
      }
    } else {
      alert("Please select a car.");
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={700}
      modalStyle={{ width: "100%" }}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Withdraw car</Text>
          <Text style={styles.modalDescription}>
            Select license plate of your car to remove it.
          </Text>
          <View style={styles.inputAndButton}>
            <View style={{ width: "50%" }}>
              <DropDownPicker
                open={open}
                value={selectedPlate}
                listMode="SCROLLVIEW"
                maxHeight={50}
                items={cars.map((car) => ({
                  label: car.registrationPlate,
                  value: car._id,
                }))}
                setValue={setSelectedPlate}
                setOpen={setOpen}
                style={{
                  backgroundColor: "#f0f0f0",
                  width: "100%",
                }}
                dropDownContainerStyle={{ width: "100%" }}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleRemoveCar}
            >
              <Text style={styles.addButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modalize>
  );
};

export default RemoveCarModal;
