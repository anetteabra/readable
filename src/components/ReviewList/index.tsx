import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "../ReviewComment";

const reviews = [
  // just for testing purposes
  {
    author: "John Doe",
    content: "Excellent book, highly recommended!",
    date: "2024-01-12",
  },
  {
    author: "Jane Smith",
    content: "Very insightful, but some chapters were too long.",
    date: "2024-01-10",
  },
  {
    author: "Mark Wilson",
    content: "Not as engaging as I hoped.",
    date: "2024-01-08",
  },
  {
    author: "Alice Johnson",
    content: "Good read, but could be shorter.",
    date: "2024-01-05",
  },
  {
    author: "Bob Brown",
    content: "A must-read for anyone interested in the subject!",
    date: "2024-01-03",
  },
];

const ReviewList: React.FC = () => {
  return (
    <ScrollArea
      // need to redo this, do not use tailwind
      // also, style it nicer, it looks boring now
      style={{
        height: "150px",
        width: "250px",
        border: "1px solid black",
        overflowY: "auto",
      }}
    >
      <h1>List of reviews</h1>
      {reviews.map((review, index) => (
        <div key={index}>
          <Comment
            author={review.author}
            content={review.content}
            date={review.date}
          />
          {index < reviews.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </ScrollArea>
  );
};

export default ReviewList;
