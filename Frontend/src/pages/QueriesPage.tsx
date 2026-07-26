import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../hooks/useContacts";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import ContactTable from "../components/ContactTable";
import Pagination from "../components/Pagination";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import type { Contact } from "../types/contact";
import "./QueriesPage.css";

function QueriesPage() {
  const navigate = useNavigate();
  const {
    contacts,
    total,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    dateFilter,
    setDateFilter,
    sortBy,
    order,
    setSortBy,
    setOrder,
    loading,
    error,
    isEmpty,
    handleDelete,
  } = useContacts();

  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  // useCallback so ContactTable's memoized rows don't re-render just
  // because QueriesPage re-rendered for an unrelated reason (e.g. typing
  // in the search box updating `search` state).
  const handleView = useCallback((contact: Contact) => setViewingContact(contact), []);
  const handleEdit = useCallback(
    (contact: Contact) => navigate(`/contact/edit/${contact.id}`),
    [navigate]
  );
  const handleDeleteRequest = useCallback((contact: Contact) => setDeleteTarget(contact), []);

  const handleSortChange = (field: typeof sortBy, dir: typeof order) => {
    setSortBy(field);
    setOrder(dir);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError("");
    try {
      await handleDelete(deleteTarget.id);
      setDeleteSuccess("Contact deleted successfully.");
      setDeleteTarget(null);
      setTimeout(() => setDeleteSuccess(""), 2500);
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="queries-page">
      <div className="queries-header">
        <h2>Submitted Queries ({total})</h2>
      </div>

      <div className="queries-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSection
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
          sortBy={sortBy}
          order={order}
          onSortChange={handleSortChange}
        />
      </div>

      {deleteSuccess && <Alert type="success" message={deleteSuccess} />}
      {deleteError && <Alert type="error" message={deleteError} />}
      {error && <Alert type="error" message={error} />}

      <div className="queries-table-card">
        {loading ? (
          <Spinner />
        ) : isEmpty ? (
          <EmptyState
            title="No queries found"
            subtitle={search || dateFilter ? "Try adjusting your search or filters." : "No one has submitted a message yet."}
          />
        ) : (
          <>
            <ContactTable
              contacts={contacts}
              onView={handleView}
              onEdit={handleEdit}
              onDeleteRequest={handleDeleteRequest}
            />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* View details modal */}
      <Modal
        isOpen={Boolean(viewingContact)}
        title="Message Details"
        confirmLabel="Close"
        onConfirm={() => setViewingContact(null)}
        onCancel={() => setViewingContact(null)}
      >
        {viewingContact && (
          <div className="view-details">
            <p>
              <strong>Name:</strong> {viewingContact.name}
            </p>
            <p>
              <strong>Email:</strong> {viewingContact.email}
            </p>
            <p>
              <strong>Message:</strong> {viewingContact.message}
            </p>
            <p>
              <strong>Submitted:</strong> {new Date(viewingContact.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        title="Delete this query?"
        confirmLabel="Delete"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      >
        {deleteTarget && (
          <p>
            Are you sure you want to delete the message from <strong>{deleteTarget.name}</strong>?
            This can't be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}

export default QueriesPage;
