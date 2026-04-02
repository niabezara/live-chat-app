import { Link } from "expo-router";
import { useState } from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../provider/AuthProvider";

export default function Index() {
  const { signIn, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: error ? "red" : "gray",
          marginBottom: 10,
          padding: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: error ? "red" : "gray",
          marginBottom: 10,
          padding: 10,
        }}
      />
      <Button title="sign in" onPress={() => signIn(username, password)} />
      <Link href={"/register"} asChild>
        <Button title="Go to Register" />
      </Link>
    </SafeAreaView>
  );
}
