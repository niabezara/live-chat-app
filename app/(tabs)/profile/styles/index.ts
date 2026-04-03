import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scroll: {
    paddingBottom: 40,
  },

  // ── Hero ────────────────────────────────────────────────
  hero: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    zIndex: 10,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarFallback: {
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "600",
  },
  statusDot: {
    position: "absolute",
    bottom: 12,
    right: 11,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  statusPickerWrapper: {
    position: "relative",
    zIndex: 1000,
    alignItems: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  statusMenu: {
    position: "absolute",
    top: 38,
    zIndex: 1000,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    minWidth: 160,
    overflow: "hidden",
  },
  statusOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 16,

    gap: 10,
  },
  statusOptionLabel: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },

  // ── Sections ─────────────────────────────────────────────
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
    zIndex: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  // ── Bio ──────────────────────────────────────────────────
  bioCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    zIndex: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
  },
  bioText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  bioInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#6366f1",
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    textAlignVertical: "top",
  },
  bioActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginTop: 8,
  },
  bioCancelText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  bioSaveText: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },

  // ── Card rows ─────────────────────────────────────────────
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#f3f4f6",
    marginLeft: 48,
  },

  // ── Sign out ──────────────────────────────────────────────
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#fca5a5",
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ef4444",
  },
});
