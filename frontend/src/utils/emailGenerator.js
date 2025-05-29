import axios from "axios";

export const generateRandomEmail = async () => {
  const res = await axios.get("https://bargainbliss.cfd/generate-email");

  return res.data.email;
}