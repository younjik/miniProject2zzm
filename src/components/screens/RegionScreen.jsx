import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { REGION_COORDS } from "../../data.js";
import { getTargetCoord } from "../../lib/recommend.js";

export default function RegionScreen({ answers, onChange }) {
  const regionNames = [...new Set(Object.keys(REGION_COORDS))];
  const target = getTargetCoord(answers);
  const anyInput =
    answers.regionMode === "single" ? answers.region1.trim() : answers.regionA.trim() || answers.regionB.trim();

  return (
    <>
      <h2 className="step-title">어디쯤에서 모일까요?</h2>
      <p className="step-desc">한 지역 근처 or 두 지역의 중간 지점, 골라서 입력해주세요.</p>

      <div className="tabs">
        <button
          className={`tab-btn${answers.regionMode === "single" ? " active" : ""}`}
          onClick={() => onChange({ regionMode: "single" })}
        >
          한 지역 입력
        </button>
        <button
          className={`tab-btn${answers.regionMode === "midpoint" ? " active" : ""}`}
          onClick={() => onChange({ regionMode: "midpoint" })}
        >
          두 지역 입력
        </button>
      </div>

      <datalist id="regionList">
        {regionNames.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      <AnimatePresence mode="wait">
        {answers.regionMode === "single" ? (
          <motion.div key="single" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <label className="field-label">지역</label>
            <input
              type="text"
              list="regionList"
              placeholder="예: 을지로3가, 공덕, 강남역"
              value={answers.region1}
              onChange={(e) => onChange({ region1: e.target.value })}
            />
          </motion.div>
        ) : (
          <motion.div key="midpoint" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <label className="field-label">첫 번째 지역</label>
            <input
              type="text"
              list="regionList"
              placeholder="예: 화곡"
              value={answers.regionA}
              onChange={(e) => onChange({ regionA: e.target.value })}
            />
            <label className="field-label">두 번째 지역</label>
            <input
              type="text"
              list="regionList"
              placeholder="예: 성수"
              value={answers.regionB}
              onChange={(e) => onChange({ regionB: e.target.value })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {anyInput && (
        <p className={`field-hint ${target ? "ok" : "error"}`}>
          {target ? (
            <>
              <CheckCircle2 size={14} /> 좋아요, 이 지역 근처로 찾아볼게요!
            </>
          ) : (
            <>
              <AlertCircle size={14} /> 그 지역은 아직 몰라요. 을지로3가, 공덕, 화곡, 성수 등으로 시도해보세요.
            </>
          )}
        </p>
      )}
    </>
  );
}
