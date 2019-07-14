export default function router(connection) {
  return {
    getMetadata: (pageNo, size) => {
      return new Promise((resolve, reject) => {
        const skip = (pageNo - 1) * size;

        connection.all(
          `SELECT id, title, writer, producer, created_at, updated_at, file_name FROM metadata WHERE id > ${skip} ORDER BY title LIMIT ${size}`,
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
