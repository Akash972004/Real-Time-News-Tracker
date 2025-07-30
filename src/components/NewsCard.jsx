
import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      {article.image_url && (
        <img src={article.image_url} alt={article.title} />
      )}
      <div className="content">
        <h3>{article.title}</h3>
        <p>{article.description || article.content}</p>
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
