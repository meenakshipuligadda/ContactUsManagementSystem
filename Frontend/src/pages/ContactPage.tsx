import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Alert from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import { createContact, updateContact, getContactById } from "../services/contactService";
import type { ContactFormData } from "../types/contact";
import "./ContactPage.css";

function ContactPage() {
  // When the URL is /contact/edit/:id we're editing; /contact is create mode.
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<ContactFormData | undefined>(undefined);
  const [loadingContact, setLoadingContact] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoadingContact(true);
    getContactById(Number(id))
      .then((contact) => {
        setInitialData({ name: contact.name, email: contact.email, message: contact.message });
      })
      .catch(() => setErrorMessage("Could not load this contact. It may have been deleted."))
      .finally(() => setLoadingContact(false));
  }, [id]);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (isEditMode && id) {
    await updateContact(Number(id), data);
    setSuccessMessage("Message updated successfully!");
    } else {
        await createContact(data);
        setSuccessMessage("Message sent successfully!");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-page-card">
        <h2>{isEditMode ? "Update Your Message" : "Send Us a Message"}</h2>
        <p className="contact-page-subtitle">
          {isEditMode
            ? "Make changes below and update your submission."
            : "Fill out the form and we'll get back to you soon."}
        </p>

        {successMessage && <Alert type="success" message={successMessage} />}
        {errorMessage && <Alert type="error" message={errorMessage} />}

        {loadingContact ? (
          <Spinner />
        ) : (
          <ContactForm
            initialData={initialData}
            isEditMode={isEditMode}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancelEdit={() => navigate("/queries")}
          />
        )}
      </div>
    </div>
  );
}

export default ContactPage;
