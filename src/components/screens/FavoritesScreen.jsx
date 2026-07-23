import { Heart } from "lucide-react";
import RestaurantCard from "../RestaurantCard.jsx";

export default function FavoritesScreen({ favoriteRestaurants, onOpenDetail, onToggleFavorite }) {
  return (
    <>
      <h2 className="step-title">즐겨찾기</h2>
      <p className="step-desc">저장해둔 장소를 다시 확인해보세요.</p>

      {favoriteRestaurants.length === 0 ? (
        <div className="empty-state">
          <Heart size={44} className="empty-heart" />
          아직 즐겨찾기한 장소가 없어요.
          <br />
          마음에 드는 곳을 하트로 저장해보세요!
        </div>
      ) : (
        <div className="result-list">
          {favoriteRestaurants.map((r, i) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              index={i}
              onClick={() => onOpenDetail(r.id)}
              isFavorite
              onToggleFavorite={() => onToggleFavorite(r.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
