import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchTitles } from "../api";

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // Récupérer le paramètre de recherche

  // Charger les résultats de recherche
  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const data = await searchTitles(query);
        setResults(data);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Résultats de recherche pour "{query}"
      </h1>

      {/* Liste des résultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((title) => (
          <div
            key={title.show_id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{title.title}</h2>
            <p className="text-gray-600">
              Année de sortie : {title.release_year}
            </p>
            <p className="text-gray-600">
              Type : {title.type === "Movie" ? "Film" : "Série TV"}
            </p>
            <p className="text-gray-600">Classification : {title.rating}</p>
            <p className="text-gray-600 mt-2">{title.description}</p>
          </div>
        ))}
      </div>

      {/* Aucun résultat */}
      {results.length === 0 && (
        <p className="text-center text-gray-600 mt-6">Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default Search;
