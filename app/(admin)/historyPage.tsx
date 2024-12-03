import React, { useState, useEffect } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import styles from "@/styles/parking/history.styles";
import FilterBar from "@/components/history/FilterBar";
import HistoryCard from "@/components/history/HistoryCard";
import { useParkingAction } from "@/hooks/api/useParkingAction";
import { IParkingAction } from "@/types/IParkingAction";
import { ParkingActionStatus } from "@/types/IParkingActionStatus";
import { useStorage } from "@/hooks/api/useStorage";

export default function HistoryPage() {
  const [filteredData, setFilteredData] = useState<IParkingAction[]>();
  const [status, setStatus] = useState<ParkingActionStatus>(
    ParkingActionStatus.Any
  );
  const [spot, setSpot] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { parkingAction } = useParkingAction();
  const [data, setData] = useState<IParkingAction[]>([]);
  const storage = useStorage();

  const {
    execute: getAllParkingActions,
    loading: loadingParkingActions,
    error: errorParkingActions,
    value: ParkingActions,
  } = parkingAction.getAll;

  async function fetchUser() {
    const user = await storage.getJSON("user");
  }

  async function fetchData() {
    setData([]);
    await getAllParkingActions();
    await fetchUser();
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (ParkingActions) {
      setData(ParkingActions);
    }
  }, [ParkingActions]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSpot = spot
        ? item.parkingSpaceNumber.toString().includes(spot)
        : true;
      const matchesPlate = plate
        ? item.carRegistrationPlate.includes(plate)
        : true;
      const matchesStatus = status
        ? item.status === status || status === ParkingActionStatus.Any
        : true;
      const matchesDate = date
        ? new Date(item.parkTime).toLocaleDateString("en-GB") ===
          date.toLocaleDateString("en-GB")
        : true;
      return matchesSpot && matchesPlate && matchesStatus && matchesDate;
    });
    setFilteredData(filtered);
  }, [spot, plate, status, date, data]);

  const renderCard = ({ item }: { item: IParkingAction }) => (
    <HistoryCard {...item} />
  );

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
