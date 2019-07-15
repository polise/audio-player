import * as sinon from 'sinon';
import * as play from 'audio-play';
import * as load from 'audio-loader';
import handler, { fullPath } from './playSong';
import metadataDatabase from '../database';

describe('playSong handler', () => {
  const fileName = 'whimsy.mp3';
  let responseSpy;
  beforeEach(() => {
    responseSpy = {
      status: sinon.spy(),
      send: sinon.spy(),
    };
  });

  afterEach(() => sinon.restore());

  const mockRequest = {
    params: {
      id: 1,
    },
  };

  it('should return a 500 if getById fails', async () => {
    const error = new Error('shucks');
    sinon.stub(metadataDatabase, 'getById').rejects(error);

    await handler(mockRequest, responseSpy);

    expect(responseSpy.status.calledOnceWith(500)).toEqual(true);
    expect(
      responseSpy.send.calledOnceWith('Could not fetch song information'),
    ).toEqual(true);
  });

  it('should return a 500 if file_name is empty', async () => {
    sinon.stub(metadataDatabase, 'getById').resolves([
      {
        file_name: undefined,
      },
    ]);

    await handler(mockRequest, responseSpy);

    expect(responseSpy.status.calledOnceWith(500)).toEqual(true);
    expect(responseSpy.send.calledOnceWith('Cannot find song file')).toEqual(
      true,
    );
  });

  // TODO: Fix stubs
  // it('should return a 500 if load fails', async () => {
  //   const error = new Error('shucks');
  //   sinon.stub(metadataDatabase, 'getById').resolves([
  //     {
  //       file_name: fileName,
  //     },
  //   ]);

  //   const loadStub = sinon.stub(load, 'default').rejects(error);

  //   await handler(mockRequest, responseSpy);

  //   expect(responseSpy.status.calledOnceWith(500)).toEqual(true);
  //   expect(
  //     responseSpy.send.calledOnceWith('Error loading and playing audio file'),
  //   ).toEqual(true);
  // });

  // it('should return a 500 if play fails', async () => {
  //   sinon.stub(metadataDatabase, 'getById').resolves([
  //     {
  //       file_name: fileName,
  //     },
  //   ]);

  //   const loadStub = sinon
  //     .stub(load, 'default')
  //     .withArgs(fileName)
  //     .resolves();
  //   const playStub = sinon.stub(play, 'default').rejects();

  //   await handler(mockRequest, responseSpy);

  //   expect(responseSpy.status.calledOnceWith(500)).toEqual(true);
  //   expect(
  //     responseSpy.send.calledOnceWith('Error loading and playing audio file'),
  //   ).toEqual(true);
  // });

  // it('should play a song and resolve', async () => {
  //   sinon.stub(metadataDatabase, 'getById').resolves([
  //     {
  //       file_name: fileName,
  //     },
  //   ]);

  //   const loadStub = sinon
  //     .stub(load, 'default')
  //     .withArgs(fileName)
  //     .resolves();
  //   const playStub = sinon.stub(play, 'default').resolves();

  //   await handler(mockRequest, responseSpy);
  //   expect(responseSpy.status.calledOnceWith(204)).toEqual(true);
  // });
});
