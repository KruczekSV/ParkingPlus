import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "@/styles/parking/parking.styles";
import StatusDisplay from "@components/parking/StatusDisplay";
import ParkingSlotGrid from "@components/parking/ParkingSlotGrid";
import SlotDetailsModal from "@/components/parking/SlotDetailsModal";

export type ParkingSlot = {
  id: number;
  isFree: boolean;
  licensePlate?: string;
  imageUrl?: string;
  entranceTime?: Date;
};
export default function ParkingScreen() {
  const [time, setTime] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const modalizeRef = useRef<Modalize>(null);

  const slots: ParkingSlot[] = [
    { id: 1, isFree: true },
    {
      id: 2,
      isFree: false,
      licensePlate: "CT2180X",
      imageUrl: "../../assets/images/cars/car.jpg",
      entranceTime: new Date(),
    },
    { id: 3, isFree: true },
    {
      id: 4,
      isFree: false,
      licensePlate: "WZ1234A",
      imageUrl: "../../assets/images/cars/car2.jpg",
      entranceTime: new Date(),
    },
    {
      id: 5,
      isFree: false,
      licensePlate: "KR4512L",
      imageUrl: "../../assets/images/cars/car3.jpg",
      entranceTime: new Date(),
    },
    { id: 6, isFree: true },
    { id: 7, isFree: true },
    {
      id: 8,
      isFree: false,
      licensePlate: "GD7654R",
      imageUrl: "../../assets/images/cars/car4.jpg",
      entranceTime: new Date(),
    },
    {
      id: 9,
      isFree: false,
      licensePlate: "PO2345B",
      imageUrl: "../../assets/images/cars/car5.jpg",
      entranceTime: new Date(),
    },
    { id: 10, isFree: true },
    { id: 11, isFree: true },
    {
      id: 12,
      isFree: false,
      licensePlate: "WA9812Z",
      imageUrl: "../../assets/images/cars/car6.jpg",
      entranceTime: new Date(),
    },
    {
      id: 13,
      isFree: false,
      licensePlate: "LD4321X",
      imageUrl: "../../assets/images/cars/car7.jpg",
      entranceTime: new Date(),
    },
    { id: 14, isFree: true },
    { id: 15, isFree: true },
    {
      id: 16,
      isFree: false,
      licensePlate: "KT2210P",
      imageUrl: "../../assets/images/cars/car8.jpg",
      entranceTime: new Date(),
    },
    {
      id: 17,
      isFree: false,
      licensePlate: "OP5523L",
      imageUrl: "../../assets/images/cars/car9.jpg",
      entranceTime: new Date(),
    },
    { id: 18, isFree: true },
    {
      id: 19,
      isFree: false,
      licensePlate: "ZG8721Q",
      imageUrl: "../../assets/images/cars/car10.jpg",
      entranceTime: new Date(),
    },
    {
      id: 20,
      isFree: false,
      licensePlate: "SR9912Y",
      imageUrl: "../../assets/images/cars/car11.jpg",
      entranceTime: new Date(),
    },
    { id: 21, isFree: true },
    {
      id: 22,
      isFree: false,
      licensePlate: "PO2210M",
      imageUrl: "../../assets/images/cars/car12.jpg",
      entranceTime: new Date(),
    },
    { id: 23, isFree: true },
    { id: 24, isFree: true },
    { id: 25, isFree: true },
    {
      id: 26,
      isFree: false,
      licensePlate: "CT2180X",
      imageUrl: "../../assets/images/cars/car.jpg",
      entranceTime: new Date(),
    },
    { id: 27, isFree: true },
    {
      id: 28,
      isFree: false,
      licensePlate: "WZ1234A",
      imageUrl: "../../assets/images/cars/car2.jpg",
      entranceTime: new Date(),
    },
    {
      id: 29,
      isFree: false,
      licensePlate: "KR4512L",
      imageUrl: "../../assets/images/cars/car3.jpg",
      entranceTime: new Date(),
    },
    { id: 30, isFree: true },
    { id: 31, isFree: true },
    {
      id: 32,
      isFree: false,
      licensePlate: "GD7654R",
      imageUrl: "../../assets/images/cars/car4.jpg",
      entranceTime: new Date(),
    },
    {
      id: 33,
      isFree: false,
      licensePlate: "PO2345B",
      imageUrl: "../../assets/images/cars/car5.jpg",
      entranceTime: new Date(),
    },
    { id: 34, isFree: true },
    { id: 35, isFree: true },
    {
      id: 36,
      isFree: false,
      licensePlate: "WA9812Z",
      imageUrl: "../../assets/images/cars/car6.jpg",
      entranceTime: new Date(),
    },
    {
      id: 37,
      isFree: false,
      licensePlate: "LD4321X",
      imageUrl: "../../assets/images/cars/car7.jpg",
      entranceTime: new Date(),
    },
    { id: 38, isFree: true },
    { id: 39, isFree: true },
    {
      id: 40,
      isFree: false,
      licensePlate: "KT2210P",
      imageUrl: "../../assets/images/cars/car8.jpg",
      entranceTime: new Date(),
    },
    {
      id: 41,
      isFree: false,
      licensePlate: "OP5523L",
      imageUrl: "../../assets/images/cars/car9.jpg",
      entranceTime: new Date(),
    },
    { id: 42, isFree: true },
    {
      id: 43,
      isFree: false,
      licensePlate: "ZG8721Q",
      imageUrl: "../../assets/images/cars/car10.jpg",
      entranceTime: new Date(),
    },
    {
      id: 44,
      isFree: false,
      licensePlate: "SR9912Y",
      imageUrl: "../../assets/images/cars/car11.jpg",
      entranceTime: new Date(),
    },
    { id: 45, isFree: true },
    {
      id: 46,
      isFree: false,
      licensePlate: "PO2210M",
      imageUrl: "../../assets/images/cars/car12.jpg",
      entranceTime: new Date(),
    },
    { id: 47, isFree: true },
    { id: 48, isFree: true },
    { id: 49, isFree: true },
    { id: 50, isFree: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSlotPress = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    modalizeRef.current?.open();
  };

  const freeCount = slots.filter((slot) => slot.isFree).length;
  const takenCount = slots.length - freeCount;

  return (
    <View style={styles.container}>
      <StatusDisplay
        time={time}
        freeCount={freeCount}
        takenCount={takenCount}
      />
      <ParkingSlotGrid slots={slots} onSlotPress={handleSlotPress} />
      <SlotDetailsModal selectedSlot={selectedSlot} modalizeRef={modalizeRef} />
    </View>
  );
}
