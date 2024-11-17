import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import styles from "@/styles/parking/profile.styles";

export default function ProfileScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Username Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value="Username (readonly)"
          editable={false} // Ustawienie pola jako tylko do odczytu
          placeholderTextColor="#999"
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value="Password (readonly)"
          secureTextEntry={!isPasswordVisible}
          editable={false} // Ustawienie pola jako tylko do odczytu
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Link href="/login" style={styles.logoutButtonText}>
          Logout
        </Link>
        {/* <Text style={styles.logoutButtonText}>Logout</Text> */}
      </TouchableOpacity>
    </View>
  );
}
