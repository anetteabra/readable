// generate a user ID and store it in local storage to use for saving favorites

function getOrCreateUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID(); // Generates a unique, secure UUID
    localStorage.setItem("userId", userId);
  }
  return userId;
}

export default getOrCreateUserId;
