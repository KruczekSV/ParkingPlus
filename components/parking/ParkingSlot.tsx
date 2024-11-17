import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ParkingSlot as ParkingSlotType } from "@/app/(admin)/parking";
import styles from "@/styles/parking/parking.styles";

type ParkingSlotProps = {
  slot: ParkingSlotType;
  onPress: () => void;
};

const ParkingSlot = ({ slot, onPress }: ParkingSlotProps) => {
  return (
    <TouchableOpacity
      style={[styles.slot, slot.isFree ? styles.freeSlot : styles.takenSlot]}
      onPress={onPress}
    >
      <Text style={styles.slotText}>{slot.id}</Text>
    </TouchableOpacity>
  );
};

export default ParkingSlot;
