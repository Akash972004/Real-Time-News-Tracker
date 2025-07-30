import React, { useState, useEffect } from "react";
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

  const fetchNews = async () => {
    setLoading(true);
    try {
      const url = `https://newsdata.io/api/1/news?apikey=pub_f1275e5743be4e0cb15103b9f5c9fded&language=${language}&category=${category}${searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''}`;
      const res = await axios.get(url);
      setArticles(res.data.results || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, [category, language]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1 className="title">📰 Real-Time News Tracker</h1>

      {/* Toggle Switch for Dark/Light Mode */}
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="news-container">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
