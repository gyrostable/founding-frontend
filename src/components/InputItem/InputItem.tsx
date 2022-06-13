import React, { ChangeEvent, ReactNode } from "react";
import { Fieldset, TextField } from "react95";


type InputItemProps = {
  label: string;
  value?: string;
  placeholder?: string | null;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children?: ReactNode;
};

const InputItem = ({ label, value, placeholder, onChange, disabled, children }: InputItemProps) => (
  <Fieldset label={label}>
    <TextField
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled || false}
    />
    {children}
  </Fieldset>
);

export default InputItem