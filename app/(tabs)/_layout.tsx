import { TabAvatar } from "@/components/TabAvatar";
import { useAuth } from "@/provider/AuthProvider";
import { Tabs } from "expo-router";
import { AvatarMenu } from "../../components/AvatarMenu";

export default function Layout() {
  const { avatarUrl, signOut, uploadAvatar } = useAuth();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <TabAvatar uri={avatarUrl} />,
          headerRight: () => (
            <AvatarMenu
              avatarUrl={avatarUrl}
              signOut={signOut}
              uploadAvatar={uploadAvatar}
            />
          ),
        }}
      />
    </Tabs>
  );
}
