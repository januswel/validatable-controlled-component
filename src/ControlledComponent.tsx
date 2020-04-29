import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  errors: {
    height: 24,
    flexDirection: "row",
  },
  error: {
    marginRight: 8,
    color: "red",
    fontSize: 20,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 24,
  },
  input: {
    flex: 1,
    padding: 4,
    borderWidth: 1,
    fontSize: 24,
  },
});

interface Validate {
  (value: string): Array<Error>;
}
export type State = ReturnType<typeof useControlledComponent>;

export function useControlledComponent(validate?: Validate) {
  const [value, setValue] = React.useState("");
  const [errors, setErrors] = React.useState<Array<Error>>([]);
  function onChangeText(newValue: string) {
    setValue(newValue);

    if (validate) {
      const errors = validate(newValue);
      setErrors(errors);
    }
  }

  return {
    value,
    onChangeText,
    errors,
  };
}
interface Props extends State {
  label: string;
}

export default function ControlledComponent(props: Props) {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} />
      <View style={styles.errors}>
        {props.errors.map((error) => (
          <Text style={styles.error}>{error.message}</Text>
        ))}
      </View>
    </View>
  );
}
