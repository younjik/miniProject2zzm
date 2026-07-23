import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, LocateFixed } from "lucide-react";
import { REGION_COORDS } from "../../data.js";
import { getTargetCoord } from "../../lib/recommend.js";
import QuestionLogo from "../QuestionLogo.jsx";

export default function RegionScreen({ answers, onChange }) {
  const [locating, setLocating] = useState(null);
  const [locateError, setLocateError] = useState("");

  const regionNames = [...new Set(Object.keys(REGION_COORDS))];
  const target = getTargetCoord(answers);
  const anyInput =
    answers.regionMode === "single" ? answers.region1.trim() : answers.regionA.trim() || answers.regionB.trim();

  const useCurrentLocation = (slot, textField, coordField) => {
    if (!navigator.geolocation) {
      setLocateError("이 브라우저에서는 위치 확인이 안 돼요. 지역명을 직접 입력해주세요.");
      return;
    }
    setLocating(slot);
    setLocateError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({
          [textField]: "현재 위치",
          [coordField]: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
        setLocating(null);
      },
      () => {
        setLocateError("위치 정보를 가져올 수 없어요. 위치 권한을 확인하거나 지역명을 직접 입력해주세요.");
        setLocating(null);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const editText = (textField, coordField) => (e) => {
    onChange({ [textField]: e.target.value, [coordField]: null });
  };

  return (
    <>
      <QuestionLogo />
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
              onChange={editText("region1", "region1Coord")}
            />
            <motion.button
              type="button"
              className="locate-btn"
              whileTap={{ scale: 0.98 }}
              onClick={() => useCurrentLocation("region1", "region1", "region1Coord")}
              disabled={locating === "region1"}
            >
              <LocateFixed size={15} />
              {locating === "region1" ? "위치 확인 중..." : "현재 위치 근처에서 찾아볼까요?"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="midpoint" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <label className="field-label">첫 번째 지역</label>
            <input
              type="text"
              list="regionList"
              placeholder="예: 화곡"
              value={answers.regionA}
              onChange={editText("regionA", "regionACoord")}
            />
            <motion.button
              type="button"
              className="locate-btn locate-btn-inline"
              whileTap={{ scale: 0.98 }}
              onClick={() => useCurrentLocation("regionA", "regionA", "regionACoord")}
              disabled={locating === "regionA"}
            >
              <LocateFixed size={14} />
              {locating === "regionA" ? "위치 확인 중..." : "현재 위치로 설정"}
            </motion.button>

            <label className="field-label">두 번째 지역</label>
            <input
              type="text"
              list="regionList"
              placeholder="예: 성수"
              value={answers.regionB}
              onChange={editText("regionB", "regionBCoord")}
            />
            <motion.button
              type="button"
              className="locate-btn locate-btn-inline"
              whileTap={{ scale: 0.98 }}
              onClick={() => useCurrentLocation("regionB", "regionB", "regionBCoord")}
              disabled={locating === "regionB"}
            >
              <LocateFixed size={14} />
              {locating === "regionB" ? "위치 확인 중..." : "현재 위치로 설정"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {locateError && (
        <p className="field-hint error">
          <AlertCircle size={14} /> {locateError}
        </p>
      )}
      {!locateError && anyInput && (
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
