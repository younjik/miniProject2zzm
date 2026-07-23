import { motion } from "framer-motion";
import { Star, MapPin, Heart } from "lucide-react";

export default function RestaurantCard({ restaurant: r, onClick, isFavorite, onToggleFavorite, index = 0 }) {
  return (
    <motion.div
      className="result-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -3, boxShadow: "0 10px 24px rgba(36,59,85,0.12)" }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div className="result-card-top">
        <span className="result-card-name">{r.name}</span>
        <div className="result-card-actions">
          <span className="result-card-rating">
            <Star size={13} fill="currentColor" /> {r.rating}
          </span>
          {onToggleFavorite && (
            <button
              type="button"
              className={`favorite-btn${isFavorite ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              aria-label="즐겨찾기"
            >
              <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>
      <div className="result-card-meta">
        <MapPin size={12} style={{ verticalAlign: -1 }} /> {r.region}
        {r.distance != null ? ` · 약 ${r.distance.toFixed(1)}km` : ""}
      </div>
      <div className="result-card-tags">
        {r.moodTags.map((t) => (
          <span key={t} className="mini-tag">
            #{t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
