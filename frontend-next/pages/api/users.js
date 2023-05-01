import axios from "axios";

export default async function handler(req, res) {
  const { since } = req.query;
  const response = await axios.get(
    `${process.env.API}/api/users?since=${since}`
  );
  const data = response.data;
  res.status(200).json(data);
}
