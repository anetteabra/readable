import { useMutation } from '@apollo/client';
import {AddReview,ADD_REVIEW } from '../../queries';


const AddReviewForm: React.FC<AddReview> = ({ bookId }) => {
  const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      variables: {
        bookId, 
        name: "Linda",
        stars: 4,
        comment: "Beautiful story!"
      }
    });
  };

  if (loading) return <p>Submitting review...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Review</button>
      </form>
      {data && <p>Review added: {data.addReview.comment}</p>}
    </div>
  );
}

export default AddReviewForm;

