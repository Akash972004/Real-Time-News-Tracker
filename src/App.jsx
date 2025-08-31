import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NewsCard from "./components/NewsCard";
import CategorySelector from "./components/CategorySelector";
import "./App.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("top");
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${
        process.env.REACT_APP_NEWS_API_KEY
      }&language=${language}&category=${category}${
        searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ""
      }`;

      const res = await axios.get(url);
      setArticles(res.data.results || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news. Please try again later.");
      setArticles([]);
    }
    setLoading(false);
  }, [language, category, searchTerm]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 1000 * 60 * 5); // refresh every 5 mins
    return () => clearInterval(interval);
  }, [fetchNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1 className="title">📰 Real-Time News Tracker</h1>

      {/* Toggle Dark/Light Mode */}
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
        <span>{darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}</span>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="🔎 Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Language Selector */}
      <div className="dropdown-container">
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="ml">Malayalam</option>
          <option value="mr">Marathi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      <CategorySelector selected={category} setCategory={setCategory} />

      {/* News Content */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : articles.length === 0 ? (
        <p>No news found 🚫</p>
      ) : (
        <div className="news-container">
          {articles.map((article) => (
            <NewsCard key={article.link || article.title} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
