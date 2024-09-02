import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Heart, MessageSquare } from "lucide-react";

interface Comment {
  id: number;
  content: string;
  like_count: number;
  created_at: string;
  user: string; // Kullanıcı adı doğrudan string tipinde.
}

const CommentSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvemNheWRldnJpbTNAZ21haWwuY29tIiwiZXhwIjoxNzI1NjIyODQ2fQ.la7S-Saa8cy6esJV_V8UBDIofSFq-ioupiIq3j7c7SIpdtMj-O8BO3LKx7PDujukU4JIgcr9jNDrfSsguTsn1A";

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/video-comments/${id}?page=1&size=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching comments");
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;

    try {
      const response = await fetch(
        `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/video-comments/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newComment, parentId: null }),
        }
      );
      if (!response.ok) {
        throw new Error("Error adding comment");
      }
      // POST işlemi başarılı olduktan sonra yorumları yeniden çek
      fetchComments();
      setNewComment(""); // Yorum alanını temizle
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/video-comments/like/${commentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error liking comment");
      }
      const result = await response.json(); // Beğeni sonrası güncellenmiş veriyi dönmesi beklenir.
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, like_count: result.like_count } : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <div className="add-comment my-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a public comment..."
          className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
        />
        <Button onClick={handleAddComment} className="mt-2">Comment</Button>
      </div>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment my-4">
              <div className="comment-content">
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.content}</p>
              </div>
              <div className="comment-actions flex gap-4">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <Heart size={16} /> {comment.like_count}
                </Button>
                <Button variant="link" size="sm">
                  <MessageSquare size={16} /> Reply
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
