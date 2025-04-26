import React from "react";
import { type UseFormReturn, type FieldValues } from "react-hook-form";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  type FormInputFields,
  RenderFormInput,
} from "@/components/form/renderFormInputs";

interface IProps<TData extends FieldValues> {
  form: UseFormReturn<TData>;
  fieldConfig: FormInputFields<TData>;
}

const labelPositionClassMap = {
  left: "items-center",
  right: "flex-row-reverse items-center",
  top: "flex-col items-start",
  bottom: "flex-col-reverse items-start",
};

export function FormInputWrapper<TData extends FieldValues>({
  form,
  fieldConfig: { renderError = true, ...fieldConfig },
}: IProps<TData>) {
  return (
    <FormField
      control={form.control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem
          className={`flex gap-2  ${
            fieldConfig.labelPosition
              ? labelPositionClassMap[fieldConfig.labelPosition]
              : labelPositionClassMap["top"]
          }`}
        >
          {fieldConfig.label && (
            <FormLabel className=" text-white">{fieldConfig?.label}</FormLabel>
          )}
          <FormControl>
            <RenderFormInput field={field} fieldConfig={fieldConfig} />
          </FormControl>
          {renderError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
