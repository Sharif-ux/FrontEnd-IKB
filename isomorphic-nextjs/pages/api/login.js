import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  const { user } = await req.body;
  console.log('username', user);
  const url = `http://localhost:3000/login`;

  try {
    const response = await fetch(url);
console.log(response)
    if (response.ok) {
    const { id } = await response.json();
    return res.status(200).json({ token: id });
    return res.status(200).json({ token: true });
    } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
    }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
