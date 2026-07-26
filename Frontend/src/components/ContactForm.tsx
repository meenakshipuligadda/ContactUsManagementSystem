import { useState, useEffect, useRef, useCallback } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import type { ContactFormData } from "../types/contact";
import "./ContactForm.css";

interface ContactFormProps {
  initialData?: ContactFormData;
  isEditMode?: boolean;
  isSubmitting: boolean;
  onSubmit: (data: ContactFormData) => Promise<void> | void;
  onCancelEdit?: () => void;
}

const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm({
  initialData,
  isEditMode = false,
  isSubmitting,
  onSubmit,
  onCancelEdit,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  // useRef to focus the Name field as soon as the form mounts / switches
  // into edit mode -- a DOM action, not something that should live in state.
  const nameInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setFormData(initialData || EMPTY_FORM);
    setErrors({});
    nameInputRef.current?.focus();
  }, [initialData]);

  const validate = useCallback((data: ContactFormData) => {
    const nextErrors: Partial<ContactFormData> = {};
    if (!data.name.trim()) nextErrors.name = "Name is required";
    if (!data.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!data.message.trim()) nextErrors.message = "Message is required";
    return nextErrors;
  }, []);

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };
  // Enter submits the form from the message box too; Shift+Enter still
  // inserts a new line, which is what users expect from a textarea.
  const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };
  // A real <form onSubmit> is used (rather than a button onClick) so the
  // browser's native "press Enter to submit" behavior works for free on
  // the Name and Email inputs, per the assessment requirement.
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(formData);

    if (!isEditMode) {
      setFormData(EMPTY_FORM); // reset form after a successful create
    }
  };

  return (
    <form className="contact-form" onSubmit={handleFormSubmit}>
      <Input
        label="Name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange("name")}
        error={errors.name}
        ref={nameInputRef}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
      />

      <Input
        as="textarea"
        label="Message"
        placeholder="Enter your message..."
        value={formData.message}
        onChange={handleChange("message")}
        onKeyDown={handleMessageKeyDown}
        error={errors.message}
      />

      <div className="contact-form-actions">
        <Button type="submit" isLoading={isSubmitting}>
          {isEditMode ? "Update Message" : "Send Message"}
        </Button>
        {isEditMode && onCancelEdit && (
          <Button type="button" variant="secondary" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
