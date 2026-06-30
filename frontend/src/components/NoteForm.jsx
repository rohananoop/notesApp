import { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, onClose, editNote = null, isLoading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) { setTitle(editNote.title); setContent(editNote.content); }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>{editNote ? "Edit note" : "New note"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" placeholder="Give your note a title..." value={title} onChange={e => setTitle(e.target.value)} autoFocus required />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea id="content" placeholder="Write your note here..." value={content} onChange={e => setContent(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isLoading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading || !title.trim() || !content.trim()}>
              {isLoading ? "Saving..." : editNote ? "Save changes" : "Create note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}