import { memo } from "react";
import type { Contact } from "../types/contact";
import "./ContactTable.css";

interface ContactTableProps {
  contacts: Contact[];
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDeleteRequest: (contact: Contact) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const truncate = (text: string, max = 60) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

// Wrapped in React.memo so a row only re-renders if its own contact data
// changes -- this is what makes memoizing the onView/onEdit/onDelete
// callbacks with useCallback (in the parent) actually worthwhile.
const ContactRow = memo(function ContactRow({
  contact,
  onView,
  onEdit,
  onDeleteRequest,
}: {
  contact: Contact;
  onView: (c: Contact) => void;
  onEdit: (c: Contact) => void;
  onDeleteRequest: (c: Contact) => void;
}) {
  return (
    <tr>
      <td data-label="Name">{contact.name}</td>
      <td data-label="Email">{contact.email}</td>
      <td data-label="Message">{truncate(contact.message)}</td>
      <td data-label="Created Date">{formatDate(contact.createdAt)}</td>
      <td data-label="Actions" className="actions-cell">
        <button className="action-btn" onClick={() => onView(contact)}>
          View
        </button>
        <button className="action-btn" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button className="action-btn action-btn-danger" onClick={() => onDeleteRequest(contact)}>
          Delete
        </button>
      </td>
    </tr>
  );
});

function ContactTable({ contacts, onView, onEdit, onDeleteRequest }: ContactTableProps) {
  return (
    <div className="table-wrap">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onView={onView}
              onEdit={onEdit}
              onDeleteRequest={onDeleteRequest}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
