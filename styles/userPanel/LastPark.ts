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
    gap: 20,
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
  },
  rowButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  title: { fontSize: 26, fontWeight: "medium" },
  date: {
    fontSize: 15,
    color: "black",
    marginVertical: 5,
    fontWeight: "medium",
  },
  label: { fontSize: 24, color: "black", fontWeight: "medium" },
  info: { fontSize: 15, marginVertical: 5, fontWeight: "semibold" },
  msg: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "semibold",
    marginTop: -5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
