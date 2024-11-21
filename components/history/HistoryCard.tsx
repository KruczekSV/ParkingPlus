import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "@/styles/history/HistoryCard";

type CarCardProps = {
  spotNumber: number;
  licensePlate: string;
  entryDate: string;
  entryTime: string;
  status: string;
  duration?: string;
  cost?: number;
};

export default function HistoryCard({
  spotNumber,
  licensePlate,
  entryDate,
  entryTime,
  status,
  duration,
  cost,
}: CarCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.placeAndPlate}>
        <View style={styles.spotNumberContainer}>
          <Text style={styles.spotNumber}>{spotNumber}</Text>
        </View>
        <Text style={styles.licensePlate}>{licensePlate}</Text>
      </View>
      <Text style={styles.dateTime}>
        {entryDate} {entryTime}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: status === "Still in parking" ? "#4CAF50" : "#FF3B30",
          fontWeight: "bold",
        }}
      >
        {status}
      </Text>
      {status === "Left" && (
        <View style={styles.costAndDuration}>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.cost}>{cost} PLN</Text>
        </View>
      )}
    </View>
  );
}
