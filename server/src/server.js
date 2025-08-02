import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Server is live!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});