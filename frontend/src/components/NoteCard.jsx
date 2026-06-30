export default function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="note-card">
      <h3 className="note-card-title">{note.title}</h3>
      <p className="note-card-content">{note.content}</p>
      <div className="note-card-footer">
        <span className="note-card-date">{formatDate(note.updatedAt)}</span>
        <div className="note-card-actions">
          <button className="btn btn-edit" onClick={() => onEdit(note)}>✏️ Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(note.id)}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}