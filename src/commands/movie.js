const axios = require('axios');
const genres = require('../genres');

const generateNumber = (max) => Math.floor(Math.random() * (max - 1 + 1)) + 1;

const getRandomMovie = (movies) => movies[generateNumber(20)];

const reply = (movie, msg) => {
  const answer = `**Title**: ${movie.title}\n**Plot**: ${movie.overview}\nhttps://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
  msg.channel.send(answer);
};

module.exports = async (msg, args) => {
  let res;
  let movie;
  if (!args.length) return;
  // console.log(args[0]);
  switch (args[0]) {
    case 'suggest':
      res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&page=${generateNumber(1000)}`);
      movie = getRandomMovie(res.data.results);
      reply(movie, msg);
      break;
    case 'genre':
      const selectedGenre = genres.find((genre) => genre.name === args[1].toLowerCase());
      res = await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.API_KEY}&with_genres=${selectedGenre.id}&page=${generateNumber(500)}`);
      movie = getRandomMovie(res.data.results);
      reply(movie, msg);
      break;

    default:
      break;
  }
};
