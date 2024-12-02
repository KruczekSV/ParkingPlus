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
    borderRadius: 7,
    width: 30,
    height: 30,
    borderColor: "black",
    borderWidth: 2,
    padding: 2,
    alignSelf: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
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
  infoRow: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "red",
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    width: "59%",
    // backgroundColor: "blue",
  },
  infoColumn2: {
    display: "flex",
    flexDirection: "column",
    width: "41%",
    // backgroundColor: "yellow",
  },
  dateTime: {
    gap: 50,
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  costAndDuration: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "flex-end",
  },
  duration: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});
