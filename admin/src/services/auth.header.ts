export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);
  if (user && user.token) {
    // Hardcoded for now
    //return { Authorization: "Bearer " + user.token };
    return { Authorization: "Bearer " + "0123456789" };
  } else {
    return { Authorization: "" };
  }
}
