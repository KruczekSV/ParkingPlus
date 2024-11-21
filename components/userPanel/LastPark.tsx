import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/userPanel/LastPark";

export default function LastParkSection() {
  return (
    <View style={styles.card}>
      {true ? (
        <>
          <View style={styles.row}>
            <Text style={styles.title}>Last park</Text>
            <Text style={styles.date}>January 7, 2024</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Plate</Text>
            <Text style={styles.info}>EZG12303</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cost</Text>
            <Text style={styles.info}>40 PLN</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.title}>Last park</Text>
          </View>
          <View style={styles.column}>
            {true ? (
              <>
                <Text style={styles.msg}>You haven’t</Text>
                <Text style={styles.msg}>parked yet.</Text>
                <Text style={styles.msg}>Let’s change that.</Text>
              </>
            ) : (
              <>
                <Text style={styles.msg}>You don’t have any</Text>
                <Text style={styles.msg}> cars to park yet.</Text>
                <Text style={styles.msg}>Add first one</Text>
                <Text style={styles.msg}>below.</Text>
              </>
            )}
          </View>
        </>
      )}

      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pricing</Text>
        </TouchableOpacity>
        {true && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Park</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
