import * as sinon from 'sinon';
import metadataDatabase from './';
import { initialize } from './connection';
import metadata from '../../metadata.json';

describe('getMetadata()', () => {
  beforeEach(() => {
    initialize();
  });

  it('should return the data received from the db', async () => {
    const pageNo = 1;
    const size = 1;
    const result = await metadataDatabase.getMetadata(pageNo, size);

    expect(result).toEqual([metadata.metadata[0]]);
  });

  it('should paginate', async () => {
    const pageNo = 2;
    const size = 1;
    const result = await metadataDatabase.getMetadata(pageNo, size);

    expect(result).toEqual([metadata.metadata[1]]);
  });

  it('should return nothing if there is no data at a given pageNo', async () => {
    const pageNo = 20;
    const size = 1;
    const result = await metadataDatabase.getMetadata(pageNo, size);

    expect(result).toEqual([]);
  });
});
