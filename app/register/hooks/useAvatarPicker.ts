import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

async function uploadAvatarToStorage(
  userId: string,
  uri: string,
): Promise<string | null> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileExt = uri.split(".").pop() ?? "jpg";
  const filePath = `${userId}/avatar.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, blob, { upsert: true });

  if (error) {
    console.error("Avatar upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
}

export function useAvatarPicker() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickImage = useCallback(async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  }, []);

  const uploadAvatar = useCallback(
    async (userId: string): Promise<string | null> => {
      if (!avatarUri) return null;
      return uploadAvatarToStorage(userId, avatarUri);
    },
    [avatarUri],
  );

  return { avatarUri, pickImage, uploadAvatar };
}
