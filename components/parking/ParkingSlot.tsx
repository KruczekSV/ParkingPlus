import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "@/styles/parking/parking.styles";
import { IParkingSpace } from "@/types/IParkingSpace";

type ParkingSlotProps = {
  slot: IParkingSpace;
  onPress: () => void;
};

const ParkingSlot = ({ slot, onPress }: ParkingSlotProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.slot,
        slot.status === "free" ? styles.freeSlot : styles.takenSlot,
      ]}
      onPress={onPress}
    >
      <Text style={styles.slotText}>{slot.spaceNumber}</Text>
    </TouchableOpacity>
  );
};

export default ParkingSlot;
