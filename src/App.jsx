import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PokemonList from "./pages/PokemonList";
import PokemonForm from "./pages/PokemonForm";
import TrainerList from "./pages/TrainerList";
import TrainerForm from "./pages/TrainerForm";
import TrainerDetail from "./pages/TrainerDetail";
import PokemonDetail from "./pages/PokemonDetail";
import LoginPage from "./pages/LoginPage"; 

function App() {
  return (
    <Router>
      {/* El Header aparece arriba en todas las pantallas */}
      <Header />
      
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pokemon/add" element={<PokemonForm />} />
        <Route path="/pokemon/edit/:id" element={<PokemonForm />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/trainers" element={<TrainerList />} />
        <Route path="/trainers/add" element={<TrainerForm />} />
        <Route path="/trainers/edit/:id" element={<TrainerForm />} />
        <Route path="/trainers/:id" element={<TrainerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;