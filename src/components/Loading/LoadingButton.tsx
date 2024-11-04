import { Button } from "../ui/button";
import styles from "./LoadingButton.module.css";

interface LoadingButtonProps {
  onClick?: () => void;
}

export default function LoadingButton({ onClick }: LoadingButtonProps) {
  return (
    <Button className={styles.LoadingButton} onClick={onClick}>
      Load more
    </Button>
  );
}
