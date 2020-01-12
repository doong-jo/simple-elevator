import express from 'express';
import * as path from 'path';
import * as https from 'https';
import * as fs from 'fs';
const app = express();

import notFoundHandler from './utils/notFoundHandler';
import serverInternalHandler from './utils/notFoundHandler';
import indexRouter from './routes/api';

const { PORT } = process.env;
const port = PORT || 3000;
const staticServe = express.static(path.join(__dirname, '../client'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(staticServe);

app.use('/api', indexRouter);
app.get('/', (req, res) => res.send('OK'));

app.use(notFoundHandler);
app.use(serverInternalHandler);

const options = {
  key: fs.readFileSync('./security/key.pem'),
  cert: fs.readFileSync('./security/cert.pem'),
};

https.createServer(options, app).listen(process.env.PORT || port, () => {
  console.log(`Listening ${port}...`);
});

module.exports = app;
