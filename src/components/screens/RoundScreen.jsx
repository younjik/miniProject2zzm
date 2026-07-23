import { motion } from "framer-motion";
import { UtensilsCrossed, Beer, Coffee, HelpCircle, Check } from "lucide-react";
import { ROUNDS } from "../../data.js";

const ICONS = { "1차": UtensilsCrossed, "2차": Beer, "3차 이상": Coffee, "모르겠어요": HelpCircle };

export default function RoundScreen({ value, onChange }) {
  return (
    <>
      <h2 className="step-title">몇 차인가요?</h2>
      <p className="step-desc">차수에 따라 어울리는 장소가 달라져요.</p>
      <div className="option-grid">
        {ROUNDS.map((r, i) => {
          const Icon = ICONS[r];
          const selected = value === r;
          return (
            <motion.button
              key={r}
              className={`option-btn${selected ? " selected" : ""}`}
              onClick={() => onChange(r)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="icon-wrap">
                <Icon size={18} />
              </span>
              {r}
              {selected && <Check size={18} className="check" />}
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
