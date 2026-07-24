import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Sparkles } from "lucide-react";

export default function SubmitScreen({ answers, onBack, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const region =
    answers.regionMode === "single"
      ? answers.region1 || "-"
      : `${answers.regionA || "-"} ↔ ${answers.regionB || "-"} 중간쯤`;
  const allMoods = [...answers.moods, ...answers.customMoods];
  const allCuisines = [...answers.cuisines, ...answers.customCuisines];
  const cuisineDisplay =
    [
      allCuisines.length ? allCuisines.join(", ") : null,
      answers.excludedCuisines.length ? `${answers.excludedCuisines.join(", ")} 빼고` : null,
    ]
      .filter(Boolean)
      .join(" · ") || "상관없어요";

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onSubmit();
    }, 450);
  };

  return (
    <>
      <button className="btn-back" onClick={onBack}>
        <ChevronLeft size={16} /> 이전
      </button>
      <div className="hero">
        <h2 className="step-title">이쯤 찾아볼게요!</h2>
        <p className="step-desc">지금까지 고른 조건으로 딱 맞는 장소를 찾아볼게요.</p>
        <div className="summary-card">
          <div>
            <b>지역</b> · {region}
          </div>
          <div>
            <b>오늘의 컨셉</b> · {answers.concept}
          </div>
          <div>
            <b>분위기</b> · {allMoods.length ? allMoods.join(", ") : "상관없어요"}
          </div>
          <div>
            <b>음식</b> · {cuisineDisplay}
          </div>
          <div>
            <b>인원수</b> · {answers.partySize}
          </div>
          <div>
            <b>차수</b> · {answers.round}
          </div>
        </div>
        <motion.button
          className="btn-primary btn-large"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            "이쯤 찾고 있어요..."
          ) : (
            <>
              <Sparkles size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
              추천받기
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
