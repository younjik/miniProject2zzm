import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { MOOD_TAGS } from "../../data.js";

export default function MoodScreen({ answers, onChange }) {
  const [customInput, setCustomInput] = useState("");

  const toggleMood = (tag) => {
    if (tag === "모르겠어요") {
      onChange({ moods: answers.moods.includes("모르겠어요") ? [] : ["모르겠어요"] });
      return;
    }
    let next = answers.moods.filter((t) => t !== "모르겠어요");
    next = next.includes(tag) ? next.filter((t) => t !== tag) : [...next, tag];
    onChange({ moods: next });
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (!val) return;
    if (!answers.customMoods.includes(val)) {
      onChange({ customMoods: [...answers.customMoods, val] });
    }
    setCustomInput("");
  };

  const removeCustom = (idx) => {
    onChange({ customMoods: answers.customMoods.filter((_, i) => i !== idx) });
  };

  return (
    <>
      <h2 className="step-title">어떤 분위기가 좋아요?</h2>
      <p className="step-desc">원하는 분위기를 여러 개 골라도 좋아요.</p>
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
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
        />
        <button className="btn-secondary" onClick={addCustom}>
          <Plus size={16} />
        </button>
      </div>
      <div className="tag-grid">
        {answers.customMoods.map((tag, i) => (
          <motion.button
            key={tag + i}
            className="tag-btn custom"
            onClick={() => removeCustom(i)}
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
