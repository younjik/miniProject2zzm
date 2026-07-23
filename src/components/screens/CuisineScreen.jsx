import { AnimatePresence, motion } from "framer-motion";
import { CUISINE_TYPES, CUISINE_MENU_TAGS } from "../../data.js";

export default function CuisineScreen({ answers, onChange }) {
  const menuTags = CUISINE_MENU_TAGS[answers.cuisine];

  const selectCuisine = (c) => {
    onChange({ cuisine: c, menuTags: [] });
  };

  const toggleMenuTag = (tag) => {
    const next = answers.menuTags.includes(tag)
      ? answers.menuTags.filter((t) => t !== tag)
      : [...answers.menuTags, tag];
    onChange({ menuTags: next });
  };

  return (
    <>
      <h2 className="step-title">어떤 음식이 좋아요?</h2>
      <p className="step-desc">음식 종류를 고르면 세부 메뉴 태그가 나와요.</p>
      <div className="tabs">
        {CUISINE_TYPES.map((c) => (
          <button
            key={c}
            className={`tab-btn${answers.cuisine === c ? " active" : ""}`}
            onClick={() => selectCuisine(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {menuTags && (
          <motion.div
            key={answers.cuisine}
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
    </>
  );
}
