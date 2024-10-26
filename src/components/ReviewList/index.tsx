import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "../ReviewComment";
import styles from "./ReviewList.module.css";
import { GET_REVIEWS, Review, ReviewsProps } from "@/queries";
import { useQuery } from "@apollo/client";

const ReviewList: React.FC<ReviewsProps> = ({ bookId }) => {
  const { loading, error, data } = useQuery<{ reviews: Review[] }>(GET_REVIEWS, {
    variables: { bookId },
  });

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // If data is defined, check for reviews
  const reviews = data?.reviews;

  return (
    <ScrollArea className={styles.scrollArea}>
      <h1 className={styles.title}>Reviews of this book</h1>

      {/* Check if there are any reviews */}
      {reviews?.length === 0 ? (
        <p>No reviews of this book yet</p>
      ) : (
        reviews?.map((review, index) => (
          <div key={index}>
            <Comment
              name={review.name}
              stars={review.stars}
              comment={review.comment}
            />
            {index < reviews.length - 1 && (
              <Separator className={styles.separator} />
            )}
          </div>
        ))
      )}
    </ScrollArea>
  );
};

export default ReviewList;
