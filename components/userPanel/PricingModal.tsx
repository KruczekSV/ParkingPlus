import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "@/styles/parking/parking.styles";

type SlotDetailsModalProps = {
  modalizeRef: React.RefObject<Modalize>;
};

const PricingModal = ({ modalizeRef }: SlotDetailsModalProps) => {
  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={700}
      modalStyle={{ width: "100%" }}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Pricing</Text>
          <Text>
            First 2h - <Text style={{ fontWeight: "bold" }}>6 PLN</Text>
            /Hour
          </Text>
          <Text>
            Next 2h - <Text style={{ fontWeight: "bold" }}>8 PLN</Text>/Hour
          </Text>
          <Text>
            Next hours - <Text style={{ fontWeight: "bold" }}>4 PLN</Text>
          </Text>
          <View style={styles.inputAndButton}>
            <TouchableOpacity style={styles.addButton} onPress={handleClose}>
              <Text style={styles.addButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modalize>
  );
};

export default PricingModal;
