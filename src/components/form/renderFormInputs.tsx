"use client";
import React from "react";
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PasswordInput from "../ui/password-input";

export interface BaseField {
  label?: string;
  prefixIcon?: React.ReactNode;
  className?: string;
  placeHolder?: string;
  disabled?: boolean;
  labelPosition?: "left" | "right" | "top" | "bottom";
  renderError?: boolean;
}
export interface IInputFieldVariant {
  fieldVariant: "input";
  inputType?: "number" | "text" | "email" | "password" | "tel" | "url";
  inputMaxLength?: number;
  value?: string;
}

export interface ISelectFieldVariant {
  fieldVariant: "select";
  inputMaxLength?: number;
  options: Array<{ value: string; name: string }>;
}

export interface ITextAreaFieldVariant {
  fieldVariant: "textArea";
  inputType?: "text";
}

export interface ITimeFieldVariant {
  fieldVariant: "time";
}

export interface IPasswordInputFieldVariant {
  fieldVariant: "passwordInput";
}

export type FormInputFields<TData> = (
  | IInputFieldVariant
  | ISelectFieldVariant
  | ITextAreaFieldVariant
  | IPasswordInputFieldVariant
) &
  BaseField & {
    name: Path<TData>;
  };

interface IProps<TData extends FieldValues> {
  field: ControllerRenderProps<TData, Path<TData>>;
  fieldConfig: FormInputFields<TData>;
}

export function RenderFormInput<TData extends FieldValues>({
  field,
  fieldConfig,
}: IProps<TData>) {
  function renderInput<TData extends FieldValues>({
    field,
    fieldConfig,
  }: IProps<TData>) {
    switch (fieldConfig.fieldVariant) {
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value || ""}
            disabled={fieldConfig?.disabled}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  field?.value
                    ? fieldConfig?.options.find(
                        (option) => option.value === field.value
                      )?.name
                    : fieldConfig?.placeHolder
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fieldConfig?.options &&
                  fieldConfig?.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "textArea":
        return (
          <Textarea
            key={fieldConfig.name}
            {...field}
            disabled={fieldConfig?.disabled}
            placeholder={fieldConfig?.placeHolder}
            className="placeholder:text-grey text-white"
          />
        );

      case "passwordInput": {
        return <PasswordInput value={field.value} onChange={field.onChange} />;
      }

      default:
        return (
          <Input
            key={fieldConfig.name}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            className={cn(
              "w-full bg-transparent text-sm",
              fieldConfig.className
            )}
            value={field.value}
            disabled={fieldConfig?.disabled}
            placeholder={fieldConfig?.placeHolder}
          />
        );
    }
  }
  return <> {renderInput<TData>({ field, fieldConfig })} </>;
}
