import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import styles from "@/styles/userPanel/Balance";
import { IAmount, useUser } from "@/hooks/api/useUser";
import AddFundsModal from "./AddFundsModal";
import { StyleSheet } from "react-native";

type BalanceProps = {
  Funds: number | null;
  onCarAction: () => void;
};

export default function BalanceSection({ onCarAction, Funds }: BalanceProps) {
  const [time, setTime] = useState(new Date());
  const { user } = useUser();
  const [data, setData] = useState<number>();
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const {
    execute: addFunds,
    loading: loadingAddFunds,
    error: errorAddFunds,
    value: AddFunds,
  } = user.addFunds;

  const handleAddFunds = async (amount: number) => {
    try {
      const payload = { amount };
      await addFunds(payload);
      console.log("Zasilono konto");
      onCarAction();
      setModalVisible(false);
      setAmount("");
    } catch (err) {
      console.log("Błąd dodawania płatności");
    }
  };

  useEffect(() => {
    if (Funds) {
      setData(Funds);
      console.log(Funds);
    } else {
      setData(0);
    }
  }, [Funds]);

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
            {time.toLocaleDateString("en-GB", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.amount}>{data} PLN</Text>
      </View>

      <View style={styles.rowButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add funds</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Enter amount</Text>
            <TextInput
              style={modalStyles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={modalStyles.modalButtons}>
              <TouchableOpacity
                style={[modalStyles.button]}
                onPress={() => handleAddFunds(Number(amount))}
              >
                <Text style={modalStyles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={modalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Półprzezroczyste tło
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    width: "36%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
