import {
    Controller,
    useFormContext,
    type FieldValues,
    type Path,
} from "react-hook-form";

import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";

type NumberFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
};

export function NumberField<T extends FieldValues>({
    name,
    label,
    placeholder,
    disabled = false,
    min,
    max,
    step,
}: NumberFieldProps<T>) {
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
                        id={field.name}
                        type="number"
                        placeholder={placeholder}
                        disabled={disabled}
                        min={min}
                        max={max}
                        step={step}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        onChange={(e) => {
                            const value = e.target.value;

                            field.onChange(
                                value === ""
                                    ? undefined
                                    : Number(value)
                            );
                        }}
                    />

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}