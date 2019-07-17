import * as sinon from 'sinon';
import handler, { fullPath } from './downloadSong';
import metadataDatabase from '../database';

describe('downloadSong handler', () => {
  const mockRequest = {
    params: {
      id: 1,
    },
  };

  let responseStubs;
  beforeEach(() => {
    responseStubs = {
      send: sinon.stub(),
      status: sinon.stub(),
      download: sinon.stub(),
    };
  });

  afterEach(() => sinon.restore());

  it('should return a 500 if getById fails', async () => {
    const error = new Error('shucks');
    sinon.stub(metadataDatabase, 'getById').rejects(error);

    await handler(mockRequest, responseStubs);

    expect(responseStubs.status.calledOnceWith(500)).toEqual(true);
    expect(
      responseStubs.send.calledOnceWith('Could not fetch song information'),
    ).toEqual(true);
  });

  it('should return a 500 if file_name is empty', async () => {
    sinon.stub(metadataDatabase, 'getById').resolves([
      {
        file_name: undefined,
      },
    ]);

    await handler(mockRequest, responseStubs);

    expect(responseStubs.status.calledOnceWith(500)).toEqual(true);
    expect(responseStubs.send.calledOnceWith('Cannot find song file')).toEqual(
      true,
    );
  });

  it('should call the download file method with the song file name', async () => {
    const fileName = 'hummus.mp3';
    responseStubs;

    sinon.stub(metadataDatabase, 'getById').resolves([
      {
        file_name: fileName,
      },
    ]);

    await handler(mockRequest, responseStubs);

    expect(responseStubs.download.calledOnceWith(fullPath(fileName))).toEqual(
      true,
    );
  });
});
