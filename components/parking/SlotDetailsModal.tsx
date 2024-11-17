import React from "react";
import { View, Text, Image } from "react-native";
import { Modalize } from "react-native-modalize";
import { ParkingSlot } from "@/app/(admin)/parking";
import styles from "@/styles/parking/parking.styles";

type SlotDetailsModalProps = {
  selectedSlot: ParkingSlot | null;
  modalizeRef: React.RefObject<Modalize>;
};

const SlotDetailsModal = ({
  selectedSlot,
  modalizeRef,
}: SlotDetailsModalProps) => {
  if (!selectedSlot) return null;

  return (
    <Modalize ref={modalizeRef} snapPoint={500} modalHeight={500}>
      <View style={styles.drawerContent}>
        {selectedSlot.isFree ? (
          <>
            <View
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={[styles.slotNumber, styles.freeSlot]}>
                <Text style={styles.slotText}>{selectedSlot.id}</Text>
              </View>
              <Text style={styles.statusText}>Slot is empty</Text>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                width: "70%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={[styles.slotNumber, styles.takenSlot]}>
                <Text style={styles.slotText}>{selectedSlot.id}</Text>
              </View>
              <Text style={styles.licensePlate}>
                {selectedSlot.licensePlate}
              </Text>
            </View>
            {selectedSlot.imageUrl && (
              <Image
                source={require("@/assets/images/cars/car1.jpg")} // upewnij się, że importujesz poprawnie
                style={styles.carImage}
              />
            )}
            <Text style={styles.entranceLabel}>Time of entrance</Text>
            {selectedSlot.entranceTime && (
              <>
                <Text style={styles.time}>
                  {selectedSlot.entranceTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={styles.date}>
                  {selectedSlot.entranceTime.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Text style={styles.date}>
                  {selectedSlot.entranceTime.toLocaleDateString("en-US", {
                    year: "numeric",
                  })}
                </Text>
              </>
            )}
          </>
        )}
      </View>
    </Modalize>
  );
};

export default SlotDetailsModal;
