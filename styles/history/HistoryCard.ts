import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: -1,
  },
  placeAndPlate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotNumberContainer: {
    backgroundColor: "#FFFF",
    borderRadius: 10,
    width: 41,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  spotNumber: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  licensePlate: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  costAndDuration: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  duration: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});
