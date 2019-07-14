const data = require('./data.js');

function createMetadataService(connection) {
  return {
    getMetadata: () => {
      return new Promise((resolve, reject) => {
        connection.all(
          'SELECT title, writer, producer, created_at, updated_at FROM metadata ORDER BY title',
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          },
        );
      });
    },
    // addMetadata: (writer, , unit) => {
    //   return new Promise((resolve, reject) => {
    //     connection.run(
    //       'INSERT INTO meter_reads (cumulative, reading_date, unit) VALUES (?, ?, ?)',
    //       [cumulative, readingDate, unit],
    //       (result, error) => {
    //         if (error) {
    //           reject(error);
    //         }
    //         resolve(result);
    //       },
    //     );
    //   });
    // },
  };
}

module.exports = createMetadataService;
