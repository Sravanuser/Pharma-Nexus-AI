import {
    Controller,
    useFormContext,
    type FieldValues,
    type Path,
} from "react-hook-form";

import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";

type TextFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
};

export function TextField<T extends FieldValues>({
    name,
    label,
    placeholder,
    type = "text",
    disabled = false,
}: TextFieldProps<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                        {label}
                    </FieldLabel>

                    <Input
                        {...field}
                        id={field.name}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}