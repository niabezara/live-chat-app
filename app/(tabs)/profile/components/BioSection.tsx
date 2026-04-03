import { useAuth } from "@/provider/AuthProvider";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

const DEFAULT_BIO = "Hey there! I'm using this app to chat.";

export function BioSection() {
  const { bio, updateBio } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const handleSave = async () => {
    const next = draft.trim() || (bio ?? DEFAULT_BIO);
    await updateBio(next);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.bioCard}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.bioText, styles.bioInput]}
              value={draft}
              onChangeText={setDraft}
              multiline
              autoFocus
              maxLength={200}
            />
            <View style={styles.bioActions}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.bioCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.bioSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setDraft(bio ?? DEFAULT_BIO);
              setIsEditing(true);
            }}
          >
            <Text style={styles.bioText}>{bio ?? DEFAULT_BIO}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
