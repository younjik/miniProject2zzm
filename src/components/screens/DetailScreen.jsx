import { motion } from "framer-motion";
import { ChevronLeft, Star, Clock, GlassWater, UtensilsCrossed, Phone, MapPin, Navigation } from "lucide-react";
import { getNaverMapUrl } from "../../lib/naverMap.js";

export default function DetailScreen({ restaurant, onBack }) {
  if (!restaurant) return null;
  const r = restaurant;

  return (
    <>
      <button className="btn-back" onClick={onBack}>
        <ChevronLeft size={16} /> 목록으로
      </button>
      <motion.div
        className="detail-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="detail-photo">
          <MapPin size={40} />
        </div>
        <div className="detail-name">{r.name}</div>
        <div className="detail-rating">
          <Star size={15} fill="currentColor" /> {r.rating} <span className="region">· {r.region}</span>
        </div>
        <div className="detail-tags">
          {r.moodTags.map((t) => (
            <span key={t} className="mini-tag">
              #{t}
            </span>
          ))}
        </div>
        <div className="detail-review">"{r.reviewSummary}"</div>

        <div className="detail-info-row">
          <span className="label">
            <MapPin size={14} /> 주소
          </span>
          <span className="value">{r.region} 인근</span>
        </div>
        <div className="detail-info-row">
          <span className="label">
            <Clock size={14} /> 영업시간
          </span>
          <span className="value">{r.hours}</span>
        </div>
        <div className="detail-info-row">
          <span className="label">
            <GlassWater size={14} /> 차수 추천
          </span>
          <span className="value">{r.recommendedRound.join(", ")}</span>
        </div>
        <div className="detail-info-row">
          <span className="label">
            <UtensilsCrossed size={14} /> 대표 메뉴
          </span>
          <span className="value detail-menu-list">
            {r.menu.map((m) => (
              <span key={m} className="mini-tag">
                {m}
              </span>
            ))}
          </span>
        </div>

        <motion.a
          whileTap={{ scale: 0.97 }}
          className="map-btn"
          href={getNaverMapUrl(r)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={16} /> 네이버 지도로 길찾기
        </motion.a>
        <motion.a whileTap={{ scale: 0.97 }} className="call-btn" href={`tel:${r.phone}`}>
          <Phone size={16} /> {r.phone} 전화 예약하기
        </motion.a>
      </motion.div>
    </>
  );
}
