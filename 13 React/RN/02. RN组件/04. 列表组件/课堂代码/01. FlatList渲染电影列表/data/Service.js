import moviesData from "./movies.json";

// 分页查询电影
export function queryMovies(currentPage = 1, pageSize = 10) {
  return moviesData.slice((currentPage - 1) * pageSize, pageSize * currentPage);
}

// 随机刷新两部电影
export function randomRefreshMovies() {
  let randomStartIndex = Math.floor(Math.random() * (moviesData.length - 2));
  return moviesData.slice(randomStartIndex, randomStartIndex + 2);
}
