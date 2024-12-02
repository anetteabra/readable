import { v4 } from "uuid";

function getOrCreateUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = v4(); // Generate a UUID using the `uuid` package
    localStorage.setItem("userId", userId);
  }
  return userId;
}

export default getOrCreateUserId;
