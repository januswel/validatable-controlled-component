import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "96%",
    borderWidth: 1,
    fontSize: 24,
  },
});

function useControlledComponent() {
  const [value, setValue] = React.useState("");
  function onChangeText(newValue: string) {
    setValue(newValue);
  }
  return {
    value,
    onChangeText,
  };
}

export default function App() {
  const name = useControlledComponent();

  return (
    <View style={styles.container}>
      <TextInput {...name} style={styles.input} />
    </View>
  );
}
