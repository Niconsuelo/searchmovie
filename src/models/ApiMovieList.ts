import ApiMovieResult from "./ApiMovieResult";


interface ApiMovieList {
  page: number;
  results: ApiMovieResult[];
  total_pages: number;
  total_results: number;
}
export default ApiMovieList;
