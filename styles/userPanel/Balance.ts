import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  title: { fontSize: 32, fontWeight: "bold" },
  date: {
    fontSize: 15,
    color: "black",
    marginVertical: 5,
    fontWeight: "medium",
  },
  label: { fontSize: 24, color: "black", fontWeight: "medium" },
  amount: { fontSize: 15, marginVertical: 5, fontWeight: "medium" },
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
