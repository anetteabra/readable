interface CommentProps {
  author: string;
  content: string;
  date: string;
}

const Comment: React.FC<CommentProps> = ({ author, content, date }) => {
  return (
    <div className="comment">
      <h4>{author}</h4>
      <p>{content}</p>
      <small>{date}</small>
    </div>
  );
};

export default Comment;
