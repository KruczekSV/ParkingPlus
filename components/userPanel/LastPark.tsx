import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/userPanel/LastPark";
import PricingModal from "./PricingModal";
import { Modalize } from "react-native-modalize";
import ParkCarModal from "./ParkCarModal";
import { ICar } from "@/types/ICar";
import { useCar } from "@/hooks/api/useCar";
import { useParkingAction } from "@/hooks/api/useParkingAction";
import { IParkingAction } from "@/types/IParkingAction";
import { ParkingActionStatus } from "@/types/IParkingActionStatus";
import Toast from "react-native-toast-message";
import { IParkingSpace } from "@/types/IParkingSpace";
import { useParkingSpace } from "@/hooks/api/useParkingSpace";

type LastParkProps = {
  ParkingActions: IParkingAction[] | null;
  cars: ICar[];
  onCarAction: () => void;
  lastAction: IParkingAction | null;
  isPaid: boolean;
  anyAction: boolean;
  cost: number | null;
};

export default function LastParkSection({
  onCarAction,
  cars,
  ParkingActions,
  lastAction,
  isPaid,
  anyAction,
  cost,
}: LastParkProps) {
  const pricingModalRef = useRef<Modalize>(null);
  const parkModalRef = useRef<Modalize>(null);
  const { parkingAction } = useParkingAction();
  const [data, setData] = useState<IParkingSpace[]>([]);
  const { parkingSpace } = useParkingSpace();

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Not enough funds",
    });
  };
  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Payment successful",
    });
  };
  const openPricingModal = () => {
    pricingModalRef.current?.open();
  };
  const openParkModal = () => {
    parkModalRef.current?.open();
  };
  const {
    execute: getAllParkingSpaces,
    loading: loadingParkingSpaces,
    error: errorParkingSpaces,
    value: ParkingSpaces,
  } = parkingSpace.getAll;

  useEffect(() => {
    getAllParkingSpaces();
  }, []);

  useEffect(() => {
    if (ParkingSpaces) {
      const extractedData = ParkingSpaces.data.map(
        (item: IParkingSpace) => item
      );
      setData(extractedData);
    }
  }, [ParkingSpaces]);

  const {
    execute: payParking,
    loading: loadingPay,
    error: errorPay,
    value: Payment,
  } = parkingAction.pay;

  const handlePayment = async () => {
    if (lastAction && cost) {
      const carLicense = lastAction.carRegistrationPlate;
      const amount = cost;
      const payload = { carLicense, amount };
      try {
        await payParking(amount, carLicense);
        showSuccessToast();
        onCarAction();
      } catch (error) {
        showErrorToast();
      }
    }
  };

  const freeCount = data.filter((slot) => slot.status === "free").length;
  const takenCount = data.length - freeCount;

  return (
    <>
      <Toast />
      <View style={styles.card}>
        {cars.length > 0 ? (
          <>
            {anyAction ? (
              <>
                {isPaid ? (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.title}>Last park</Text>
                      <Text style={styles.date}>
                        {lastAction?.parkTime
                          ? new Date(lastAction.parkTime).toLocaleDateString(
                              "en-GB",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "No date available"}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Plate</Text>
                      <Text style={styles.info}>
                        {lastAction?.carRegistrationPlate}
                      </Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Cost</Text>
                      <Text style={styles.info}>{cost} PLN</Text>
                    </View>
                    <View style={styles.rowButton}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={openPricingModal}
                      >
                        <Text style={styles.buttonText}>Pricing</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={openParkModal}
                      >
                        <Text style={styles.buttonText}>Park</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.title}>Parked</Text>
                      <Text style={styles.date}>
                        {lastAction?.parkTime
                          ? new Date(lastAction.parkTime).toLocaleDateString(
                              "en-GB",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                minute: "2-digit",
                                hour: "2-digit",
                              }
                            )
                          : "No date available"}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Plate</Text>
                      <Text style={styles.info}>
                        {lastAction?.carRegistrationPlate}
                      </Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Current cost</Text>
                      <Text style={styles.info}>{cost} PLN</Text>
                    </View>

                    <View style={styles.rowButton}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={openPricingModal}
                      >
                        <Text style={styles.buttonText}>Pricing</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handlePayment}
                      >
                        <Text style={styles.buttonText}>Exit</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <Text style={styles.title}>Last park</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.msg}>You haven’t</Text>
                  <Text style={styles.msg}>parked yet.</Text>
                  <Text style={styles.msg}>Let’s change that.</Text>
                </View>
                <View style={styles.rowButton}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={openPricingModal}
                  >
                    <Text style={styles.buttonText}>Pricing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={openParkModal}
                  >
                    <Text style={styles.buttonText}>Park</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View style={styles.row}>
              <Text style={styles.title}>Last park</Text>
            </View>
            <View style={styles.column}>
              <>
                <Text style={styles.msg}>You don’t have any</Text>
                <Text style={styles.msg}> cars to park yet.</Text>
                <Text style={styles.msg}>Add first one</Text>
                <Text style={styles.msg}>below.</Text>
              </>
            </View>
            <View style={styles.rowButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={openPricingModal}
              >
                <Text style={styles.buttonText}>Pricing</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <PricingModal modalizeRef={pricingModalRef} />
      <ParkCarModal
        modalizeRef={parkModalRef}
        freeCount={freeCount}
        cars={cars}
        onCarAction={onCarAction}
      />
    </>
  );
}
