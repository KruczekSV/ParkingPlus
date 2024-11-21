import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/userPanel/YourCars";

export default function CarsSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your cars</Text>
      <View style={styles.column}>
        <Text style={styles.msg}>So far you</Text>
        <Text style={styles.msg}>
          registered
          {true ? (
            <Text style={styles.boldText}> 6 </Text>
          ) : (
            <Text style={styles.boldText}> none </Text>
          )}
          cars.
        </Text>
      </View>

      <View style={styles.rowButton}>
        {true && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
