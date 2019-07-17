import * as sinon from 'sinon';
import handler from './metadata';
import metadataDatabase from '../database';

describe('metadata handler', () => {
  let responseStubs;
  beforeEach(() => {
    responseStubs = {
      send: sinon.stub(),
      status: sinon.stub(),
    };
  });

  afterEach(() => sinon.restore());

  it('should return the data received from the db', async () => {
    const mockRequest = {
      query: {
        pageNo: 1,
        size: 1,
      },
    };
    const expectedResult = { some: 'result' };

    sinon.stub(metadataDatabase, 'getMetadata').resolves(expectedResult);

    await handler(mockRequest, responseStubs);
    expect(responseStubs.send.calledOnceWith(expectedResult)).toEqual(true);
  });

  it('should return a 500 if the db fails to fetch', async () => {
    const mockRequest = {
      query: {
        pageNo: 1,
        size: 1,
      },
    };
    sinon.stub(metadataDatabase, 'getMetadata').rejects(new Error('shucks'));

    await handler(mockRequest, responseStubs);

    expect(responseStubs.status.calledOnceWith(500)).toEqual(true);
    expect(
      responseStubs.send.calledOnceWith('Could not fetch metadata'),
    ).toEqual(true);
  });
});
