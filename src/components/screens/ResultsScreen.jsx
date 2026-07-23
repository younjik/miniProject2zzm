import { motion } from "framer-motion";
import { ChevronLeft, Star, MapPin } from "lucide-react";
import pinUrl from "../../assets/pin.png";
import foundPinUrl from "../../assets/found-pin.png";

export default function ResultsScreen({ results, onBack, onRestart, onOpenDetail }) {
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
            <motion.div
              key={r.id}
              className="result-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, boxShadow: "0 10px 24px rgba(36,59,85,0.12)" }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onOpenDetail(r.id)}
            >
              <div className="result-card-top">
                <span className="result-card-name">{r.name}</span>
                <span className="result-card-rating">
                  <Star size={13} fill="currentColor" /> {r.rating}
                </span>
              </div>
              <div className="result-card-meta">
                <MapPin size={12} style={{ verticalAlign: -1 }} /> {r.region} · 약 {r.distance.toFixed(1)}km
              </div>
              <div className="result-card-tags">
                {r.moodTags.map((t) => (
                  <span key={t} className="mini-tag">
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <button className="btn-secondary btn-large" onClick={onRestart}>
        처음부터 다시 찾기
      </button>
    </>
  );
}
