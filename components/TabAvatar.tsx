import { styles } from "@/styles";
import { Image, View } from "react-native";

interface Props {
  uri: string | null;
}

export function TabAvatar({ uri }: Props) {
  if (uri) {
    return <Image source={{ uri }} style={styles.tabAvatar} />;
  }
  return <View style={[styles.tabAvatar, styles.avatarPlaceholder]} />;
}
