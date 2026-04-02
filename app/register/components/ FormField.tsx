import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Text, TextInput, TextInputProps } from "react-native";
import { styles } from "../styles";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  errorMessage?: string;
  inputProps?: TextInputProps;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  rules,
  errorMessage,
  inputProps,
}: Props<T>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[styles.input, errorMessage ? styles.inputError : undefined]}
            {...inputProps}
          />
        )}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </>
  );
}
