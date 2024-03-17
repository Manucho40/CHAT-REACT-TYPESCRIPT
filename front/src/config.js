const BaseURL =
  process.env.NODE_ENV === "production"
    ? "https://ange-chat.onrender.com"
    : "http://localhost:8080";
export default BaseURL;
