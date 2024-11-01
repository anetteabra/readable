/* import { useQuery } from "@apollo/client";
import { Review, ReviewsProps, GET_REVIEWS } from "../../queries";

const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  const { loading, error, data } = useQuery<{ reviews: Review[] }>(
    GET_REVIEWS,
    {
      variables: { bookId },
    },
  );

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {data?.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {data?.reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.name}</strong> ({review.stars} stars)
              </p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews; */
