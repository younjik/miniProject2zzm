import { motion } from "framer-motion";
import { Wine, UtensilsCrossed, Soup, MessageCircleHeart, PartyPopper, HelpCircle, Check } from "lucide-react";
import { CONCEPTS } from "../../data.js";
import QuestionLogo from "../QuestionLogo.jsx";

const ICONS = { Wine, UtensilsCrossed, Soup, MessageCircleHeart, PartyPopper, HelpCircle };

export default function ConceptScreen({ value, onChange }) {
  return (
    <>
      <QuestionLogo />
      <h2 className="step-title">오늘의 모임, 어떤 느낌이에요?</h2>
      <p className="step-desc">컨셉에 맞춰 딱 맞는 장소를 골라볼게요.</p>
      <div className="option-grid">
        {CONCEPTS.map(({ value: c, icon }, i) => {
          const Icon = ICONS[icon];
          const selected = value === c;
          return (
            <motion.button
              key={c}
              className={`option-btn${selected ? " selected" : ""}`}
              onClick={() => onChange(c)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="icon-wrap">
                <Icon size={18} />
              </span>
              {c}
              {selected && <Check size={18} className="check" />}
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
