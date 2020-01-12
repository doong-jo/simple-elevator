const mongoose = require('mongoose');
import { config } from 'dotenv';
config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addr = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.Promise = global.Promise;

export function getConnection() {
  return mongoose.createConnection(addr, option);
}
