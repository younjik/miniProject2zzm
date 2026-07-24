import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, AlertCircle } from "lucide-react";
import { MOOD_TAGS, CUISINE_TYPES } from "../../data.js";
import QuestionLogo from "../QuestionLogo.jsx";

export default function MoodCuisineScreen({ answers, onChange, onGoHome }) {
  const [customMoodInput, setCustomMoodInput] = useState("");
  const [customCuisineInput, setCustomCuisineInput] = useState("");
  const [excludeCuisineInput, setExcludeCuisineInput] = useState("");

  const cuisineRequiredMissing =
    answers.cuisines.length === 0 &&
    answers.customCuisines.length === 0 &&
    answers.excludedCuisines.length === 0;

  const toggleMood = (tag) => {
    const next = answers.moods.includes(tag)
      ? answers.moods.filter((t) => t !== tag)
      : [...answers.moods, tag];
    onChange({ moods: next });
  };

  const addCustomMood = () => {
    const val = customMoodInput.trim();
    if (!val) return;
    if (!answers.customMoods.includes(val)) {
      onChange({ customMoods: [...answers.customMoods, val] });
    }
    setCustomMoodInput("");
  };

  const removeCustomMood = (idx) => {
    onChange({ customMoods: answers.customMoods.filter((_, i) => i !== idx) });
  };

  const toggleCuisine = (c) => {
    const next = answers.cuisines.includes(c)
      ? answers.cuisines.filter((t) => t !== c)
      : [...answers.cuisines, c];
    onChange({ cuisines: next });
  };

  const addExcludedCuisine = () => {
    const val = excludeCuisineInput.trim();
    if (!val) return;
    if (!answers.excludedCuisines.includes(val)) {
      onChange({ excludedCuisines: [...answers.excludedCuisines, val] });
    }
    setExcludeCuisineInput("");
  };

  const removeExcludedCuisine = (idx) => {
    onChange({ excludedCuisines: answers.excludedCuisines.filter((_, i) => i !== idx) });
  };

  const addCustomCuisine = () => {
    const val = customCuisineInput.trim();
    if (!val) return;
    if (!answers.customCuisines.includes(val)) {
      onChange({ customCuisines: [...answers.customCuisines, val] });
    }
    setCustomCuisineInput("");
  };

  const removeCustomCuisine = (idx) => {
    onChange({ customCuisines: answers.customCuisines.filter((_, i) => i !== idx) });
  };

  return (
    <div className="mood-cuisine-screen">
      <QuestionLogo onClick={onGoHome} />
      <h2 className="step-title">분위기랑 음식, 어떤 게 좋아요?</h2>
      <p className="step-desc">원하는 분위기와 음식을 여러 개 골라도 좋아요.</p>

      <p className="section-label">
        어떤 분위기가 끌리세요? <span className="optional-tag">(선택)</span>
      </p>
      <div className="tag-grid">
        {MOOD_TAGS.map((tag) => (
          <motion.button
            key={tag}
            className={`tag-btn${answers.moods.includes(tag) ? " selected" : ""}`}
            onClick={() => toggleMood(tag)}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
        {answers.customMoods.map((tag, i) => (
          <motion.button
            key={tag + i}
            className="tag-btn custom"
            onClick={() => removeCustomMood(i)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            #{tag} <X size={13} />
          </motion.button>
        ))}
      </div>
      <div className="custom-tag-input">
        <input
          type="text"
          placeholder="원하는 분위기를 직접 입력해보세요"
          value={customMoodInput}
          onChange={(e) => setCustomMoodInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              addCustomMood();
            }
          }}
        />
        <button className="btn-secondary" onClick={addCustomMood}>
          <Plus size={16} />
        </button>
      </div>

      <p className="section-label">오늘은 뭐가 땡기세요?</p>
      <div className="tag-grid">
        {CUISINE_TYPES.map((c) => (
          <motion.button
            key={c}
            className={`tag-btn${answers.cuisines.includes(c) ? " selected" : ""}`}
            onClick={() => toggleCuisine(c)}
            whileTap={{ scale: 0.95 }}
          >
            {c}
          </motion.button>
        ))}
        {answers.customCuisines.map((tag, i) => (
          <motion.button
            key={tag + i}
            className="tag-btn custom"
            onClick={() => removeCustomCuisine(i)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            #{tag} <X size={13} />
          </motion.button>
        ))}
      </div>
      <div className="custom-tag-input">
        <input
          type="text"
          placeholder="원하는 음식을 직접 입력해보세요"
          value={customCuisineInput}
          onChange={(e) => setCustomCuisineInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              addCustomCuisine();
            }
          }}
        />
        <button className="btn-secondary" onClick={addCustomCuisine}>
          <Plus size={16} />
        </button>
      </div>

      <p className="section-label">다 괜찮아, 근데 이것만 빼고</p>
      <div className="custom-tag-input">
        <input
          type="text"
          placeholder="빼고 싶은 음식을 입력해보세요"
          value={excludeCuisineInput}
          onChange={(e) => setExcludeCuisineInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              addExcludedCuisine();
            }
          }}
        />
        <button className="btn-secondary" onClick={addExcludedCuisine}>
          <Plus size={16} />
        </button>
      </div>
      <div className="tag-grid">
        {answers.excludedCuisines.map((tag, i) => (
          <motion.button
            key={tag + i}
            className="tag-btn excluded"
            onClick={() => removeExcludedCuisine(i)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            #{tag} 빼고 <X size={13} />
          </motion.button>
        ))}
      </div>

      {cuisineRequiredMissing && (
        <p className="field-hint error">
          <AlertCircle size={14} /> <span>땡기거나 제외할 음식을 골라주세요.<br />둘 중 하나만 골라도 돼요.</span>
        </p>
      )}
    </div>
  );
}
