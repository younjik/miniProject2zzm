import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { MOOD_TAGS, CUISINE_TYPES, CUISINE_MENU_TAGS } from "../../data.js";
import QuestionLogo from "../QuestionLogo.jsx";

export default function MoodCuisineScreen({ answers, onChange, onGoHome }) {
  const [customMoodInput, setCustomMoodInput] = useState("");
  const [customCuisineInput, setCustomCuisineInput] = useState("");

  const concreteCuisines = answers.cuisines.filter((c) => c !== "모르겠어요");
  const menuTags = [...new Set(concreteCuisines.flatMap((c) => CUISINE_MENU_TAGS[c] || []))];

  const toggleMood = (tag) => {
    if (tag === "모르겠어요") {
      onChange({ moods: answers.moods.includes("모르겠어요") ? [] : ["모르겠어요"] });
      return;
    }
    let next = answers.moods.filter((t) => t !== "모르겠어요");
    next = next.includes(tag) ? next.filter((t) => t !== tag) : [...next, tag];
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
    if (c === "모르겠어요") {
      const next = answers.cuisines.includes("모르겠어요") ? [] : ["모르겠어요"];
      onChange({ cuisines: next, menuTags: [] });
      return;
    }
    let next = answers.cuisines.filter((t) => t !== "모르겠어요");
    next = next.includes(c) ? next.filter((t) => t !== c) : [...next, c];
    const allowedTags = new Set(next.flatMap((cu) => CUISINE_MENU_TAGS[cu] || []));
    onChange({ cuisines: next, menuTags: answers.menuTags.filter((t) => allowedTags.has(t)) });
  };

  const toggleMenuTag = (tag) => {
    const next = answers.menuTags.includes(tag)
      ? answers.menuTags.filter((t) => t !== tag)
      : [...answers.menuTags, tag];
    onChange({ menuTags: next });
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
    <>
      <QuestionLogo onClick={onGoHome} />
      <h2 className="step-title">분위기랑 음식, 어떤 게 좋아요?</h2>
      <p className="step-desc">원하는 분위기와 음식을 여러 개 골라도 좋아요.</p>

      <p className="section-label">어떤 분위기가 좋아요?</p>
      <div className="tag-grid">
        {[...MOOD_TAGS, "모르겠어요"].map((tag) => (
          <motion.button
            key={tag}
            className={`tag-btn${answers.moods.includes(tag) ? " selected" : ""}`}
            onClick={() => toggleMood(tag)}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
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
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomMood();
            }
          }}
        />
        <button className="btn-secondary" onClick={addCustomMood}>
          <Plus size={16} />
        </button>
      </div>
      <div className="tag-grid">
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

      <p className="section-label">어떤 음식이 좋아요?</p>
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
      </div>
      <AnimatePresence mode="wait">
        {menuTags.length > 0 && (
          <motion.div
            key={concreteCuisines.join(",")}
            className="tag-grid"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {menuTags.map((tag) => (
              <button
                key={tag}
                className={`tag-btn${answers.menuTags.includes(tag) ? " selected" : ""}`}
                onClick={() => toggleMenuTag(tag)}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="custom-tag-input">
        <input
          type="text"
          placeholder="원하는 음식을 직접 입력해보세요"
          value={customCuisineInput}
          onChange={(e) => setCustomCuisineInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomCuisine();
            }
          }}
        />
        <button className="btn-secondary" onClick={addCustomCuisine}>
          <Plus size={16} />
        </button>
      </div>
      <div className="tag-grid">
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
    </>
  );
}
