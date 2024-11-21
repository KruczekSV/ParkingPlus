import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import styles from "@/styles/parking/profile.styles";
import { IUser } from "@/types/IUser";
import { useStorage } from "@/hooks/api/useStorage";
import { useAuth } from "@/hooks/api/useAuth";

export default function ProfileScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState<IUser>();
  const router = useRouter();
  const { storage } = useStorage();
  const { auth } = useAuth();

  const handleLogout = () => {
    auth
      .signout()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await storage.async.getJSON<IUser>("user");
      if (user) {
        setUser(user);
      }
    };

    fetchUser();
  }, [storage]);
  return (
    <ImageBackground
      source={require("@/assets/images/login.png")}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={user?.username}
          editable={false}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={user?.password}
          secureTextEntry={!isPasswordVisible}
          editable={false}
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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
