import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "@/styles/history/HistoryCard";
import { IParkingAction } from "@/types/IParkingAction";
import { ParkingActionStatus } from "@/types/IParkingActionStatus";
export type Duration = {
  hours: number;
  minutes: number;
};
const calculateDuration = (start: string, end: string): Duration => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const durationMs = endTime - startTime;

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  const duration = {
    hours: hours,
    minutes: minutes,
  };

  return duration;
};

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

export default function HistoryCard({
  id,
  parkingSpaceId,
  parkingSpaceNumber,
  carId,
  carRegistrationPlate,
  status,
  parkTime,
  leaveTime,
}: IParkingAction) {
  const duration = calculateDuration(
    parkTime,
    leaveTime || new Date().toISOString()
  );
  const cost =
    status === ParkingActionStatus.Paid
      ? calculateCost(parkTime, leaveTime || new Date().toISOString())
      : null;

  return (
    <View style={styles.card}>
      <View style={styles.placeAndPlate}>
        <View style={styles.spotNumberContainer}>
          <Text style={styles.spotNumber}>{parkingSpaceNumber}</Text>
        </View>
        <Text style={styles.licensePlate}>{carRegistrationPlate}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.dateTime}>
            {new Date(parkTime).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.dateTime}>
            {new Date(parkTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </View>
        <View style={styles.infoColumn2}>
          {/* <Text
            style={{
              fontSize: 14,
              color:
                status === ParkingActionStatus.Pending ? "#4CAF50" : "#FF3B30",
              fontWeight: "bold",
            }}
          >
            {status}
          </Text> */}
          {status === ParkingActionStatus.Paid ? (
            <View style={styles.costAndDuration}>
              <Text style={styles.duration}>{duration.hours}h</Text>
              <Text style={styles.duration}>{duration.minutes}m</Text>
              <Text style={styles.cost}> {cost} PLN</Text>
            </View>
          ) : (
            <View style={styles.costAndDuration}>
              <Text style={styles.duration}>Still in</Text>
              <Text style={styles.duration}>parking</Text>
              {/* <Text style={styles.cost}> {cost} PLN</Text> */}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
