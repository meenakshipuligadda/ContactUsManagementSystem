import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./Input.css";

interface BaseProps {
  label: string;
  error?: string;
}

type InputOnlyProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaOnlyProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type InputProps = InputOnlyProps | TextareaOnlyProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const { label, error, id, ...rest } = props;
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");

    if (props.as === "textarea") {
      const { as, ...textareaRest } = rest as TextareaHTMLAttributes<HTMLTextAreaElement> & {
        as?: string;
      };
      return (
        <div className="field">
          <label htmlFor={fieldId} className="field-label">
            {label}
          </label>
          <textarea
            id={fieldId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`field-input ${error ? "field-input-error" : ""}`}
            {...textareaRest}
          />
          {error && <p className="field-error">{error}</p>}
        </div>
      );
    }

    const { as, ...inputRest } = rest as InputHTMLAttributes<HTMLInputElement> & {
      as?: string;
    };

    return (
      <div className="field">
        <label htmlFor={fieldId} className="field-label">
          {label}
        </label>
        <input
          id={fieldId}
          ref={ref as React.Ref<HTMLInputElement>}
          className={`field-input ${error ? "field-input-error" : ""}`}
          {...inputRest}
        />
        {error && <p className="field-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
