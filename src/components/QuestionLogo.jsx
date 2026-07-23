import { motion } from "framer-motion";
import questionLogoUrl from "../assets/question-logo.png";

export default function QuestionLogo({ onClick }) {
  return (
    <motion.img
      src={questionLogoUrl}
      alt="처음으로"
      className="question-logo"
      onClick={onClick}
      whileTap={onClick ? { scale: 0.92 } : undefined}
      style={onClick ? { cursor: "pointer" } : undefined}
    />
  );
}
