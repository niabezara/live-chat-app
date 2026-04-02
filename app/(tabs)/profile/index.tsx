// import { useAuth } from "@/provider/AuthProvider";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// type Status = "online" | "away" | "busy" | "offline";

// const STATUS_OPTIONS: { value: Status; label: string; color: string }[] = [
//   { value: "online", label: "Online", color: "#22c55e" },
//   { value: "away", label: "Away", color: "#f59e0b" },
//   { value: "busy", label: "Busy", color: "#ef4444" },
//   { value: "offline", label: "Offline", color: "#9ca3af" },
// ];

// const StatusDot = ({ color }: { color: string }) => (
//   <View style={[styles.statusDot, { backgroundColor: color }]} />
// );

// export default function Profile() {
//   const { name, email, avatarUrl, signOut } = useAuth();
//   const [status, setStatus] = useState<Status>("online");
//   const [showStatusPicker, setShowStatusPicker] = useState(false);
//   const [bio, setBio] = useState("Hey there! I'm using this app to chat.");
//   const [editingBio, setEditingBio] = useState(false);
//   const [bioDraft, setBioDraft] = useState(bio);

//   const currentStatus = STATUS_OPTIONS.find((s) => s.value === status)!;

//   const handleSignOut = () => {
//     Alert.alert("Sign out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Sign out", style: "destructive", onPress: signOut },
//     ]);
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={["bottom"]}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* Hero */}
//         <View style={styles.hero}>
//           <View style={styles.avatarWrapper}>
//             {avatarUrl ? (
//               <Image source={{ uri: avatarUrl }} style={styles.avatar} />
//             ) : (
//               <View style={[styles.avatar, styles.avatarFallback]}>
//                 <Text style={styles.avatarInitial}>
//                   {name ? name[0].toUpperCase() : "?"}
//                 </Text>
//               </View>
//             )}
//             <StatusDot color={currentStatus.color} />
//           </View>

//           <Text style={styles.greeting}>Hello, {name ?? "there"} 👋</Text>
//           <Text style={styles.email}>{email}</Text>

//           {/* Status picker trigger */}
//           <TouchableOpacity
//             style={styles.statusBadge}
//             onPress={() => setShowStatusPicker((v) => !v)}
//           >
//             <Text style={[styles.statusLabel, { color: currentStatus.color }]}>
//               {currentStatus.label}
//             </Text>
//             <Ionicons
//               name="chevron-down"
//               size={14}
//               color={currentStatus.color}
//             />
//           </TouchableOpacity>

//           {showStatusPicker && (
//             <View style={styles.statusMenu}>
//               {STATUS_OPTIONS.map((opt) => (
//                 <TouchableOpacity
//                   key={opt.value}
//                   style={styles.statusOption}
//                   onPress={() => {
//                     setStatus(opt.value);
//                     setShowStatusPicker(false);
//                   }}
//                 >
//                   <StatusDot color={opt.color} />
//                   <Text style={styles.statusOptionLabel}>{opt.label}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Bio */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>About</Text>
//           <View style={styles.bioCard}>
//             {editingBio ? (
//               <>
//                 <TextInput
//                   style={[styles.bioText, styles.bioInput]}
//                   value={bioDraft}
//                   onChangeText={setBioDraft}
//                   multiline
//                   autoFocus
//                   maxLength={200}
//                 />
//                 <View style={styles.bioActions}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setBioDraft(bio);
//                       setEditingBio(false);
//                     }}
//                   >
//                     <Text style={styles.bioCancelText}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setBio(bioDraft.trim() || bio);
//                       setEditingBio(false);
//                     }}
//                   >
//                     <Text style={styles.bioSaveText}>Save</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             ) : (
//               <TouchableOpacity
//                 onPress={() => {
//                   setBioDraft(bio);
//                   setEditingBio(true);
//                 }}
//               >
//                 <Text style={styles.bioText}>{bio}</Text>
//                 {/* <Text style={styles.bioEditHint}>Tap to edit</Text> */}
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* Settings rows */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Settings</Text>
//           <View style={styles.card}>
//             <SettingsRow
//               icon="notifications-outline"
//               label="Notifications"
//               onPress={() => {}}
//             />
//             <View style={styles.rowDivider} />
//             <SettingsRow
//               icon="lock-closed-outline"
//               label="Privacy & Security"
//               onPress={() => {}}
//             />
//             <View style={styles.rowDivider} />
//             <SettingsRow
//               icon="person-outline"
//               label="Edit Profile"
//               onPress={() => {}}
//             />
//           </View>
//         </View>

