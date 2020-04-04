const axios = require('axios');

module.exports = async (msg, args) => {
  if (!args.length) return;
  // console.log(args[0]);
  switch (args[0]) {
    case 'suggest':
      const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`);
      const suggestions = res.data.results;
      const movie = suggestions[Math.floor(Math.random() * 21)];
      const reply = `${movie.title}\nhttps://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
      msg.channel.send(reply);
      break;

    default:
      break;
  }
};
