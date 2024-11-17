import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D5563",
    padding: 20,
  },
  grid: {
    alignItems: "center",
  },
  slot: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  freeSlot: {
    backgroundColor: "#39C0A9",
  },
  takenSlot: {
    backgroundColor: "#D9534F",
  },
  slotText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerContent: {
    alignItems: "center",
    padding: 20,
    height: 500,
  },
  slotNumber: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    color: "#333",
  },
  licensePlate: {
    fontSize: 30,
    fontWeight: "semibold",
    color: "#333",
    marginBottom: 20,
  },
  carImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  entranceLabel: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#333",
    marginTop: 20,
    marginBottom: 20,
  },
  time: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 5,
  },
  date: {
    fontSize: 16,
    color: "#333",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
  statusItem: {
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 5,
  },
  statusBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCount: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
