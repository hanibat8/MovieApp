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
        <MovieList/>
      </Layout>
    </div>
  );
}

export default App;
