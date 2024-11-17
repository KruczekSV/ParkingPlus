import React from "react";
import { FlatList } from "react-native";
import ParkingSlot from "./ParkingSlot";
import { ParkingSlot as ParkingSlotType } from "@/app/(admin)/parking";
import styles from "@/styles/parking/parking.styles";

type ParkingSlotGridProps = {
  slots: ParkingSlotType[];
  onSlotPress: (slot: ParkingSlotType) => void;
};

const ParkingSlotGrid = ({ slots, onSlotPress }: ParkingSlotGridProps) => {
  return (
    <FlatList
      data={slots}
      numColumns={4}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ParkingSlot slot={item} onPress={() => onSlotPress(item)} />
      )}
      contentContainerStyle={styles.grid}
    />
  );
};

export default ParkingSlotGrid;
