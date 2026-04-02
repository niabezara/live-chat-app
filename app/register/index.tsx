import { Button, ScrollView } from "react-native";

import { FormField } from "./components/ FormField";
import { AvatarPicker } from "./components/AvatarPicker";
import { useAvatarPicker } from "./hooks/useAvatarPicker";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { styles } from "./styles";

export default function RegisterScreen() {
  const { avatarUri, pickImage, uploadAvatar } = useAvatarPicker();
  const { form, onSubmit } = useRegisterForm({ uploadAvatar });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <AvatarPicker uri={avatarUri} onPress={pickImage} />

      <FormField
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        errorMessage={errors.name?.message}
        inputProps={{ placeholder: "Name", autoCapitalize: "words" }}
      />

      <FormField
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        errorMessage={errors.email?.message}
        inputProps={{
          placeholder: "Email",
          keyboardType: "email-address",
          autoCapitalize: "none",
        }}
      />

      <FormField
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        errorMessage={errors.password?.message}
        inputProps={{ placeholder: "Password", secureTextEntry: true }}
      />

      <FormField
        control={control}
        name="confirmPassword"
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        }}
        errorMessage={errors.confirmPassword?.message}
        inputProps={{ placeholder: "Confirm Password", secureTextEntry: true }}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}
