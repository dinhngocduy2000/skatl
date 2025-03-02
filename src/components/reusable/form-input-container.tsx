import { ReactNode } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormStateReturn,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface Props<T extends FieldValues> {
  maxCharactersText?: string | ReactNode;
  endfixIcon?: ReactNode;
  label: string | ReactNode;
  name: Path<T>; //names of the form items in react-hook-form
  required?: boolean;
  errors?: FieldErrors; //errors from react-hook-form
  vertialAlign?: boolean;
  containerClassName?: string;
  control: Control<T, Path<T>>; //control the form item with react hook form
  rules?: // rules to validate
  | Omit<
        RegisterOptions<T>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  render: ({
    // render the input child
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactElement;
}

const FormInputContainer = <T extends FieldValues>({
  label,
  required,
  name,
  errors,
  vertialAlign,
  containerClassName,
  control,
  rules,
  render,
  endfixIcon,
  maxCharactersText,
}: Props<T>) => {
  return (
    <div
      className={cn(
        "flex w-full",
        vertialAlign ? "flex-col gap-1" : "flex-row justify-center  gap-2",
        containerClassName && containerClassName
      )}
    >
      <p
        className={cn(
          "mb-0 text-sm font-semibold text-black flex gap-1",
          vertialAlign ? "w-fit" : "mt-0"
        )}
      >
        <Label htmlFor={name}>{label}</Label>
        {required && label !== "" && <span className="text-red-400">*</span>}
      </p>
      <div className="flex flex-col gap-2">
        <div className="relative w-full max-w-full">
          <Controller
            control={control}
            rules={rules}
            name={name}
            render={render}
          />
          {errors?.[name]?.message && (
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 flex items-center",
                endfixIcon ? "right-8" : "right-2"
              )}
            >
              <ExclamationCircleIcon
                aria-hidden="true"
                color="red"
                fill="red"
                className="h-5 w-5 text-red-500"
              />
            </div>
          )}
          {endfixIcon && (
            <div className="absolute inset-y-0 right-2 flex items-center">
              {endfixIcon}
            </div>
          )}
        </div>

        {errors && (
          <div className="flex w-full justify-between">
            <ErrorMessage
              errors={errors}
              name={name as string}
              render={({ message }) => {
                return <p className="w-full text-xs text-red-400">{message}</p>;
              }}
            />
            {maxCharactersText && (
              <p className="w-full text-end text-xs font-semibold text-gray-400">
                {" "}
                {maxCharactersText}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInputContainer;
