import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/userPanel/Balance";

export default function BalanceSection() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.date}>
            {time.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.amount}>40 PLN</Text>
      </View>

      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add funds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
