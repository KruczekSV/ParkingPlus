import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "@/styles/parking/userPanel.styles";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      {/* Sekcja salda */}
      <View style={styles.card}>
        <Text style={styles.title}>13:28</Text>
        <Text style={styles.date}>January 18, 2024</Text>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.amount}>40 PLN</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add funds</Text>
        </TouchableOpacity>
      </View>

      {/* Sekcja ostatniego parkowania */}
      <View style={styles.card}>
        <Text style={styles.title}>Last park</Text>
        <Text style={styles.date}>January 7, 2024</Text>
        <Text style={styles.label}>Plate</Text>
        <Text style={styles.info}>EZG12303</Text>
        <Text style={styles.label}>Cost</Text>
        <Text style={styles.info}>40 PLN</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Park</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sekcja samochodów */}
      <View style={styles.card}>
        <Text style={styles.title}>Your cars</Text>
        <Text style={styles.description}>
          So far you registered <Text style={styles.boldText}>6</Text> cars.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
