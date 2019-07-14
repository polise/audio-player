import metadataDatabase from '../database';

export default async function handler(req, res) {
  try {
    const pageNo = parseInt(req.query.pageNo);
    const size = parseInt(req.query.size);
    const metadata = await metadataDatabase.getMetadata(pageNo, size);

    return res.send(metadata);
  } catch (error) {
    res.status(500).send('Something happened');
  }
}
