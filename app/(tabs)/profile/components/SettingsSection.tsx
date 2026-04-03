import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";
import { SettingsRow } from "./SettingsRow";

interface SettingsItem {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}

interface SettingsSectionProps {
  title: string;
  items: SettingsItem[];
}

export function SettingsSection({ title, items }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && <View style={styles.rowDivider} />}
            <SettingsRow
              icon={item.icon}
              label={item.label}
              onPress={item.onPress}
            />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
