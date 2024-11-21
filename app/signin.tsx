import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/hooks/api/useAuth";

export default function SigninScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth } = useAuth();

  const handleRegister = async () => {
    if (!username || !password || !passwordConfirm) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await auth.signup.execute(username, password, passwordConfirm);
      console.log("Użytkownik zarejestrowany pomyślnie");
      await auth.signin.execute(username, password);
      console.log("Użytkownik zalogowany pomyślnie");
    } catch (err) {
      console.log("Błąd przy rejestracji");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/login.png")}
      style={styles.container}
    >
      <Text style={styles.title}>Parking+</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Repeat Password"
          placeholderTextColor="#888"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link href="/login" style={styles.createAccount}>
          Use existing account
        </Link>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007FA4",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccount: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
