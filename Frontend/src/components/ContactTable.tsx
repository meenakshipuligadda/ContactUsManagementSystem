import { memo, useMemo } from "react";
import Highlight from "./ui/Highlight";
import type { Contact } from "../types/contact";
import "./ContactTable.css";

interface ContactTableProps {
  contacts: Contact[];
  /** Current search term, used to highlight matches in the table. */
  search: string;
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

/** Escape user input so a search for "a.b" isn't treated as a regex. */
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ContactRow = memo(function ContactRow({
  contact,
  matcher,
  onView,
  onEdit,
  onDeleteRequest,
}: {
  contact: Contact;
  matcher: RegExp | null;
  onView: (c: Contact) => void;
  onEdit: (c: Contact) => void;
  onDeleteRequest: (c: Contact) => void;
}) {
  return (
    <tr>
      <td data-label="Name">
        <Highlight text={contact.name} matcher={matcher} />
      </td>
      <td data-label="Email">
        <Highlight text={contact.email} matcher={matcher} />
      </td>
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

function ContactTable({
  contacts,
  search,
  onView,
  onEdit,
  onDeleteRequest,
}: ContactTableProps) {
  // useMemo: compiling a RegExp is real work, and without this it would be
  // rebuilt for every row on every render. Memoising means it is built once
  // per search term instead, and the identical object also lets the memoised
  // rows below skip re-rendering when nothing relevant changed.
  const matcher = useMemo(() => {
    const term = search.trim();
    if (!term) return null;
    return new RegExp(`(${escapeRegex(term)})`, "gi");
  }, [search]);

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
              matcher={matcher}
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
