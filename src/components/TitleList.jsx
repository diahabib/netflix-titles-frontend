import React, { useEffect, useState } from "react";
import { getTitles, getBestRatedTitles } from "../api";

const TitleList = () => {
  const [titles, setTitles] = useState([]);
  const [bestRatedTitles, setBestRatedTitles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("release_year");
  const [order, setOrder] = useState("asc");
  const [type, setType] = useState("all");

  // Charger les titres en fonction des filtres et de la pagination
  useEffect(() => {
    const fetchTitles = async () => {
      const data = await getTitles(page, limit, sortBy, order, type);
      setTitles(data);
    };
    fetchTitles();
  }, [page, limit, sortBy, order, type]);

  // Charger les titres les mieux notés
  useEffect(() => {
    const fetchBestRatedTitles = async () => {
      const data = await getBestRatedTitles(5);
      setBestRatedTitles(data);
    };
    fetchBestRatedTitles();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filtres et tris */}
      <div className="flex justify-center space-x-4 mb-6">
        <select
          className="p-2 border rounded"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">Tous</option>
          <option value="Movie">Films</option>
          <option value="TV Show">Séries TV</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="release_year">Année de sortie</option>
          <option value="title">Titre</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>

      {/* Liste des titres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {titles.map((title) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Précédent
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </button>
      </div>

      {/* Titres les mieux notés */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          Titres les mieux notés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestRatedTitles.map((title) => (
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
      </div>
    </div>
  );
};

export default TitleList;