//         {/* Support */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Support</Text>
//           <View style={styles.card}>
//             <SettingsRow
//               icon="help-circle-outline"
//               label="Help & FAQ"
//               onPress={() => {}}
//             />
//             <View style={styles.rowDivider} />
//             <SettingsRow
//               icon="information-circle-outline"
//               label="About"
//               onPress={() => {}}
//             />
//           </View>
//         </View>

//         {/* Sign out */}
//         <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
//           <Ionicons name="log-out-outline" size={20} color="#ef4444" />
//           <Text style={styles.signOutText}>Sign Out</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function SettingsRow({
//   icon,
//   label,
//   onPress,
// }: {
//   icon: React.ComponentProps<typeof Ionicons>["name"];
//   label: string;
//   onPress: () => void;
// }) {
//   return (
//     <TouchableOpacity style={styles.row} onPress={onPress}>
//       <Ionicons name={icon} size={20} color="#6b7280" style={styles.rowIcon} />
//       <Text style={styles.rowLabel}>{label}</Text>
//       <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//   },
//   scroll: {
//     paddingBottom: 40,
//   },

//   // Hero
//   hero: {
//     alignItems: "center",
//     paddingTop: 32,
//     paddingBottom: 24,
//     backgroundColor: "#fff",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#e5e7eb",
//   },
//   avatarWrapper: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   avatar: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//   },
//   avatarFallback: {
//     backgroundColor: "#6366f1",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarInitial: {
//     color: "#fff",
//     fontSize: 36,
//     fontWeight: "600",
//   },
//   statusDot: {
//     position: "absolute",
//     bottom: 2,
//     right: 2,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   greeting: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 14,
//     color: "#6b7280",
//     marginBottom: 12,
//   },
//   statusBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: "#f3f4f6",
//     borderRadius: 20,
//   },
//   statusLabel: {
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   statusMenu: {
//     marginTop: 8,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//     minWidth: 160,
//     overflow: "hidden",
//   },
//   statusOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 11,
//     paddingHorizontal: 16,
//     gap: 10,
//   },
//   statusOptionLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: "#374151",
//   },

//   // Sections
//   section: {
//     marginTop: 24,
//     paddingHorizontal: 16,
//   },
//   sectionTitle: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#9ca3af",
//     textTransform: "uppercase",
//     letterSpacing: 0.8,
//     marginBottom: 8,
//   },

//   // Bio
//   bioCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 14,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: "#e5e7eb",
//   },
//   bioText: {
//     fontSize: 15,
//     color: "#374151",
//     lineHeight: 22,
//   },
//   bioInput: {
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: "#6366f1",
//     borderRadius: 8,
//     padding: 8,
//     minHeight: 60,
//     textAlignVertical: "top",
//   },
//   bioActions: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     gap: 16,
//     marginTop: 8,
//   },
//   bioCancelText: {
//     fontSize: 14,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   bioSaveText: {
//     fontSize: 14,
//     color: "#6366f1",
//     fontWeight: "600",
//   },
//   bioEditHint: {
//     fontSize: 12,
//     color: "#9ca3af",
//     marginTop: 4,
//   },

//   // Card rows
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: "#e5e7eb",
//     overflow: "hidden",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//   },
//   rowIcon: {
//     marginRight: 12,
//   },
//   rowLabel: {
//     flex: 1,
//     fontSize: 15,
//     color: "#111827",
//   },
//   rowDivider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "#f3f4f6",
//     marginLeft: 48,
//   },

//   // Sign out
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginTop: 32,
//     marginHorizontal: 16,
//     paddingVertical: 14,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: "#fca5a5",
//   },
//   signOutText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#ef4444",
//   },
// });
