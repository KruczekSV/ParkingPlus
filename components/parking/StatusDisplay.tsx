import React from "react";
import { View, Text } from "react-native";
import styles from "@/styles/parking/parking.styles";

type StatusDisplayProps = {
  time: Date;
  freeCount: number;
  takenCount: number;
};

const StatusDisplay = ({ time, freeCount, takenCount }: StatusDisplayProps) => {
  return (
    <View style={styles.infoContainer}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={styles.time}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.date}>
            {time.toLocaleDateString("en-GB", {
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={styles.date}>
            {time.toLocaleDateString("en-GB", {
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Free</Text>
          <View style={[styles.statusBadge, { backgroundColor: "#39C0A9" }]}>
            <Text style={styles.statusCount}>{freeCount}</Text>
          </View>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Taken</Text>
          <View style={[styles.statusBadge, { backgroundColor: "#D9534F" }]}>
            <Text style={styles.statusCount}>{takenCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatusDisplay;
