import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import NoteCard from "../components/NoteCard.jsx";
import NoteForm from "../components/NoteForm.jsx";

const API_BASE = "http://localhost:5000/api/notes";

export default function Home() {
  const { getToken } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
  }, [getToken]);

  const fetchNotes = useCallback(async () => {
    try {
      setError("");
      const headers = await getAuthHeaders();
      const { data } = await axios.get(API_BASE, { headers });
      setNotes(data);
    } catch (err) {
      setError("Failed to load notes. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const handleSubmit = async ({ title, content }) => {
    setIsSaving(true);
    setError("");
    try {
      const headers = await getAuthHeaders();
      if (editingNote) {
        const { data } = await axios.put(`${API_BASE}/${editingNote.id}`, { title, content }, { headers });
        setNotes(prev => prev.map(n => n.id === editingNote.id ? data : n));
      } else {
        const { data } = await axios.post(API_BASE, { title, content }, { headers });
        setNotes(prev => [data, ...prev]);
      }
      closeForm();
    } catch {
      setError("Failed to save note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const headers = await getAuthHeaders();
      await axios.delete(`${API_BASE}/${id}`, { headers });
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch {
      setError("Failed to delete note.");
    }
  };

  const handleEdit = (note) => { setEditingNote(note); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingNote(null); };

  if (isLoading) return <div className="loading-screen"><div className="spinner" /><p>Loading your notes…</p></div>;

  return (
    <div>
      <div className="home-header">
        <h1>My <span>Notes</span></h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ New note</button>
      </div>
      {error && <div className="error-banner">{error}</div>}
      <div className="notes-grid">
        {notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No notes yet</h3>
            <p>Create your first note to get started.</p>
          </div>
        ) : (
          notes.map(note => <NoteCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />)
        )}
      </div>
      {showForm && <NoteForm onSubmit={handleSubmit} onClose={closeForm} editNote={editingNote} isLoading={isSaving} />}
    </div>
  );
}