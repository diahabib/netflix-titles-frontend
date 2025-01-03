import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleList from "./components/TitleList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const navigate = useNavigate(); // Hook pour la navigation

  // Gérer la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <nav className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Catalogue Netflix</h1>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Rechercher un titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-l-lg text-black"
            />
            <button
              type="submit"
              className="bg-white text-blue-500 px-4 py-2 rounded-r-lg hover:bg-gray-100 transition-colors"
            >
              Rechercher
            </button>
          </form>
        </div>
      </nav>

      <TitleList />
    </div>
  );
};

export default App;
