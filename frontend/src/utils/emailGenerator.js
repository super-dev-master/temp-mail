import axios from "axios";

export const generateRandomEmail = async () => {
  const res = await axios.get("https://localhost:8000/generate-email");

  return res.data.email;
}