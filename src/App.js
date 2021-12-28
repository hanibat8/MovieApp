import Layout from "./components/UI/Layout";
import Search from "./components/Search/Search";
import './App.css';
import MovieList from "./components/Movie/MovieList";
import Header from "./components/UI/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <Layout >
        <MovieList url={['https://api.themoviedb.org/3/movie/popular?api_key=5c8ece04ea5e1e31bb7e5630081968b6','https://api.themoviedb.org/3/movie/top_rated?api_key=5c8ece04ea5e1e31bb7e5630081968b6']}/>
      </Layout>
    </div>
  );
}

export default App;
