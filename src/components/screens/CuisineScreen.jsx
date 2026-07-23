import { AnimatePresence, motion } from "framer-motion";
import { CUISINE_TYPES, CUISINE_MENU_TAGS } from "../../data.js";
import QuestionLogo from "../QuestionLogo.jsx";

export default function CuisineScreen({ answers, onChange }) {
  const concreteCuisines = answers.cuisines.filter((c) => c !== "모르겠어요");
  const menuTags = [...new Set(concreteCuisines.flatMap((c) => CUISINE_MENU_TAGS[c] || []))];

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

  return (
    <>
      <QuestionLogo />
      <h2 className="step-title">어떤 음식이 좋아요?</h2>
      <p className="step-desc">음식 종류를 여러 개 골라도 좋아요. 고르면 세부 메뉴 태그가 나와요.</p>
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
    </>
  );
}
