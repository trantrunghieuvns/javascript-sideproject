const key = "eb3017d728f7ae5e3cec77e77f7e0ffc";

export const requests = {
  requestTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US`,
  requestUpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestSearch: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=`,
};

export default requests;
