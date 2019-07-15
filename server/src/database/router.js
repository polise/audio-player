export default function router(connection) {
  return {
    getMetadata: (pageNo, size) => {
      return new Promise((resolve, reject) => {
        const skip = (pageNo - 1) * size;

        connection.all(
          `SELECT id, title, writer, producer, created_at, updated_at, file_name FROM metadata WHERE id > ${skip} ORDER BY id LIMIT ${size}`,
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          },
        );
      });
    },
    getById: id => {
      return new Promise((resolve, reject) => {
        connection.all(
          `SELECT id, title, writer, producer, created_at, updated_at, file_name FROM metadata WHERE id = ${id}`,
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          },
        );
      });
    },
  };
}
