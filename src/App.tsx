import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useControlledComponent } from "./hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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

function validate(value: string) {
  const result = [];
  if (!value) {
    result.push(new Error("input this field."));
  }
  if (value && !/^\d+$/gs.test(value)) {
    result.push(new Error("input decimal numbers."));
  }
  return result;
}

export default function App() {
  const age = useControlledComponent(validate);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Age</Text>
        <TextInput {...age} style={styles.input} />
        <View style={styles.errors}>
          {age.errors.map((error) => (
            <Text style={styles.error}>{error.message}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
