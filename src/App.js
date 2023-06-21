import "./App.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Movie from "./Movie";
import Filter from "./Filter";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=19f819fe84c8a3dfc509667bab3208c6&language=vi&page=1"
    );
    const movie = await data.json();
    setPopular(movie.results);
    setFiltered(movie.results);
  };

  console.log(filtered);

  return (
    <div className="App">
      <h3 className="title">Phim thịnh hành</h3>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
