import { useState } from "react";

type InputFieldProps = {
    typeOfField: string;
    name: string;
    children: React.ReactNode;
    error: string;
    onInputChange: (newValue: string) => void;
}

export const InputField = ({typeOfField, name, children, error, onInputChange}: InputFieldProps) => {
    const [value, setValue] = useState("");

    return (
        <label htmlFor={name}>
            {children}
            <input
                type={typeOfField}
                id={name}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onInputChange(e.target.value);
                }}
            />
            {error && <div className="errorText">{error}</div>}
        </label>
    )
}