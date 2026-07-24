import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function BottomNav({ onBack, onNext, nextDisabled, nextLabel = "다음", isFinal = false }) {
  return (
    <div className="bottom-nav">
      <motion.button
        whileTap={{ scale: 0.96 }}
        className={`btn-secondary${isFinal ? " btn-compact" : ""}`}
        onClick={onBack}
      >
        이전
      </motion.button>
      <motion.button
        whileTap={nextDisabled ? {} : { scale: 0.96 }}
        className={`btn-primary${isFinal ? " btn-final" : ""}`}
        onClick={onNext}
        disabled={nextDisabled}
        animate={isFinal && !nextDisabled ? { boxShadow: ["0 6px 18px rgba(242, 193, 78, 0.45)", "0 6px 24px rgba(242, 193, 78, 0.8)", "0 6px 18px rgba(242, 193, 78, 0.45)"] } : {}}
        transition={isFinal ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {isFinal && <Sparkles size={16} style={{ marginRight: 6, verticalAlign: -3 }} />}
        {nextLabel}
      </motion.button>
    </div>
  );
}
