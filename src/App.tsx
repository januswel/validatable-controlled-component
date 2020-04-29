import React from "react";
import { StyleSheet, View } from "react-native";

import ControlledConponent, {
  useControlledComponent,
} from "./ControlledComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function validateName(value: string) {
  const result = [];
  if (!value) {
    result.push(new Error("input this field."));
  }
  return result;
}

function validateAge(value: string) {
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
  const name = useControlledComponent(validateName);
  const age = useControlledComponent(validateAge);

  return (
    <View style={styles.container}>
      <ControlledConponent label="Name" {...name} />
      <ControlledConponent label="Age" {...age} />
    </View>
  );
}
