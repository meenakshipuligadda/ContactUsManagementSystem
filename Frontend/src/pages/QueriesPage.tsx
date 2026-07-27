import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContacts } from "../hooks/useContacts";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import ContactTable from "../components/ContactTable";
import Pagination from "../components/Pagination";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
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
    isFiltered,
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

  const clearFilters = () => {
    setSearch("");
    setDateFilter("");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError("");
    try {
      await handleDelete(deleteTarget.id);
      setDeleteSuccess("Query deleted.");
      setDeleteTarget(null);
      setTimeout(() => setDeleteSuccess(""), 2500);
    } catch (err) {
      console.error(err);
      setDeleteError("Couldn't delete that query. Try again.");
    }
  };

  return (
    <div className="queries-page">
      <div className="queries-header">
        <h2>Submitted queries ({total})</h2>
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
            title={isFiltered ? "No matching queries" : "No queries yet"}
            subtitle={
              isFiltered
                ? "Nothing matches your search and filters."
                : "Messages sent through the contact form will show up here."
            }
            action={
              isFiltered ? (
                <Button variant="secondary" onClick={clearFilters}>
                  Clear search and filters
                </Button>
              ) : (
                <Link to="/contact">
                  <Button variant="primary">Send a message</Button>
                </Link>
              )
            }
          />
        ) : (
          <>
            <ContactTable
              contacts={contacts}
              search={search}
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
        title="Message details"
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
            The message from <strong>{deleteTarget.name}</strong> will be permanently
            removed. This can't be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}

export default QueriesPage;
