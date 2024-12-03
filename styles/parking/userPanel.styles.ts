import { Dimensions, StyleSheet } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export default StyleSheet.create({
  scroll: {
    backgroundColor: "#4D5563",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#4D5563",
    padding: 20,
    flexDirection: "column",
    gap: 20,
    minHeight: screenHeight - 130,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
