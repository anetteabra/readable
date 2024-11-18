// generate a user ID and store it in local storage to use for saving favorites
import { v4 as uuidv4 } from "uuid";

function getOrCreateUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4(); // Generate a UUID using the `uuid` package
    localStorage.setItem("userId", userId);
  }
  return userId;
}

export default getOrCreateUserId;
 
