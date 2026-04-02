import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef, useState } from "react";
import { Alert, View } from "react-native";

import { MenuPosition } from "../types";

interface UseAvatarMenuOptions {
  uploadAvatar: (uri: string) => Promise<void>;
}

export function useAvatarMenu({ uploadAvatar }: UseAvatarMenuOptions) {
  const [visible, setVisible] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPosition>({ top: 0 });
  const [uploading, setUploading] = useState(false);
  const avatarRef = useRef<View>(null);

  const openMenu = useCallback(() => {
    avatarRef.current?.measureInWindow((_x, y, _width, height) => {
      setMenuPos({ top: y + height + 4 });
      setVisible(true);
    });
  }, []);

  const closeMenu = useCallback(() => setVisible(false), []);

  const pickAndUpload = useCallback(async () => {
    closeMenu();

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Allow photo access to change your avatar.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    try {
      setUploading(true);
      await uploadAvatar(result.assets[0].uri);
    } catch {
      Alert.alert(
        "Upload failed",
        "Could not update your avatar. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }, [closeMenu, uploadAvatar]);

  return {
    visible,
    menuPos,
    uploading,
    avatarRef,
    openMenu,
    closeMenu,
    pickAndUpload,
  };
}
