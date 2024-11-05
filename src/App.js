import { Routes, Route } from "react-router-dom";
import './styles/App.css';
import HomePage from "./Pages/HomePage";
import Users from "./Pages/UsersPage";
import Pokemon from "./Pages/PokemonPage";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/pokemon" element={<Pokemon />}></Route>
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
