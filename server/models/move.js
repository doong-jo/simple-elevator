const MongooseSchema = require('mongoose').Schema;
const { getConnection } = require('../utils/mongoose');

const moveFields = {
  line_number: Number,
  start: Number,
  dest: Number,
};

const moveSchema = new MongooseSchema(moveFields, {
  collection: 'move',
  bufferCommands: false,
});

const connection = getConnection();
export default connection.model('move', moveSchema);
