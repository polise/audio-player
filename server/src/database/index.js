import { connection } from './connection';
import router from './router';

const metadataDatabase = router(connection);
export default metadataDatabase;
