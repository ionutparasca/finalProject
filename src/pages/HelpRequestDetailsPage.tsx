import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import type { HelpRequest } from "../types/helpRequest";
import type { Comment } from "../types/comment";
import "../styles/common.css";

export function HelpRequestDetailsPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [helpRequest, setHelpRequest] = useState<HelpRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, commentsRes] = await Promise.all([
          fetch(`http://localhost:3001/helpRequests/${id}`),
          fetch(`http://localhost:3001/comments?requestId=${id}`),
        ]);

        if (!reqRes.ok || !commentsRes.ok) throw new Error("Eroare la fetch.");

        const requestData = await reqRes.json();
        const commentsData = await commentsRes.json();

        setHelpRequest(requestData);
        setComments(commentsData);
      } catch (err) {
        console.error(err);
        alert("Eroare la încărcarea datelor.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    const commentObj: Omit<Comment, "id"> = {
      requestId: id!,
      authorId: user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      authorImage: user.profileImage || "",
      text: newComment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObj),
      });

      if (!res.ok) throw new Error("Eroare la adăugarea comentariului");

      const created = await res.json();
      setComments((prev) => [...prev, created]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Eroare la adăugare comentariu.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Eroare la ștergerea comentariului");

      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere.");
    }
  };

  if (loading) return <p>Se încarcă...</p>;
  if (!helpRequest) return <p>Cererea nu a fost găsită.</p>;

  return (
    <div className="details-container">
      <h2>{helpRequest.title}</h2>
      <p>{helpRequest.description}</p>

      <hr />

      <h3>Comentarii</h3>
      {comments.length === 0 ? (
        <p>Nu există comentarii încă.</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              {comment.authorImage && (
                <img
                  src={comment.authorImage}
                  alt="avatar"
                  className="comment-avatar"
                />
              )}
              <div>
                <p className="comment-author">
                  <strong>{comment.authorName}</strong> —{" "}
                  <small>
                    {new Date(comment.createdAt).toLocaleString("ro-RO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </small>
                </p>
                <p>{comment.text}</p>
                {comment.authorId === user?.id && (
                  <button
                    className="delete-comment-btn"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    🗑️ Șterge
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Scrie un comentariu..."
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
        />
        <button onClick={handleAddComment} disabled={!newComment.trim()}>
          Trimite comentariul
        </button>
      </div>
    </div>
  );
}
