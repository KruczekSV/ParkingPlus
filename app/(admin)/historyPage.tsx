import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styles from "@/styles/parking/history.styles";
import FilterBar from "@/components/history/FilterBar";
import HistoryCard from "@/components/history/HistoryCard";

type CarData = {
  id: number;
  spotNumber: number;
  licensePlate: string;
  entryDate: string;
  entryTime: string;
  status: string;
  duration?: string;
  cost?: number;
};

const sampleData: CarData[] = [
  {
    id: 1,
    spotNumber: 1,
    licensePlate: "CT2180X",
    entryDate: "05.10.2024",
    entryTime: "14:18",
    status: "Still in parking",
  },
  {
    id: 2,
    spotNumber: 31,
    licensePlate: "EZG69708",
    entryDate: "05.10.2024",
    entryTime: "14:18",
    status: "Left",
    duration: "0h 44m",
    cost: 6,
  },
];

export default function HistoryPage() {
  const [data, setData] = useState<CarData[]>(sampleData);
  const [filteredData, setFilteredData] = useState<CarData[]>(sampleData);
  const [status, setStatus] = useState<string>("");
  const [spot, setSpot] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSpot = spot
        ? item.spotNumber.toString().includes(spot)
        : true;
      const matchesPlate = plate ? item.licensePlate.includes(plate) : true;
      const matchesStatus = status
        ? item.status === status || status === "any"
        : true;
      const matchesDate = date
        ? item.entryDate === date.toLocaleDateString("en-GB")
        : true;
      return matchesSpot && matchesPlate && matchesStatus && matchesDate;
    });
    setFilteredData(filtered);
  }, [spot, plate, status, date, data]);

  const renderCard = ({ item }: { item: CarData }) => <HistoryCard {...item} />;

  return (
    <View style={styles.container}>
      <FilterBar
        status={status}
        setStatus={setStatus}
        spot={spot}
        setSpot={setSpot}
        plate={plate}
        setPlate={setPlate}
        date={date}
        setDate={setDate}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        contentContainerStyle={styles.cardList}
        numColumns={2}
      />
    </View>
  );
}
