import { motion } from "framer-motion";

export default function BottomNav({ onBack, onNext, nextDisabled, nextLabel = "다음" }) {
  return (
    <div className="bottom-nav">
      <motion.button whileTap={{ scale: 0.96 }} className="btn-secondary" onClick={onBack}>
        이전
      </motion.button>
      <motion.button
        whileTap={nextDisabled ? {} : { scale: 0.96 }}
        className="btn-primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </motion.button>
    </div>
  );
}
