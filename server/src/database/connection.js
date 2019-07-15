import * as sqlite3 from 'sqlite3';

const sampleMetadata = require('../../metadata.json');
const SQLite = sqlite3.verbose();

export const connection = new SQLite.Database(':memory:');

export function initialize() {
  connection.serialize(() => {
    connection.run('DROP TABLE IF EXISTS metadata');
    connection.run(
      'CREATE TABLE metadata (id INT, title TEXT, writer TEXT, producer TEXT, created_at DATE, updated_at DATE, file_name TEXT)',
    );
    var { metadata } = sampleMetadata;
    metadata.forEach(data => {
      connection.run(
        'INSERT INTO metadata (id, title, writer, producer, created_at, updated_at, file_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          data.id,
          data.title,
          data.writer,
          data.producer,
          data.created_at,
          data.updated_at,
          data.file_name,
        ],
      );
    });
  });
}
