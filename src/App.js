import { MoviesList } from "./Components/MoviesList";
import { MovieDetails } from "./Components/MovieDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./store/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
