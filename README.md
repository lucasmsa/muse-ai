# 🎶 Muse.ai Application

- Next.js app to favorite songs, sort, search and play them!

### Main technologies used

- Docker
- Zustand
- Radix-ui
- TailwindCSS
- Framer-motion
- react-h5-audio-player
- Typescript, ESLint, Prettier

## Functionalities

- [x] User is able to favorite songs
- [x] User can play the song on the internal page
- [x] Favorited songs are persisted on local storage
- [x] Search field should display suggestions while typing
- [x] User can sort songs alphabetically on the main screen
- [x] User can filter and display only favorite songs on the main page

## How to run it

- Clone the repository `git clone https://github.com/lucasmsa/muse-ai.git`
- Change to the repository folder `cd muse-ai`

### Native

- Install the dependencies `yarn`
- You can then run `dev:client:server` or open up 2 terminals and execute `yarn dev` and `node server.js`

### Docker

- Run `docker-compose up --build`
