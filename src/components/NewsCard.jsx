import React from "react";

const NewsCard = ({ article }) => {
  const {
    title,
    description,
    content,
    link,
    image_url,
    pubDate,
    source_id,
  } = article;

  // Fallbacks
  const fallbackImg =
    "https://via.placeholder.com/400x200?text=No+Image+Available";
  const truncatedDesc = (description || content || "No description available.")
    .slice(0, 200) + (description?.length > 200 ? "..." : "");
  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown Date";

  return (
    <a
      href={link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
    >
      <div className="news-image">
        <img src={image_url || fallbackImg} alt={title || "News Image"} />
      </div>

      <div className="content">
        <h3>{title || "Untitled Article"}</h3>
        <p className="meta">
          {source_id ? <span>📡 {source_id.toUpperCase()}</span> : null}
          <span>🗓 {formattedDate}</span>
        </p>
        <p>{truncatedDesc}</p>
        <span className="read-more">➡️ Read more</span>
      </div>
    </a>
  );
};

export default NewsCard;
