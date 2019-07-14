var sqlite3 = require('sqlite3');
var sampleMetadata = require('../metadata.json');
var SQLite = sqlite3.verbose();
var connection = new SQLite.Database(':memory:');

function initialise() {
  connection.serialize(() => {
    connection.run('DROP TABLE IF EXISTS metadata');
    connection.run(
      'CREATE TABLE metadata (title TEXT, writer TEXT, producer TEXT, created_at DATE, updated_at DATE)',
    );
    var { metadata } = sampleMetadata;
    metadata.forEach(data => {
      connection.run(
        'INSERT INTO metadata (title, writer, producer, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [
          data.title,
          data.writer,
          data.producer,
          data.createdAt,
          data.updatedAt,
        ],
      );
    });
  });
}

module.exports = { initialise, connection };
