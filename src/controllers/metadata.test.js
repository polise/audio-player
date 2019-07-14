import * as sinon from 'sinon';
import handler from './metadata';
import metadataDatabase from '../database';

describe('metadata handler', () => {
  it('should return the data received from the db', async () => {
    const mockRequest = {
      query: {
        pageNo: 1,
        size: 1,
      },
    };
    const expectedResult = { some: 'result' };

    sinon.stub(metadataDatabase, 'getMetadata').resolves(expectedResult);
    const responseSpy = {
      send: sinon.spy(),
    };

    await handler(mockRequest, responseSpy);
    expect(responseSpy.send.calledOnceWith(expectedResult)).toEqual(true);
  });
});
