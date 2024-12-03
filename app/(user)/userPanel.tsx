import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import styles from "@/styles/parking/userPanel.styles";
import BalanceSection from "@/components/userPanel/Balance";
import LastParkSection from "@/components/userPanel/LastPark";
import CarsSection from "@/components/userPanel/YourCars";
import { useCar } from "@/hooks/api/useCar";
import { ICar } from "@/types/ICar";
import { useParkingAction } from "@/hooks/api/useParkingAction";
import { useUser } from "@/hooks/api/useUser";
import { IParkingAction } from "@/types/IParkingAction";
import { ParkingActionStatus } from "@/types/IParkingActionStatus";

const calculateCost = (start: string, end: string): number => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const durationHours = Math.ceil((endTime - startTime) / (1000 * 60 * 60));

  let cost = 0;
  let remainingHours = durationHours;

  if (remainingHours > 0) {
    const firstTwoHours = Math.min(2, remainingHours);
    cost += firstTwoHours * 6;
    remainingHours -= firstTwoHours;
  }

  if (remainingHours > 0) {
    const nextTwoHours = Math.min(2, remainingHours);
    cost += nextTwoHours * 8;
    remainingHours -= nextTwoHours;
  }

  if (remainingHours > 0) {
    cost += remainingHours * 4;
  }

  return cost;
};

export default function DashboardScreen() {
  const { car } = useCar();
  const { user } = useUser();
  const { parkingAction } = useParkingAction();
  const [data, setData] = useState<ICar[]>([]);
  const [lastAction, setLastAction] = useState<IParkingAction | null>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [anyAction, setAnyAction] = useState<boolean>(false);
  const [cost, setCost] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {
    execute: getCars,
    loading: loadingGetCars,
    error: errorGetCars,
    value: GetCars,
  } = car.getAll;

  const {
    execute: getAllParkingActions,
    loading: loadingParkingActions,
    error: errorParkingActions,
    value: ParkingActions,
  } = parkingAction.getAll;

  const {
    execute: getFunds,
    loading: loadingFunds,
    error: errorFunds,
    value: Funds,
  } = user.getFunds;

  const update = async () => {
    await getCars();
    await getAllParkingActions();
    await getFunds();
  };

  useEffect(() => {
    update();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await update();
    setRefreshing(false);
  };

  useEffect(() => {
    if (GetCars) {
      const extractedData = GetCars.data.map((item: ICar) => item);
      setData(extractedData);
    }
  }, [GetCars]);

  useEffect(() => {
    if (ParkingActions && ParkingActions.length > 0) {
      const lastAction = ParkingActions[ParkingActions.length - 1];
      setLastAction(lastAction);
      setAnyAction(true);

      if (lastAction.status == ParkingActionStatus.Paid) {
        setIsPaid(true);
        setCost(calculateCost(lastAction.parkTime, lastAction.leaveTime));
      } else {
        setIsPaid(false);
        setCost(calculateCost(lastAction.parkTime, new Date().toISOString()));
      }
    } else {
      setAnyAction(false);
    }
  }, [ParkingActions]);

  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <BalanceSection onCarAction={update} Funds={Funds} />
        <LastParkSection
          cars={data}
          ParkingActions={ParkingActions}
          onCarAction={update}
          lastAction={lastAction}
          isPaid={isPaid}
          anyAction={anyAction}
          cost={cost}
        />
        {lastAction?.status == ParkingActionStatus.Paid ? (
          <CarsSection cars={data} onCarAction={update} />
        ) : data.length == 0 ? (
          <CarsSection cars={data} onCarAction={update} />
        ) : !anyAction ? (
          <CarsSection cars={data} onCarAction={update} />
        ) : null}
      </View>
    </ScrollView>
  );
}
