import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D5563",
    padding: 20,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 40,
  },
  filterButtonText: {
    color: "#333",
    fontSize: 14,
  },
  cardList: {
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 7,
    width: "45%", // Ustawienie szerokości dla dwóch kolumn
  },
  spotNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  spotNumber: {
    fontWeight: "bold",
    color: "#333",
  },
  licensePlate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    color: "#333",
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
