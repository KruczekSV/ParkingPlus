import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import ParkingSlot from "./ParkingSlot";
import styles from "@/styles/parking/parking.styles";
import { IParkingSpace } from "@/types/IParkingSpace";

type ParkingSlotGridProps = {
  slots: IParkingSpace[];
  onSlotPress: (slot: IParkingSpace) => void;
  onRefresh: () => void;
};

const ParkingSlotGrid = ({
  slots,
  onSlotPress,
  onRefresh,
}: ParkingSlotGridProps) => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <FlatList
      data={slots}
      numColumns={4}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <ParkingSlot slot={item} onPress={() => onSlotPress(item)} />
      )}
      contentContainerStyle={styles.grid}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ParkingSlotGrid;
