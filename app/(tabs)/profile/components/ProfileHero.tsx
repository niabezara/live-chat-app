import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useAvatarMenu } from "../../../../hooks/useAvatarMenu";
import { useAuth } from "../../../../provider/AuthProvider";
import { STATUS_OPTIONS } from "../constants";
import { styles } from "../styles";

interface ProfileHeroProps {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
}

function StatusDot({ color }: { color: string }) {
  return <View style={[styles.statusDot, { backgroundColor: color }]} />;
}

export function ProfileHero({ name, email, avatarUrl }: ProfileHeroProps) {
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const { uploadAvatar, updateStatus, status } = useAuth();
  const { avatarRef, pickAndUpload } = useAvatarMenu({
    uploadAvatar,
  });
  const currentStatus =
    STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];

  const handleSave = async (value: string) => {
    await updateStatus(value as typeof status);
  };
  return (
    <View style={styles.hero}>
      <TouchableOpacity
        style={styles.avatarWrapper}
        ref={avatarRef}
        onPress={pickAndUpload}
      >
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarInitial}>
              {name ? name[0].toUpperCase() : "?"}
            </Text>
          </View>
        )}
        {/* <StatusDot color={currentStatus.color} /> */}
      </TouchableOpacity>

      <Text style={styles.greeting}>Hello, {name ?? "there"} 👋</Text>
      {/* <Text style={styles.email}>{email}</Text> */}

      <View style={styles.statusPickerWrapper}>
        <TouchableOpacity
          style={styles.statusBadge}
          onPress={() => setShowStatusPicker((v) => !v)}
        >
          <Text style={[styles.statusLabel, { color: currentStatus.color }]}>
            {currentStatus.label}
          </Text>
          <Ionicons name="chevron-down" size={14} color={currentStatus.color} />
        </TouchableOpacity>

        {showStatusPicker && (
          <View style={styles.statusMenu}>
            {STATUS_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={styles.statusOption}
                onPress={() => {
                  handleSave(opt.value);
                  setShowStatusPicker(false);
                }}
              >
                <StatusDot color={opt.color} />
                <Text style={styles.statusOptionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
