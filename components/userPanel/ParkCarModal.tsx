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
import { ICar } from "@/types/ICar";
import DropDownPicker from "react-native-dropdown-picker";
import { useParkingSpace } from "@/hooks/api/useParkingSpace";

type SlotDetailsModalProps = {
  modalizeRef: React.RefObject<Modalize>;
  cars: ICar[];
  onCarAction: () => void;
  freeCount: number;
};

const ParkCarModal = ({
  modalizeRef,
  cars,
  onCarAction,
  freeCount,
}: SlotDetailsModalProps) => {
  const { parkingSpace } = useParkingSpace();
  const [selectedPlate, setSelectedPlate] = useState<string>("");
  const [open, setOpen] = useState(false);

  const {
    execute: park,
    loading: loadingPark,
    error: errorPark,
  } = parkingSpace.order;

  const handlePark = async () => {
    if (selectedPlate) {
      const payload = { selectedCar: selectedPlate };
      await park(payload);
      onCarAction();
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
          <Text style={styles.modalTitle}>Park</Text>
          <Text style={styles.modalDescription}>
            There are
            {freeCount != 0 ? (
              <Text style={{ color: "#00CC0E", fontWeight: "bold" }}>
                {" "}
                {freeCount}{" "}
              </Text>
            ) : (
              <Text style={{ color: "#CC003F", fontWeight: "bold" }}>
                {" "}
                none{" "}
              </Text>
            )}
            free parking spots.
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
            <TouchableOpacity style={styles.addButton} onPress={handlePark}>
              <Text style={styles.addButtonText}>Park</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modalize>
  );
};

export default ParkCarModal;
