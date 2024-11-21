import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    gap: 15,
  },
  column: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
  },
  title: { fontSize: 26, fontWeight: "medium" },
  description: { fontSize: 16, color: "#555", marginVertical: 10 },
  boldText: { fontWeight: "bold" },
  msg: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "semibold",
    marginTop: -5,
  },
  rowButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
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
