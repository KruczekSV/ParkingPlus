import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "@/styles/parking/userPanel.styles";
import BalanceSection from "@/components/userPanel/Balance";
import LastParkSection from "@/components/userPanel/LastPark";
import CarsSection from "@/components/userPanel/YourCars";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <BalanceSection />
      <LastParkSection />
      <CarsSection />
    </View>
  );
}
