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

### GET /download/:id

Downloads a song with a given id.

GET `/play/6` would download the song with id 6

## Notes

I am unfamiliar with express (my company uses koa), and so it took me a while to read the docsa and get my head around everything. I may have written it in a slightly different manner than expected. Hopefully not!

I put some very short media files into the repo so that you can test my code straightaway, but I wouldn't otherwise commit audio files.

I think I did a good job of writing fairly clean code and am happy with the level of parameter validation and error handling that I put in given the time constraint and context.

Were I to have more time, I would focus on refactoring the database code. I think some of the organisation of that directory is a bit off and would ideally intialise the entries in these tables via a database patch, not on starting up the application.

Additionally, were I to have more time, I would add some typing - I am used to Typescript and don't know whether Flow is the go-to still (or ever was for backend code).
