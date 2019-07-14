import { connection } from './data';
import router from './database';

const metadataDatabase = router(connection);
export default metadataDatabase;
