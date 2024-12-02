import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "@/styles/parking/parking.styles";
import { IParkingSpace } from "@/types/IParkingSpace";
import {
  IParkingSpaceGetData,
  useParkingSpace,
} from "@/hooks/api/useParkingSpace";

type SlotDetailsModalProps = {
  selectedSlot: IParkingSpace | null;
  modalizeRef: React.RefObject<Modalize>;
};

const SlotDetailsModal = ({
  selectedSlot,
  modalizeRef,
}: SlotDetailsModalProps) => {
  const { parkingSpace } = useParkingSpace();
  const [data, setData] = useState<IParkingSpaceGetData>();

  const {
    execute: getParkingSpace,
    loading: loadingParkingSpace,
    error: errorParkingSpace,
    value: ParkingSpace,
  } = parkingSpace.get;

  useEffect(() => {
    if (selectedSlot?.spaceNumber) {
      getParkingSpace(selectedSlot.spaceNumber);
    }
  }, [selectedSlot?.spaceNumber]);

  useEffect(() => {
    if (ParkingSpace) {
      setData(ParkingSpace.data);
    }
  }, [ParkingSpace]);

  if (!selectedSlot) return null;

  return (
    <Modalize ref={modalizeRef} snapPoint={500} modalHeight={500}>
      <View style={styles.drawerContent}>
        {loadingParkingSpace ? (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading slot details...</Text>
          </View>
        ) : errorParkingSpace ? (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Failed to load parking space details.</Text>
          </View>
        ) : (
          <>
            {selectedSlot.status === "free" ? (
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={[styles.slotNumber, styles.freeSlot]}>
                  <Text style={styles.slotText}>
                    {selectedSlot.spaceNumber}
                  </Text>
                </View>
                <Text style={styles.statusText}>Slot is empty</Text>
              </View>
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
                    <Text style={styles.slotText}>
                      {selectedSlot.spaceNumber}
                    </Text>
                  </View>
                  <Text style={styles.licensePlate}>
                    {data?.carRegistrationPlate}
                  </Text>
                </View>
                {selectedSlot.status !== "free" && (
                  <Image
                    source={require("@/assets/images/cars/car1.jpg")}
                    style={styles.carImage}
                  />
                )}
                <Text style={styles.entranceLabel}>Time of entrance</Text>
                {data?.parkTime && (
                  <>
                    <Text style={styles.time}>
                      {new Date(data?.parkTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    <Text style={styles.date}>
                      {new Date(data?.parkTime).toLocaleDateString("en-GB", {
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Text style={styles.date}>
                      {new Date(data?.parkTime).toLocaleDateString("en-GB", {
                        year: "numeric",
                      })}
                    </Text>
                  </>
                )}
              </>
            )}
          </>
        )}
      </View>
    </Modalize>
  );
};

export default SlotDetailsModal;
