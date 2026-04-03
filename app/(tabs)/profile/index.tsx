import { useAuth } from "@/provider/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BioSection } from "./components/BioSection";
import { ProfileHero } from "./components/ProfileHero";
import { SettingsSection } from "./components/SettingsSection";
import { styles } from "./styles";

const SETTINGS_ITEMS = [
  {
    icon: "notifications-outline" as const,
    label: "Notifications",
    onPress: () => {},
  },
  {
    icon: "lock-closed-outline" as const,
    label: "Privacy & Security",
    onPress: () => {},
  },
  { icon: "person-outline" as const, label: "Edit Profile", onPress: () => {} },
];

const SUPPORT_ITEMS = [
  {
    icon: "help-circle-outline" as const,
    label: "Help & FAQ",
    onPress: () => {},
  },
  {
    icon: "information-circle-outline" as const,
    label: "About",
    onPress: () => {},
  },
];

export default function Profile() {
  const { name, email, avatarUrl, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProfileHero name={name} email={email} avatarUrl={avatarUrl} />
        <BioSection />
        <SettingsSection title="Settings" items={SETTINGS_ITEMS} />
        <SettingsSection title="Support" items={SUPPORT_ITEMS} />

        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
