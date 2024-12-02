import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "@/styles/parking/parking.styles";
import StatusDisplay from "@components/parking/StatusDisplay";
import ParkingSlotGrid from "@components/parking/ParkingSlotGrid";
import SlotDetailsModal from "@/components/parking/SlotDetailsModal";
import { useParkingSpace } from "@/hooks/api/useParkingSpace";
import { IParkingSpace } from "@/types/IParkingSpace";

export default function ParkingScreen() {
  const [time, setTime] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<IParkingSpace | null>(null);
  const modalizeRef = useRef<Modalize>(null);
  const { parkingSpace } = useParkingSpace();
  const [data, setData] = useState<IParkingSpace[]>([]);

  const {
    execute: getAllParkingSpaces,
    loading: loadingParkingSpaces,
    error: errorParkingSpaces,
    value: ParkingSpaces,
  } = parkingSpace.getAll;

  useEffect(() => {
    getAllParkingSpaces();
  }, []);

  useEffect(() => {
    if (ParkingSpaces) {
      const extractedData = ParkingSpaces.data.map(
        (item: IParkingSpace) => item
      );
      setData(extractedData);
    }
  }, [ParkingSpaces]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSlotPress = (slot: IParkingSpace) => {
    setSelectedSlot(slot);
    modalizeRef.current?.open();
  };

  const freeCount = data.filter((slot) => slot.status === "free").length;
  const takenCount = data.length - freeCount;

  return (
    <View style={styles.container}>
      <StatusDisplay
        time={time}
        freeCount={freeCount}
        takenCount={takenCount}
      />
      <ParkingSlotGrid
        slots={data}
        onSlotPress={handleSlotPress}
        onRefresh={getAllParkingSpaces}
      />
      <SlotDetailsModal selectedSlot={selectedSlot} modalizeRef={modalizeRef} />
    </View>
  );
}
