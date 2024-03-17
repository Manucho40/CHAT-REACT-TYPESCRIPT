const BaseURL =
  process.env.NODE_ENV === "production"
    ? "https://api-ange-chat.onrender.com"
    : "http://localhost:8080";
export default BaseURL;
