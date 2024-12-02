import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/userPanel/YourCars";
import AddCarModal from "./AddCarModal";
import { Modalize } from "react-native-modalize";
import { useCar } from "@/hooks/api/useCar";
import { ICar } from "@/types/ICar";
import RemoveCarModal from "./RemoveCarModal";

type YourCarsProps = {
  cars: ICar[];
  onCarAction: () => void;
};

export default function CarsSection({ onCarAction, cars }: YourCarsProps) {
  const addCarModalRef = useRef<Modalize>(null);
  const removeCarModalRef = useRef<Modalize>(null);

  const openAddCarModal = () => {
    addCarModalRef.current?.open();
  };

  const openRemoveCarModal = () => {
    removeCarModalRef.current?.open();
  };

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>Your cars</Text>
        <View style={styles.column}>
          <Text style={styles.msg}>So far you</Text>
          <Text style={styles.msg}>
            registered
            {cars.length > 0 ? (
              <Text style={styles.boldText}> {cars.length} </Text>
            ) : (
              <Text style={styles.boldText}> none </Text>
            )}
            cars.
          </Text>
        </View>

        <View style={styles.rowButton}>
          {cars.length > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={openRemoveCarModal}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={openAddCarModal}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddCarModal modalizeRef={addCarModalRef} onCarAction={onCarAction} />
      <RemoveCarModal
        modalizeRef={removeCarModalRef}
        cars={cars}
        onCarRemoved={onCarAction}
      />
    </>
  );
}
