import { styles } from "@/styles";
import { AvatarMenuProps } from "@/types";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAvatarMenu } from "../hooks/useAvatarMenu";

export function AvatarMenu({
  avatarUrl,
  signOut,
  uploadAvatar,
}: AvatarMenuProps) {
  const {
    visible,
    menuPos,
    uploading,
    avatarRef,
    openMenu,
    closeMenu,
    pickAndUpload,
  } = useAvatarMenu({ uploadAvatar });

  return (
    <>
      <TouchableOpacity onPress={openMenu} style={styles.avatarButton}>
        <View ref={avatarRef}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              {uploading && <ActivityIndicator size="small" color="#888" />}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.backdrop} onPress={closeMenu}>
          <View style={[styles.menu, { top: menuPos.top, right: 16 }]}>
            <TouchableOpacity style={styles.menuItem} onPress={pickAndUpload}>
              <Text style={styles.menuItemText}>Edit Photo</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                signOut();
              }}
            >
              <Text style={[styles.menuItemText, styles.signOutText]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
