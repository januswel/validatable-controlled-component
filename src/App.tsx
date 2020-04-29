import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ControlledConponent, {
  useControlledComponent,
} from "./ControlledComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#220efc",
    borderRadius: 8,
    padding: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    color: "white",
    fontSize: 24,
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
  const onPress = React.useCallback(() => {
    console.log("submit");
  }, []);
  const isFirstRendering = React.useRef(true);
  const isDisabled = React.useMemo(() => {
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return true;
    }
    return [name, age].reduce(
      (current, input) => current || input.errors.length !== 0,
      false
    );
  }, [name, age]);
  const buttonStyle = React.useMemo(() => {
    return isDisabled ? [styles.button, styles.disabled] : styles.button;
  }, [isDisabled]);

  return (
    <View style={styles.container}>
      <ControlledConponent label="Name" {...name} />
      <ControlledConponent label="Age" {...age} />
      <TouchableOpacity
        onPress={onPress}
        style={buttonStyle}
        disabled={isDisabled}
      >
        <Text style={styles.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
