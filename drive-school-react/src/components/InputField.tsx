import { useEffect, useState } from "react";

type InputFieldProps = {
    typeOfField: string;
    name: string;
    children: React.ReactNode;
    value: string;
    error: string;
    onInputChange: (CurrentValue: string) => void;
}

export const InputField = ({typeOfField, name, children, value, error, onInputChange}: InputFieldProps) => {
    const [newValue, setValue] = useState(value);

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <label htmlFor={name}>
            {children}
            <input
                type={typeOfField}
                id={name}
                name={name}
                value={newValue}
                onChange={(e) => {
                    setValue(e.target.value);
                    onInputChange(e.target.value);
                }}
            />
            {error && <div className="errorText">{error}</div>}
        </label>
    )
}