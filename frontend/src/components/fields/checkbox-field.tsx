import {
    Controller,
    useFormContext,
    type FieldValues,
    type Path,
} from "react-hook-form";

import { Field, FieldLabel, FieldError } from "../ui/field";
import { Checkbox } from "../ui/checkbox";

type CheckboxFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    description?: string;
    disabled?: boolean;
};

export function CheckboxField<T extends FieldValues>({
    name,
    label,
    description,
    disabled = false,
}: CheckboxFieldProps<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                >
                    <Checkbox
                        id={field.name}
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={disabled}
                        aria-invalid={fieldState.invalid}
                    />

                    <div className="flex flex-col gap-0.5">
                        <FieldLabel htmlFor={field.name}>
                            {label}
                        </FieldLabel>

                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}