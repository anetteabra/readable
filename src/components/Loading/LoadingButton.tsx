import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import styles from "./LoadingButton.module.css";

export default function (){
    return(
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <Button className={styles.LoadingButton}>Load more</Button></>
    );
};