import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import styles from "./ReviewComment.module.css";

type CommentProps = {
  name: string;
  stars: number;
  comment: string;
};

const renderStars = (stars: number) => {
  return (
    <div className={styles.stars} aria-label="stars">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} color={i < stars ? "#ffc107" : "#e4e5e9"} />
      ))}
    </div>
  );
};

export const Comment = ({ name, stars, comment }: CommentProps) => {
  return (
    <Card className={styles.CardContainer}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{renderStars(stars)}</p>
        <p>{comment}</p>
      </CardContent>
    </Card>
  );
};

export default Comment;
