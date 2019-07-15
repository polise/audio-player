# Audio-player backend

This api allows you to fetch metadata and play some audio files.

I wrote it in express and used sqlite to store/access the metadata.

I used joi for data validation and audio-play and audio-load to load and play the audio files. I kept the very small audio files I used to test my code in a local directory (`./media`) and load the metadata on app initialisation from a json file called `metadata.json`.

The tests I wrote with jest. I made use of sinon for stubs.

## Getting started

### Install dependencies

You can do this by running `yarn`

### Create a .env file

You can do this by running `cp env.example .env` inside of ./server

## API

### GET /metadata?pageNo={pageNo}&size={size}

Gets metadata for songs. The endpoint is paginated and pageNo and size are required query params. Size is the number of entries returned on a single page.

GET `/metadata?pageNo=1&size=1` would return just the very first entry.

### GET /play/:id

Plays a song with a given id.

GET `/play/6` would play the song with id 6

## Notes

I am unfamiliar with express (my company uses koa), and so it took me a while to read the docsa and get my head around everything. I may have written it in a slightly different manner than expected. Hopefully not!

I put some very short media files into the repo so that you can test my code straightaway, but I wouldn't otherwise commit audio files.

I think I did a good job of writing fairly clean code and am happy with the level of parameter validation and error handling that I put in given the time constraint and context.

Were I to have more time, I would focus on improving the `/play` endpoint in the following ways:

1. When the song plays, an error shows up (`warning: Didn't have any audio data in callback (buffer underflow)`). I didn't have a lot of time to look into this today, but would not allow that to go into production code.

2. It would be nice to fetch the audio files from a database rather than keeping them locally.

3. I would like to do more checks to provide better error responses for this endpoint. For instance, it'd be nice to check whether a song exists in `/media` before trying to play it.

4. I could not get sinon to stub `play()` and `load()`. I am familiar with stubbing external default exports in sinon but still could not manage to get the function to use the stub that I declared instead of the dependency. I had to comment out some unit tests which fail because of this, which is frustrating.
