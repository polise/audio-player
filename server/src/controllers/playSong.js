import metadataDatabase from '../database';
import play from 'audio-play';
import load from 'audio-loader';

const SONGS_FOLDER = `../../media`;

export const fullPath = fileName => `${__dirname}/${SONGS_FOLDER}/${fileName}`;

export default async function handler(req, res) {
  const id = parseInt(req.params.id);
  let song;

  try {
    song = await metadataDatabase.getById(req.params.id);
  } catch (error) {
    res.status(500);
    return res.send('Could not fetch song information');
  }

  if (!song[0].file_name) {
    res.status(500);
    return res.send('Cannot find song file');
  }

  const songFile = `${fullPath(song[0].file_name)}`;
  try {
    const result = await load(songFile);
    play(result);
  } catch (error) {
    res.status(500);
    return res.send('Error loading and playing audio file');
  }

  res.status(204);
  return res.send();
}
