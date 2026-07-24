import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function SubmitScreen({ answers, onBack, onSubmit }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showLoading = setTimeout(() => setLoading(true), 1500);
    const submitTimer = setTimeout(() => onSubmit(), 3800);
    return () => {
      clearTimeout(showLoading);
      clearTimeout(submitTimer);
    };
  }, [onSubmit]);

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
        <motion.div
          className="submit-status"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            style={{ display: "flex" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={15} />
          </motion.span>
          {loading ? "이쯤 찾고 있어요..." : "조건 확인 중이에요"}
        </motion.div>
      </div>
    </>
  );
}
