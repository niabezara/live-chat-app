import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Avatar (header)
  avatarButton: {
    marginRight: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  // Avatar (tab bar)
  tabAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  // Shared placeholder
  avatarPlaceholder: {
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },

  // Dropdown menu
  backdrop: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 140,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 15,
    color: "#333",
  },
  signOutText: {
    color: "#e53935",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
});
