import React from "react";

interface Validate {
  (value: string): Array<Error>;
}

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
