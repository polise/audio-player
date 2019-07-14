import data from './data';

export default function router(connection) {
  console.log('hello i am in router ');
  return {
    getMetadata: () => {
      console.log('i am in here getMetadata()');
      return new Promise((resolve, reject) => {
        connection.all(
          'SELECT title, writer, producer, created_at, updated_at FROM metadata ORDER BY title',
          (error, results) => {
            console.log('was ist results', results);
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
