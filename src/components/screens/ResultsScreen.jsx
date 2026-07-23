import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import pinUrl from "../../assets/pin.png";
import foundPinUrl from "../../assets/found-pin.png";
import RestaurantCard from "../RestaurantCard.jsx";

export default function ResultsScreen({ results, onBack, onRestart, onOpenDetail, favorites, onToggleFavorite }) {
  return (
    <>
      <button className="btn-back" onClick={onBack}>
        <ChevronLeft size={16} /> 조건 다시 선택
      </button>
      <div className="result-header">
        <img src={foundPinUrl} alt="" className="result-header-icon" />
        <div>
          <h2 className="step-title">여기쯤 어때요?</h2>
          <p className="step-desc result-count">
            {results.length ? `조건에 맞는 ${results.length}곳을 찾았어요.` : ""}
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img src={pinUrl} alt="" className="pin-fade" />
          😢 조건에 맞는 식당이 없어요.
          <br />
          조건을 조금 완화해서 다시 찾아볼까요?
        </motion.div>
      ) : (
        <div className="result-list">
          {results.map((r, i) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              index={i}
              onClick={() => onOpenDetail(r.id)}
              isFavorite={favorites.includes(r.id)}
              onToggleFavorite={() => onToggleFavorite(r.id)}
            />
          ))}
        </div>
      )}

      <button className="btn-secondary btn-large" onClick={onRestart}>
        처음부터 다시 찾기
      </button>
    </>
  );
}
