import { supabase } from "@/lib/supabase";
import { useAuth } from "@/provider/AuthProvider";
import { router } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { RegisterFormData } from "../types";

interface UseRegisterFormOptions {
  uploadAvatar: (userId: string) => Promise<string | null>;
}

export function useRegisterForm({ uploadAvatar }: UseRegisterFormOptions) {
  const { refreshUser } = useAuth();

  const form = useForm<RegisterFormData>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = useCallback(
    async ({ email, password, name }: RegisterFormData) => {
      try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
          Alert.alert("Sign up failed", error.message);
          return;
        }

        const userId = data.user?.id;

        if (userId) {
          const updateData: Record<string, string> = { name };
          const avatarUrl = await uploadAvatar(userId);
          if (avatarUrl) updateData.avatar_url = avatarUrl;

          await supabase.auth.updateUser({ data: updateData });
          await refreshUser();
        }

        if (!data.session) {
          Alert.alert(
            "Almost there!",
            "Check your email to confirm your account 📩",
          );
        } else {
          Alert.alert("Success", "Registration successful 🎉");
          router.replace("/profile");
        }
      } catch (err) {
        Alert.alert("Unexpected error", String(err));
      }
    },
    [uploadAvatar, refreshUser],
  );

  return { form, onSubmit };
}
