import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface Props {
  uri: string | null;
  onPress: () => void;
}

export function AvatarPicker({ uri, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.avatarWrapper}>
      {uri ? (
        <Image source={{ uri }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
