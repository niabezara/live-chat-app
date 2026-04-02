import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  // Avatar
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholderText: {
    color: "#888",
    fontSize: 13,
  },

  // Form field
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
    fontSize: 15,
  },
  inputError: {
    borderColor: "#e53935",
  },
  errorText: {
    color: "#e53935",
    fontSize: 12,
    marginBottom: 8,
  },
});
