import express from 'express';

import { router } from './routes';
import { initializeFirebase } from './lib/helpers';

const app = express();
const PORT = process.env.PORT || 8080;

initializeFirebase();

app.use(express.json());
app.use(router);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});